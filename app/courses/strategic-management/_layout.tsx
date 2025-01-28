import { Stack } from "expo-router";

export default function Course1layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="strategic-management" options={{ headerShown:false }} />
    </Stack>
  );
}
