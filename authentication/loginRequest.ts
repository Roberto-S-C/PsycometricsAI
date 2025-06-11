import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  access: string;
  refresh: string;
};

const loginRequest = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/login/`, 
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('Something went wrong');
  }
};

export default loginRequest;