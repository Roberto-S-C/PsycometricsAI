import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL

type AuthContextType = {
  isAuthenticated: boolean;
  tokens: Tokens | null;
  login: (tokens: Tokens) => Promise<void>;
  logout: () => Promise<void>;
  register: (tokens: Tokens) => Promise<void>;
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

  const storeTokens = async (newTokens: Tokens) => {
    try {
      console.log('Storing new tokens:', newTokens); // Debug log
      await AsyncStorage.setItem('tokens', JSON.stringify(newTokens));
      setTokens(newTokens);
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
        
        // Check token structure
        if (!parsedTokens.access || !parsedTokens.refresh) {
          console.error('Invalid token structure');
          await logout();
          return;
        }

        // Check if access token is expired
        const payload = JSON.parse(atob(parsedTokens.access.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          // Token is expired, try to refresh
          try {
            const response = await axios.post(`${API_URL}/token/refresh/`, {
              refresh: parsedTokens.refresh
            });
            const { access: newAccess } = response.data;
            await storeTokens({ ...parsedTokens, access: newAccess });
          } catch (error) {
            // If refresh fails, logout
            await logout();
            return;
          }
        } else {
          setTokens(parsedTokens);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Error loading tokens:', error);
      await logout();
    }
  };

  const login = async (newTokens: Tokens) => {
    await storeTokens(newTokens);
    router.replace('(tabs)' as any);
  };

  const register = async (newTokens: Tokens) => {
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, tokens, login, logout, register }}>
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