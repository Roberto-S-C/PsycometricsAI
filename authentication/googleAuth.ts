import { GoogleSignin, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';

export const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    console.log('Google Sign-In Response:', response); // Debug log

    if (isSuccessResponse(response)) {
      return response.data.idToken;
    }
  } catch (error: any) {

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      throw new Error('Google sign-in cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Google sign-in already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play Services not available');
    } else {
      throw error;
    }
  }
};