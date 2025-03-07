import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signUpUser } from "../services/authService";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [entryNumber, setEntryNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !entryNumber || !email || !password) {
        Alert.alert("Error", "Please fill all fields.");
        return;
      }
    try {
      await signUpUser(name, email, password, entryNumber);
      Alert.alert("Signup Successful", "Account Created Successfully.");
      router.replace("/courses");
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }finally {
        setLoading(false);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Entry No." value={entryNumber} onChangeText={setEntryNumber} />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
      <Text style={styles.buttonText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
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
