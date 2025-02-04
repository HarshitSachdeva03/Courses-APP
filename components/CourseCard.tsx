import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";

interface CourseCardProps {
  title: string;
  category: string;
  chapters: number;
  duration: number;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, category, chapters, duration, progress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{`${chapters} Chapters • ${duration} Hours`}</Text>
      <ProgressBar progress={progress / 100} color="#007AFF" style={styles.progressBar} />
      <Text style={styles.progressText}>{`${progress}% Complete`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, margin: 10, backgroundColor: "#fff", borderRadius: 10 },
  category: { fontSize: 12, color: "gray", marginBottom: 5 },
  title: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "gray", marginVertical: 5 },
  progressBar: { height: 6, borderRadius: 5, marginTop: 5 },
  progressText: { fontSize: 12, color: "gray", marginTop: 5 },
});

export default CourseCard;
