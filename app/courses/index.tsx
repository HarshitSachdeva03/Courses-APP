import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Ensure correct path
import CourseCard from "@/components/CourseCard"; // Import CourseCard component

const categories = ["All Courses", "Management", "Analytics"];

export default function Courses() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          chapterCount: doc.data().chapterCount || 0, // Default to 0 if missing
        }));
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on category & search input
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search courses..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Show Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/courses/${item.id}`)}>
              <CourseCard
                title={item.title}
                description={item.description}
                chapterCount={item.chapterCount}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  searchBar: { backgroundColor: "#f2f2f2", padding: 10, borderRadius: 10, fontSize: 16, marginBottom: 10 },
});

