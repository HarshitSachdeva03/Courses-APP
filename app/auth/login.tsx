import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "../services/authService";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password.");
        return;
      }
    try {
      await loginUser(email, password);
      Alert.alert("Success", "Login successful!");
      router.replace("/courses");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }finally {
        setLoading(false);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{loading ? "Logging In..." : "Log In"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { backgroundColor: "#f2f2f2", padding: 12, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  linkText: { color: "#007AFF", textAlign: "center", marginTop: 10 },
});
