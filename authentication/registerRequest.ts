import axiosInstance from '@/utils/axios';
import axios from 'axios';

type RegisterCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Tokens = {
  access: string;
  refresh: string;
};

const registerRequest = async (credentials: RegisterCredentials): Promise<{ data: Tokens }> => {
  try {
    const response = await axiosInstance.post<{ data: Tokens }>('/signup/', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.code === 'EMAIL_EXISTS') {
        throw new Error('Email already registered');
      }
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('Something went wrong');
  }
};

export default registerRequest;