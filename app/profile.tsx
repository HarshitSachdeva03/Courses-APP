import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { logoutUser } from "./services/authService";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState("Anonymous");
  const [entryNumber, setEntryNumber] = useState("0");
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // ✅ Load from AsyncStorage first
        const storedName = await AsyncStorage.getItem("user_name");
        const storedEntryNumber = await AsyncStorage.getItem("user_entry_number");
        const userId = await AsyncStorage.getItem("user_uid");

        if (storedName) setName(storedName);
        if (storedEntryNumber) setEntryNumber(storedEntryNumber);

        // ✅ If user is online, fetch latest data from Firestore
        if (userId) {
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name);
            setEntryNumber(userData.entryNumber);

            // ✅ Update AsyncStorage with latest data
            await AsyncStorage.setItem("user_name", userData.name);
            await AsyncStorage.setItem("user_entry_number", userData.entryNumber);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // ✅ Function to Logout
  const handleLogout = async () => {
    try {
      await logoutUser(); // ✅ Logout from Firebase
      await AsyncStorage.clear(); // ✅ Clear all stored local data
  
      router.replace("/auth/login"); // ✅ Redirect to login page
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };
  

  // ✅ Function to Get Initials for Profile Circle
  const getInitials = (fullName) => {
    const words = fullName.split(" ");
    if (words.length >= 2) return words[0][0] + words[1][0]; // First letters of first and last name
    return words[0][0]; // Only first letter if single word
  };

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;

  return (
    <View style={styles.container}>
      {/* ✅ Profile Section */}
      <View style={styles.profileCard}>
        <View style={styles.profileCircle}>
          <Text style={styles.initials}>{getInitials(name).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.studentId}>Entry No: {entryNumber}</Text>
      </View>

      {/* 🚀 Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  profileCard: { padding: 20, backgroundColor: "#f2f2f2", borderRadius: 10, alignItems: "center" },
  profileCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#A2D9FF", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  initials: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  name: { fontSize: 20, fontWeight: "bold" },
  studentId: { fontSize: 14, color: "gray" },
  logoutButton: { backgroundColor: "red", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
