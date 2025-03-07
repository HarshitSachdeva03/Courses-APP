import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      {/* ✅ Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      
      {/* ✅ Courses Tab */}
      <Tabs.Screen
        name="courses"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />

      {/* ✅ Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
  {/* ❌ Explicitly Hide Unwanted Pages */}
      <Tabs.Screen name="about" options={{ href: null }} />
      <Tabs.Screen name="auth/login" options={{ href: null }} />
      <Tabs.Screen name="auth/signup" options={{ href: null }} />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
