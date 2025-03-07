import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // ✅ Ensure correct import
import CourseCard from "@/components/CourseCard"; // ✅ Import CourseCard component
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Courses() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]); // ✅ Store course list
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState({}); // ✅ Store dynamically calculated progress

  // ✅ Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          chapterCount: doc.data().chapterCount || 1, // ✅ Default to 1 if missing
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

  // ✅ Dynamically Calculate Progress
  useEffect(() => {
    const fetchProgress = async () => {
      let progress = {};
    
      try {
        const keys = await AsyncStorage.getAllKeys();
        console.log("AsyncStorage Keys:", keys);
    
        const completedChapterKeys = keys.filter((key) => key.startsWith("completedChapters_"));
        console.log("Completed Chapter Keys:", completedChapterKeys);
    
        for (const key of completedChapterKeys) {
          const courseId = key.replace("completedChapters_", "");
          const completedChapters = JSON.parse(await AsyncStorage.getItem(key)) || [];
          console.log(`Completed Chapters for ${courseId}:`, completedChapters);
    
          // ✅ Get total chapter count (Try AsyncStorage first, then Firestore)
          let chapterCount = await AsyncStorage.getItem(`chapterCount_${courseId}`);
          if (!chapterCount) {
            const courseDoc = await getDoc(doc(db, "courses", courseId));
            if (courseDoc.exists()) {
              chapterCount = courseDoc.data().chapterCount || 1;
              await AsyncStorage.setItem(`chapterCount_${courseId}`, JSON.stringify(chapterCount));
            } else {
              chapterCount = 1;
            }
          } else {
            chapterCount = JSON.parse(chapterCount);
          }
    
          console.log(`Total Chapters in ${courseId}:`, chapterCount);
    
          // ✅ Calculate progress dynamically
          progress[courseId] = chapterCount > 0 ? Math.round((completedChapters.length / chapterCount) * 100) : 0;
          console.log(`Calculated Progress for ${courseId}:`, progress[courseId]);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    
      setProgressData(progress);
    };
    

    fetchProgress();
  }, [courses]); // ✅ Run when courses are loaded

  // ✅ Filter courses based on search input
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* ✅ Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search courses..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* ✅ Show Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log(`Rendering Course: ${item.title}, Progress: ${progressData[item.id] || 0}`);
          
          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/courses/${item.id}`,
                  params: { courseName: item.title }, 
                })
              }
            >
              <CourseCard
                title={item.title}
                description={item.description}
                chapterCount={item.chapterCount}
                progress={progressData[item.id] || 0} // ✅ Dynamically calculate progress
              />
            </TouchableOpacity>
          );
        }}
      />
      
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  searchBar: { backgroundColor: "#f2f2f2", padding: 10, borderRadius: 10, fontSize: 16, marginBottom: 10 },
});
