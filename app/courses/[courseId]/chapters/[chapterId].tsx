import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview"; // ✅ Ensure WebView import for mobile

// ✅ Define a type for Chapter Data
interface ChapterData {
  videoUrl: string;
  notes: string;
}

export default function ChapterDetailsScreen() {
  const { courseId, chapterId } = useLocalSearchParams<{ courseId: string; chapterId: string }>(); // ✅ Type params
  const router = useRouter();
  const [chapter, setChapter] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [totalChapters, setTotalChapters] = useState<number>(1);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const docRef = doc(db, "courses", courseId, "chapters", chapterId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setChapter(docSnap.data() as ChapterData);
        }
      } catch (error) {
        console.error("Error fetching chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTotalChapters = async () => {
      try {
        const courseDoc = await getDoc(doc(db, "courses", courseId));
        if (courseDoc.exists()) {
          const count = courseDoc.data().chapterCount || 1;
          setTotalChapters(count);
          await AsyncStorage.setItem(`chapterCount_${courseId}`, JSON.stringify(count));
        }
      } catch (error) {
        console.error("Error fetching chapter count:", error);
      }
    };

    const checkCompletion = async () => {
      try {
        const storedChapters = JSON.parse(
          (await AsyncStorage.getItem(`completedChapters_${courseId}`)) || "[]"
        );
        setCompletedChapters(storedChapters);
        setIsCompleted(storedChapters.includes(chapterId));
      } catch (error) {
        console.error("Error checking chapter completion:", error);
      }
    };

    fetchChapter();
    fetchTotalChapters();
    checkCompletion();
  }, [courseId, chapterId]);

  const toggleCompletion = async () => {
    try {
      let updatedChapters: string[];
  
      if (isCompleted) {
        updatedChapters = completedChapters.filter((id) => id !== chapterId);
      } else {
        updatedChapters = [...completedChapters, chapterId];
      }
  
      await AsyncStorage.setItem(`completedChapters_${courseId}`, JSON.stringify(updatedChapters));
  
      // ✅ Fetch total chapters from AsyncStorage (if offline)
      let storedChapterCount = await AsyncStorage.getItem(`chapterCount_${courseId}`);
      const chapterCount = storedChapterCount ? JSON.parse(storedChapterCount) : totalChapters;
  
      // ✅ Calculate Progress Correctly
      const progress = Math.min(Math.round((updatedChapters.length / chapterCount) * 100), 100);
  
    //   // ✅ Store progress locally
    //   await AsyncStorage.setItem(`progress_${courseId}`, JSON.stringify(progress));
  
      // ✅ Notify other pages to fetch updated progress
      setCompletedChapters(updatedChapters);
      setIsCompleted(!isCompleted);
  
      // ✅ Refresh the Courses Page Progress
      await AsyncStorage.setItem("refresh_courses_page", "true");
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };
  

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;
  if (!chapter) return <Text style={styles.errorText}>Chapter not found.</Text>;

  return (
    <ScrollView style={styles.container}> {/* ✅ Ensure ScrollView for large notes */}
      <Text style={styles.title}>Watch Video</Text>

      {Platform.OS === "web" ? (
        <iframe
          width="100%"
          height="250"
          src={`https://www.youtube.com/embed/${new URL(chapter.videoUrl).searchParams.get("v")}`}
          title="YouTube video"
          frameBorder="0"
          allowFullScreen
          style={{ borderRadius: 10, marginBottom: 20 }}
        ></iframe>
      ) : (
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${new URL(chapter.videoUrl).searchParams.get("v")}` }}
          style={styles.video}
        />
      )}

      <Text style={styles.notesTitle}>Notes</Text>
      <Text style={styles.notes}>{chapter.notes}</Text>

      {/* ✅ Mark as Complete Button (Toggles properly) */}
      <TouchableOpacity style={[styles.button, isCompleted && styles.buttonCompleted]} onPress={toggleCompletion}>
        <Text style={styles.buttonText}>{isCompleted ? "Mark as Incomplete" : "Mark as Complete"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  video: { width: "100%", height: 250, borderRadius: 10, marginBottom: 20 }, // ✅ Added missing video styles
  notesTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  notes: { fontSize: 16, color: "gray", marginBottom: 20 }, // ✅ Added margin bottom for spacing
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonCompleted: { backgroundColor: "gray" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
