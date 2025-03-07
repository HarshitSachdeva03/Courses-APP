import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function CourseChaptersScreen() {
  const { courseId } = useLocalSearchParams(); // Get selected course ID from route
  const router = useRouter();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses", courseId, "chapters"));
        const fetchedChapters = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChapters(fetchedChapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseId]);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapters</Text>
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.chapterCard}
            onPress={() =>
              router.push({
                pathname: `/courses/${courseId}/chapters/${item.id}`,
                params: { chapterTitle: item.title }, // ✅ Pass chapter title
              })
            }
          >
            <Text style={styles.chapterTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  chapterCard: { padding: 15, marginVertical: 8, backgroundColor: "#f5f5f5", borderRadius: 8 },
  chapterTitle: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
});
