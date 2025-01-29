import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";

export default function Chapter1() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black"/>
      </TouchableOpacity>
      <Text style={styles.header}>Chapter 1: Introduction to Strategy</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Overview", "Video", "Reading"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Chapter Progress</Text>
        <Text style={styles.progressPercent}>75%</Text>
      </View>
      <ProgressBar progress={0.75} color="#4169E1" style={styles.progressBar} />

      {/* Content */}
      {activeTab === "Overview" && (
        <View>
          {/* Video Preview */}
          <View style={styles.videoContainer}>
            <Text style={styles.videoTitle}>Video Lecture</Text>
            <View style={styles.videoPreview}>
              <Ionicons name="play-circle" size={50} color="white" />
            </View>
            <Text style={styles.videoDuration}>Duration: 30 minutes</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>What is Strategic Management?</Text>
          <Text style={styles.paragraph}>
            Strategic management is the continuous planning, monitoring, analysis, and assessment
            of all that is necessary for an organization to meet its goals and objectives.
          </Text>

          {/* Key Concepts */}
          <Text style={styles.sectionTitle}>Key Concepts</Text>
          <Text style={styles.bullet}>• Strategic Planning</Text>
          <Text style={styles.bullet}>• Organizational Goals</Text>
          <Text style={styles.bullet}>• Resource Allocation</Text>
        </View>
      )}

      {activeTab === "Video" && (
        <View style={styles.centerContent}>
          <Text>Video Content Placeholder</Text>
        </View>
      )}

      {activeTab === "Reading" && (
        <View style={styles.centerContent}>
          <Text>Reading Material Placeholder</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: "#654321",
  },
  tabText: {
    fontSize: 16,
    color: "black",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: "gray",
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4169E1",
  },
  progressBar: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  videoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  videoPreview: {
    height: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  videoDuration: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  paragraph: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  bullet: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  centerContent: {
    alignItems: "center",
    marginTop: 20,
  },
});
