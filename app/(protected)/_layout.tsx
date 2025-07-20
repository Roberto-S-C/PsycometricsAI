import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="candidates" options={{ headerShown: false }} />
      <Stack.Screen name="generate" options={{ headerShown: false }} />
    </Stack>
  );
}