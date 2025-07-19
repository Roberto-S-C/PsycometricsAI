import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    console.log('Google Sign-In Response:', response); // Debug log

    // Extract idToken and email directly from the response
    const idToken = response.data.idToken;
    const email = response.data.user.email;

    if (!idToken || !email) {
      throw new Error('Failed to retrieve idToken or email from Google Sign-In response');
    }

    return { idToken, email }; // Return both idToken and email
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the login flow
      throw new Error('Google sign-in cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Google sign-in already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play Services not available');
    } else {
      console.error('Google login failed:', error);
      throw error;
    }
  }
};