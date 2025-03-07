import { Stack, useRouter } from "expo-router";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function CoursesLayout() {
  const router = useRouter();
  const { courseId, chapterId } = useLocalSearchParams(); // ✅ Get current route params
  

  return (
    <Stack>
  {/* ✅ Courses Page - Only show "Courses" */}
  <Stack.Screen
        name="index"
        options={{
          title: "Courses",
        }}
      />
     {/* ✅ Chapters Page - Show Course Name */}
     <Stack.Screen
        name="[courseId]"
        options={({ route }) => ({
          title: route.params?.courseName || "Chapters", // ✅ Use course name
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
     {/* ✅ Chapter Page - Show Chapter Name */}
     <Stack.Screen
        name="[courseId]/chapters/[chapterId]"
        options={({ route }) => ({
          title: route.params?.chapterName || "Chapter", // ✅ Use chapter name
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
  
    </Stack>
  );
}
