import { loginWithGoogle } from '@/authentication/googleAuth';
import { loginWithMicrosoft as microsoftAuth } from '@/authentication/microsoftAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL

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

  useEffect(() => {
    // Check for existing tokens when app loads
    loadTokens();
  }, []);

  const storeTokens = async (newTokens: { data: Tokens }) => {
    try {
      console.log('Storing new tokens:', newTokens); // Debug log
      await AsyncStorage.setItem('tokens', JSON.stringify(newTokens));
      setTokens(newTokens.data); // Extract and set the tokens
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  };

  const loadTokens = async () => {
    try {
      const storedTokens = await AsyncStorage.getItem('tokens');
      console.log('Loaded tokens from storage:', storedTokens);

      if (storedTokens) {
        const parsedTokens = JSON.parse(storedTokens);

        // Extract tokens from the "data" key
        const { access, refresh } = parsedTokens.data || {};

        // Check token structure
        if (!access || !refresh) {
          console.error('Invalid token structure');
          await logout();
          return;
        }

        // Check if access token is expired
        const payload = JSON.parse(atob(access.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          // Token is expired, try to refresh
          try {
            const response = await axios.post(`${API_URL}/token/refresh/`, {
              refresh,
            });
            const { access: newAccess } = response.data;
            await storeTokens({ data: { access: newAccess, refresh } });
          } catch (error) {
            // If refresh fails, logout
            await logout();
            return;
          }
        } else {
          setTokens(parsedTokens.data); // Set tokens from the "data" key
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Error loading tokens:', error);
      await logout();
    }
  };

  const login = async (newTokens: { data: Tokens }) => {
    await storeTokens(newTokens);
    router.replace('(tabs)' as any);
  };

  const register = async (newTokens: { data: Tokens }) => {
    await storeTokens(newTokens);
    router.replace('(tabs)' as any);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('tokens');
      setTokens(null);
      setIsAuthenticated(false);
      router.replace('(auth)/login' as any); // TypeScript fix
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const loginWithMicrosoft = async () => {
    try {
      const response = await microsoftAuth();
      await login(response);
    } catch (error) {
      console.error('Microsoft login failed:', error);
      throw error;
    }
  };

  const loginWithGoogleHandler = async () => {
    try {
      const { idToken, email } = await loginWithGoogle();
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/google/auth/`, { id_token: idToken, email });
      await login(response.data);
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        tokens, 
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