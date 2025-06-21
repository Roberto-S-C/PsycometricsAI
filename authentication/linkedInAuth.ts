import * as SecureStore from 'expo-secure-store'; // Use SecureStore for sensitive data
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = `${process.env.EXPO_PUBLIC_API_URL}/auth/linkedin/callback`;

const config = {
  clientId: process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_ID!,
  redirectUri,
  scopes: [
    'r_liteprofile',
    'r_emailaddress'
  ]
};

export const loginWithLinkedIn = async () => {
  try {
    // 1. Generate a unique state (UUID)
    const state = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // 2. Store the state in SecureStore for later verification
    await SecureStore.setItemAsync('linkedin_oauth_state', state);

    // 3. Construct the LinkedIn auth URL
    const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', config.clientId);
    authUrl.searchParams.append('redirect_uri', config.redirectUri);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('scope', config.scopes.join(' '));

    console.log('Authorization URL:', authUrl.toString());

    // 4. Open the LinkedIn auth page
    const result = await WebBrowser.openAuthSessionAsync(
      authUrl.toString(),
      config.redirectUri,
      { showInRecents: true }
    );

    console.log('Auth result:', result);

    // The rest of your flow continues as before...
    return { status: 'pending', message: 'Please return to the app after completing LinkedIn authentication in the browser.' };
  } catch (error) {
    console.error('LinkedIn auth error:', error);
    throw error;
  }
};