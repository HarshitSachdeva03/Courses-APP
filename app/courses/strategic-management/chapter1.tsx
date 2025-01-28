// File: app/courses/strategic-management/chapter1.tsx
import { View, Text, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function Chapter1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapter 1: Introduction</Text>
      <Text style={styles.content}>This chapter covers the fundamentals of strategic management, including key frameworks and decision-making approaches.</Text>
      
      <Video
        source={{ uri: "https://www.example.com/video.mp4" }}
        useNativeControls
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
      />
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
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 200,
  },
});
