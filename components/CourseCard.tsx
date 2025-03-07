import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  chapterCount: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, description, chapterCount }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem(`progress_${id}`);
        if (storedProgress !== null) {
          setProgress(parseInt(storedProgress, 10)); // Convert to number
        } else {
          setProgress(0); // Default to 0% if no data found
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };
  
    fetchProgress();
  }, [id]);

  return (
    <View style={styles.card}>
      {/* Course Title */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {/* Chapter Count with Icon */}
      <View style={styles.chapterContainer}>
        <Ionicons name="book-outline" size={20} color="#007AFF" />
        <Text style={styles.chapterText}>{`${chapterCount} Chapters`}</Text>
      </View>

      {/* Progress Bar + Percentage */}
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress / 100} color="#007AFF" style={styles.progressBar} />
        <Text style={styles.progressText}>{`${progress}% Complete`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, color: "gray", marginVertical: 5 },
  chapterContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  chapterText: { fontSize: 14, marginLeft: 5, color: "#007AFF" },

  // ✅ Fix: Properly align progress bar & text
  progressContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", // Ensures proper spacing
    marginTop: 10,
    width: "75%", // ✅ The progress bar now takes only 75% of the card
  },
  progressBar: { 
    flex: 1, // ✅ Now it takes the correct width relative to the container
    height: 1, 
    borderRadius: 5, 
    marginRight: 10,  
  },
  progressText: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#007AFF",
    textAlign: "right", // Ensures text is aligned correctly
  },
});



export default CourseCard;
