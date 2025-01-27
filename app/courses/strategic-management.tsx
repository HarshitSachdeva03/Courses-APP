import { View, Text, StyleSheet } from "react-native";

export default function StrategicManagement() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Strategic Management</Text>
      <View style={styles.chapterCard}>
        <Text style={styles.chapterTitle}>Chapter 1: Introduction</Text>
        <Text style={styles.chapterDetails}>Text, Images, and Videos</Text>
      </View>
      <View style={styles.chapterCard}>
        <Text style={styles.chapterTitle}>Chapter 2: Strategy Basics</Text>
        <Text style={styles.chapterDetails}>Text, Images, and Videos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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