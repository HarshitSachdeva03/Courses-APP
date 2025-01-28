// File: app/courses/strategic-management/chapter2.tsx
import { View, Text, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function Chapter2() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapter 2: Strategy Basics</Text>
      <Text style={styles.content}>This chapter explores competitive advantage, SWOT analysis, and strategic planning methodologies.</Text>
      
      <Video
        source={{ uri: "https://www.example.com/video2.mp4" }}
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
