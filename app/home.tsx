import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("Student");
  const [courseCompletion, setCourseCompletion] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ✅ Load user name from AsyncStorage
        const storedName = await AsyncStorage.getItem("user_name");
        setName(storedName || "Student");

        // ✅ Get completed chapters data
        const keys = await AsyncStorage.getAllKeys();
        const chapterKeys = keys.filter((key) => key.startsWith("completedChapters_"));

        let enrolledCoursesCount = 0;
        let fullyCompletedCourses = 0;
        let courseData = [];

        for (const key of chapterKeys) {
          const courseId = key.replace("completedChapters_", "");
          const completedChapters = JSON.parse(await AsyncStorage.getItem(key)) || [];

          // ✅ Fetch course details from Firestore
          const courseDoc = await getDoc(doc(db, "courses", courseId));
          if (!courseDoc.exists()) continue; // Skip if course doesn't exist

          const { title, description, chapterCount = 1 } = courseDoc.data();

          // ✅ Store chapter count locally
          await AsyncStorage.setItem(`chapterCount_${courseId}`, JSON.stringify(chapterCount));

          if (completedChapters.length > 0) {
            enrolledCoursesCount++;

            courseData.push({
              id: courseId,
              title,
              description,
              chapterCount,
              progress: Math.round((completedChapters.length / chapterCount) * 100),
            });

            if (completedChapters.length === chapterCount) {
              fullyCompletedCourses++;
            }
          }
        }

        // ✅ Calculate overall progress
        setEnrolledCourses(courseData);
        setCourseCompletion(enrolledCoursesCount > 0 ? Math.round((fullyCompletedCourses / enrolledCoursesCount) * 100) : 0);
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* ✅ Welcome Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Welcome back, {name}!</Text>
        <Text style={styles.bannerSubtext}>Continue your learning journey</Text>
      </View>

      {/* ✅ Course Completion Progress */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarGreen, { width: `${courseCompletion}%` }]} />
        </View>
        <Text style={styles.progressText}>{courseCompletion}% Course Completion</Text>
      </View>

      {/* ✅ Continue Learning Section */}
      <Text style={styles.sectionTitle}>Continue Learning</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : enrolledCourses.length === 0 ? (
        <Text style={styles.noCoursesText}>No enrolled courses yet.</Text>
      ) : (
        <FlatList
          data={enrolledCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.courseCard} onPress={() => router.push(`/courses/${item.id}`)}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseDescription}>{item.description}</Text>
              <Text style={styles.chapterCount}>{item.chapterCount} Chapters</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{item.progress}% Complete</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  /* ✅ Banner */
  banner: { backgroundColor: "#007AFF", padding: 20, borderRadius: 10, marginBottom: 15 },
  bannerText: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  bannerSubtext: { fontSize: 14, color: "#d9e6ff", marginTop: 5 },

  /* ✅ Progress Section */
  progressCard: { padding: 15, backgroundColor: "#f8f8f8", borderRadius: 10, alignItems: "center", marginBottom: 15 },
  progressTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  progressBarContainer: { height: 8, width: "100%", backgroundColor: "#e0e0e0", borderRadius: 5, overflow: "hidden", marginTop: 5 },
  progressBarGreen: { height: "100%", backgroundColor: "#4CAF50" },
  progressBar: { height: "100%", backgroundColor: "#007AFF" },
  progressText: { marginTop: 5, fontWeight: "bold", color: "#007AFF", alignSelf: "flex-end" },

  /* ✅ Courses Section */
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  noCoursesText: { fontSize: 14, color: "gray", textAlign: "center", marginTop: 10 },

  /* ✅ Course Cards */
  courseCard: { backgroundColor: "#f8f8f8", padding: 15, borderRadius: 10, marginBottom: 10 },
  courseTitle: { fontSize: 16, fontWeight: "bold" },
  courseDescription: { fontSize: 14, color: "gray", marginBottom: 5 },
  chapterCount: { fontSize: 14, color: "#007AFF", marginBottom: 5 },
});
