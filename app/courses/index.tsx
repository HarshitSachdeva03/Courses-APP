import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import StrategicManagement from "./strategic-management";

const coursesData = [
  { id: "1", title: "Strategic Management", category: "Management", description: "Learn core management principles and strategies", chapters: 12, duration: "6 Hours", progress: 0.45 },
  { id: "2", title: "Business Analytics", category: "Analytics", description: "Master data-driven decision making", chapters: 10, duration: "5 Hours", progress: 0.20 },
];

const categories = ["All Courses", "Management", "Analytics"];

export default function Courses() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on category & search input
  const filteredCourses = coursesData.filter((course) => 
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

      {/* Course List */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseCard} onPress={() => router.push('/courses/strategic-management' as const)}>
            <View style={styles.categoryTagContainer}>
              <Text style={styles.categoryTag}>{item.category}</Text>
            </View>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseDescription}>{item.description}</Text>
            <Text style={styles.courseInfo}>📖 {item.chapters} Chapters ⏳ {item.duration}</Text>
            
            {/* Progress Bar */}
            <Progress.Bar progress={item.progress} width={null} color="#007AFF" style={styles.progressBar} />
            <Text style={styles.progressText}>{Math.round(item.progress * 100)}% Complete</Text>
          </TouchableOpacity>
        )}
      />
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
  courseCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  categoryTagContainer: { alignSelf: "flex-start", backgroundColor: "#e0e0e0", paddingVertical: 3, paddingHorizontal: 8, borderRadius: 5, marginBottom: 5 },
  categoryTag: { fontSize: 12, color: "#000", fontWeight: "bold" },
  courseTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  courseDescription: { fontSize: 14, color: "gray", marginBottom: 5 },
  courseInfo: { fontSize: 12, color: "gray", marginBottom: 5 },
  progressBar: { height: 8, borderRadius: 5 },
  progressText: { fontSize: 12, color: "gray", marginTop: 5 },
});
