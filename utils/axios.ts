import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Track if we're refreshing the token
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = await AsyncStorage.getItem('tokens');
    if (tokens) {
      const { access } = JSON.parse(tokens);
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If login request failed, reject immediately
    if (originalRequest.url === '/login/') {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const tokens = await AsyncStorage.getItem('tokens');
      if (!tokens) throw new Error('No refresh token available');

      const { refresh } = JSON.parse(tokens);
      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: refresh
      });

      const { access: newAccessToken } = response.data;

      // Update stored tokens
      const newTokens = { ...JSON.parse(tokens), access: newAccessToken };
      await AsyncStorage.setItem('tokens', JSON.stringify(newTokens));

      // Update Authorization header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);
      isRefreshing = false;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      isRefreshing = false;

      // Clear tokens and redirect to login
      await AsyncStorage.removeItem('tokens');
      // You might want to call your logout function here or emit an event
      
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;