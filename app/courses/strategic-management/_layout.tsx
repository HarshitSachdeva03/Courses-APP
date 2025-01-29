import { Stack } from "expo-router";

export default function Course1layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false }} />
      {/* <Stack.Screen name="strategic-management" options={{ headerShown:false }} /> */}
      <Stack.Screen name="chapter1" options={{ headerShown:false }} />
      <Stack.Screen name="chapter2" options={{ headerShown:false }} />
    </Stack>
  );
}
