import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Courses() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>
      <TouchableOpacity style={styles.courseCard} onPress={() => router.push("/courses/strategic-management")}>
        <Text style={styles.courseTitle}>Strategic Management</Text>
        <Text style={styles.courseDetails}>2 Chapters</Text>
      </TouchableOpacity>
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
  courseCard: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  courseDetails: {
    fontSize: 14,
    color: "gray",
  },
});