import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CourseCardProps {
  title: string;
  description: string;
  chapterCount: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, chapterCount }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.chapterCount}>{`${chapterCount} Chapters`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, marginVertical: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, color: "gray", marginVertical: 5 },
  chapterCount: { fontSize: 14, fontWeight: "bold", color: "#007AFF" },
});

export default CourseCard;
