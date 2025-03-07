import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Platform, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { WebView } from "react-native-webview"; // WebView only for Mobile

export default function ChapterDetailsScreen() {
  const { courseId, chapterId } = useLocalSearchParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const docRef = doc(db, "courses", courseId, "chapters", chapterId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setChapter(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [courseId, chapterId]);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;
  if (!chapter) return <Text style={styles.errorText}>Chapter not found.</Text>;

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(chapter.videoUrl);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chapter.title}</Text>

      {/* Use iframe for Web, WebView for Mobile */}
      {videoId ? (
        Platform.OS === "web" ? (
          <iframe
            width="100%"
            height="250"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
            style={{ borderRadius: 10, marginBottom: 20 }}
          ></iframe>
        ) : (
          <WebView 
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }} 
            style={styles.video} 
          />
        )
      ) : (
        <Text style={styles.errorText}>Invalid YouTube URL</Text>
      )}

      {/* Notes Section */}
      <Text style={styles.notesTitle}>Notes</Text>
      <Text style={styles.notes}>{chapter.notes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  video: { height: 250, marginBottom: 20 },
  notesTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  notes: { fontSize: 16, color: "gray" },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
});
