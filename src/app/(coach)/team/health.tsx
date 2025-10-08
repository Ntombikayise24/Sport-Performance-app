import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";

const HealthScreen = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const healthMetrics = [
    "Mental Fatigue Levels",
    "Mood",
    "Nutrition Tracking",
    "Physical Fatigue Levels",
    "Sleep Quality",
    "Stress Levels",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Health & Wellness</Text>
        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <MaterialCommunityIcons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Description */}
      <Text style={styles.description}>
        Check the team&apos;s health and wellness based on their questionnaires and data intake.
      </Text>

      {/* Health Metrics Buttons */}
      <ScrollView contentContainerStyle={styles.metricsContainer}>
        {healthMetrics.map((metric) => (
          <TouchableOpacity key={metric} style={styles.metricButton}>
            <Text style={styles.metricButtonText}>{metric}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view")}>
          <Ionicons name="home-outline" size={26} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view-metrics")}>
          <MaterialCommunityIcons name="chart-bar" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(dashboard)/notifications")}>
          <Ionicons name="notifications-outline" size={26} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-profile")}>
          <Ionicons name="person-outline" size={26} color="#32CD32" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A4D",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  menuDropdown: {
    position: "absolute",
    top: 75,
    right: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  menuItemText: {
    fontSize: 10,
    color: "black",
  },
  description: {
    color: "white",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  metricsContainer: {
    justifyContent: "center",
  },
  metricButton: {
    backgroundColor: "#2C4A5A",
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  metricButtonText: {
    color: "white",
    fontWeight: "600",
    letterSpacing: 1,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0a3a4d",
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
  },
});

export default HealthScreen;
