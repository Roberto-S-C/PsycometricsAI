import axiosInstance from '@/utils/axios';
import axios from 'axios';

type LoginCredentials = {
  email: string;
  password: string;
};

type Tokens = {
  access: string;
  refresh: string;
};

const loginRequest = async (credentials: LoginCredentials): Promise<{ data: Tokens }> => {
  try {
    const response = await axiosInstance.post<{ data: Tokens }>('/login/', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('Something went wrong');
  }
};

export default loginRequest;