// File: app/courses/strategic-management.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function StrategicManagement() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Updated header */}
      <Text style={styles.pageHeader}>Course Content</Text>
      <TouchableOpacity onPress={() => router.push("/courses/strategic-management/chapter1")}>
        <View style={styles.chapterCard}>
          <Text style={styles.chapterTitle}>Chapter 1: Introduction</Text>
          <Text style={styles.chapterDetails}>Overview of strategic management principles, decision-making frameworks, and case studies.</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push("/courses/strategic-management/chapter2")}>
        <View style={styles.chapterCard}>
          <Text style={styles.chapterTitle}>Chapter 2: Strategy Basics</Text>
          <Text style={styles.chapterDetails}>Understanding competitive advantage, SWOT analysis, and strategic planning methodologies.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pageHeader: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  chapterCard: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chapterDetails: {
    fontSize: 14,
    color: "gray",
  },
});
