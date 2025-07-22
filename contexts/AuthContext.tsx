import { loginWithGoogle } from '@/authentication/googleAuth';
import { loginWithMicrosoft as microsoftAuth } from '@/authentication/microsoftAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type AuthContextType = {
  isAuthenticated: boolean;
  tokens: Tokens | null;
  login: (tokens: Tokens) => Promise<void>;
  logout: () => Promise<void>;
  register: (tokens: Tokens) => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
};

type Tokens = {
  access: string;
  refresh: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTokens();
  }, []);

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('tokens:', tokens);
  }, [isAuthenticated, tokens]);

  const storeTokens = async (newTokens: { data: Tokens }) => {
    try {
      await AsyncStorage.setItem('tokens', JSON.stringify(newTokens));
      setTokens(newTokens.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  };

  const loadTokens = async () => {
    try {
      const storedTokens = await AsyncStorage.getItem('tokens');
      if (storedTokens) {
        const parsedTokens = JSON.parse(storedTokens);
        const { access, refresh } = parsedTokens.data || {};
        if (!access || !refresh) {
          setIsAuthenticated(false);
          return;
        }
        const payload = JSON.parse(atob(access.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          try {
            const response = await axios.post(`${API_URL}/token/refresh/`, { refresh });
            const { access: newAccess } = response.data;
            await storeTokens({ data: { access: newAccess, refresh } });
          } catch (error) {
            setIsAuthenticated(false);
            return;
          }
        } else {
          setTokens(parsedTokens.data);
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const login = async (newTokens: { data: Tokens }) => {
    setIsLoading(true); // Set loading state
    try {
      await storeTokens(newTokens);
      router.replace('(tabs)' as any);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const register = async (newTokens: { data: Tokens }) => {
    setIsLoading(true); // Set loading state
    try {
      await storeTokens(newTokens);
      router.replace('(tabs)' as any);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...'); // Debug log
      await AsyncStorage.removeItem('tokens');
      setTokens(null);
      setIsAuthenticated(false);
      router.replace('(auth)/login' as any);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const loginWithGoogleHandler = async () => {
    setIsLoading(true); // Set loading state
    try {
      const { idToken, email } = await loginWithGoogle();
      const response = await axios.post(`${API_URL}/google/auth/`, { id_token: idToken, email });
      await login(response.data);
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const loginWithMicrosoft = async () => {
    setIsLoading(true); // Set loading state
    try {
      const response = await microsoftAuth();
      await login(response);
    } catch (error) {
      console.error('Microsoft login failed:', error);
      throw error;
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        tokens,
        isLoading, // Expose isLoading state
        login,
        logout,
        register,
        loginWithMicrosoft,
        loginWithGoogle: loginWithGoogleHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}