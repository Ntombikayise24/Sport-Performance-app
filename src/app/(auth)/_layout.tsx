import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create-account" />
      <Stack.Screen name="verify-account" />
      <Stack.Screen name="verified" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
