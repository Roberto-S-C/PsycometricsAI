import axiosInstance from '@/utils/axios';
import { AuthRequest, AuthRequestConfig } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// Ensure web browser auth session can complete
WebBrowser.maybeCompleteAuthSession();

// Google OAuth endpoints
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

// Auth request configuration
const config: AuthRequestConfig = {
  clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
  responseType: 'code',
  redirectUri: 'psycometricsai://oauth2redirect/google',
  scopes: ['openid', 'profile', 'email'],
  extraParams: {
    access_type: 'offline',
    prompt: 'select_account',
  },
};

export const loginWithGoogle = async () => {
  try {
    const request = new AuthRequest(config);
    console.log('Redirect URI:', request.redirectUri);

    const result = await request.promptAsync(discovery);
    console.log('Auth result type:', result.type);

    if (result.type === 'success') {
      const { code } = result.params;

      if (!code) {
        throw new Error('No authorization code received');
      }

      const backendResponse = await axiosInstance.post('/google/auth/', {
        code,
        redirect_uri: request.redirectUri
      });

      return backendResponse.data;
    }

    throw new Error('Google authentication failed');
  } catch (error) {
    console.error('Google auth error:', error);
    throw error;
  }
};