import { Stack } from "expo-router";

export default function CoursesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Courses" }} />
      <Stack.Screen name="[courseId]" options={{ title: "Chapters" }} />
      <Stack.Screen name="[courseId]/chapters/[chapterId]" options={{ title: "Chapter Details" }} />
    </Stack>
  );
}
