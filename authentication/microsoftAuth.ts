import axiosInstance from '@/utils/axios';
import * as WebBrowser from 'expo-web-browser';

// Make sure to complete auth session
WebBrowser.maybeCompleteAuthSession();

const config = {
  clientId: process.env.EXPO_PUBLIC_MICROSOFT_CLIENT_ID!,
  scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
  redirectUri: 'psycometricsai://oauth2redirect/microsoft'
};

export const loginWithMicrosoft = async () => {
  try {
    console.log('Using redirect URI:', config.redirectUri);

    const authUrl = 
      `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
      `client_id=${config.clientId}` +
      `&redirect_uri=${encodeURIComponent(config.redirectUri)}` +
      `&response_type=code` + // Changed to request authorization code
      `&scope=${encodeURIComponent(config.scopes.join(' '))}` +
      `&prompt=select_account`;

    const result = await WebBrowser.openAuthSessionAsync(
      authUrl,
      config.redirectUri
    );

    console.log('Auth result:', result); // Log the result from WebBrowser

    if (result.type === 'success') {
      const url = new URL(result.url);
      const code = url.searchParams.get('code');

      console.log('Authorization code:', code); // Log the authorization code

      if (!code) {
        throw new Error('No authorization code received');
      }

      console.log('Got authorization code, sending to backend');
      
      // Send the authorization code to your backend
      const backendResponse = await axiosInstance.post('/microsoft/auth/', {
        code,
        redirect_uri: config.redirectUri // Backend might need this for token exchange
      });

      console.log('Backend response:', backendResponse.data); // Log the backend response
      return backendResponse.data;
    }

    throw new Error('Microsoft authentication failed');
  } catch (error) {
    console.error('Microsoft auth error:', error);
    throw error;
  }
};