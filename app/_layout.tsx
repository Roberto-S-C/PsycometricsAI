import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';



function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Configure Google Signin
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      scopes: ['profile', 'email'],
      offlineAccess: true, // If you need refresh tokens
      forceCodeForRefreshToken: false, 
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    })
  }, []);

  // Wait until segments are loaded (segments[0] is defined)
  useEffect(() => {
    if (segments.length === 0) return; // <-- Prevent navigation before mount

    // If not authenticated and not already on an auth route, redirect to login
    if (!isAuthenticated && segments[0] !== '(auth)') {
      router.replace('(auth)/login');
    }
    // If authenticated and on an auth route, redirect to protected area
    if (isAuthenticated && segments[0] === '(auth)') {
      router.replace('(protected)');
    }



  }, [isAuthenticated, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
      </AuthGate>
    </AuthProvider>
  );
}

console.log('webClientId:', process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID);
