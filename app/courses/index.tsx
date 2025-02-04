import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db} from "../../constants/firebaseConfig"
import CourseCard from "@/components/CourseCard"; // Import CourseCard component

const categories = ["All Courses", "Management", "Analytics"];

export default function Courses() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from Firebase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    (selectedCategory === "All Courses" || course.category === selectedCategory) &&
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

      {/* Category Filter Tabs */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Show Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard
              course={item}
              onPress={() => router.push(`/courses/${item.id}`)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  searchBar: { backgroundColor: "#f2f2f2", padding: 10, borderRadius: 10, fontSize: 16, marginBottom: 10 },
  categoryContainer: { flexDirection: "row", marginBottom: 15 },
  categoryButton: { padding: 10, borderRadius: 20, marginRight: 10, backgroundColor: "#e0e0e0" },
  selectedCategory: { backgroundColor: "#007AFF" },
  categoryText: { fontSize: 14, fontWeight: "bold", color: "#000" },
  selectedCategoryText: { color: "#fff" },
});
