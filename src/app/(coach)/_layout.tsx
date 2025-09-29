import { Stack } from "expo-router";

export default function CoachLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="coach-view" />
      <Stack.Screen name="coach-profile" />
      <Stack.Screen name="coach-view-metrics" />
      <Stack.Screen name="training-plans" />
      <Stack.Screen name="team-overview" />
      <Stack.Screen name="overall-team-form" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
