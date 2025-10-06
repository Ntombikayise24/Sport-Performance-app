import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HealthScreen = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttons = [
    "Mental Fatigue Levels",
    "Mood",
    "Nutrition Tracking",
    "Physical Fatigue Levels",
    "Sleep Quality",
    "Stress Levels",
  ];

  const logout = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Health & Wellness</Text>
        <Ionicons
          name="menu"
          size={28}
          color="white"
          onPress={() => setIsMenuOpen(!isMenuOpen)}
          style={styles.menuIcon}
        />
      </View>

      {isMenuOpen && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.description}>
        Check the team's health and wellness based on their questionnaires and data intake.
      </Text>
      <View style={styles.buttonsContainer}>
        {buttons.map((btn) => (
          <TouchableOpacity key={btn} style={styles.button}>
            <Text style={styles.buttonText}>{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  menuIcon: {
    marginRight: 0,
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
    zIndex: 100,
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
    textAlign: "center",
    marginBottom: 30,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#2C4A5A",
    borderRadius: 8,
    paddingVertical: 20,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#0a394b",
    paddingVertical: 12,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 8,
  },
});

export default HealthScreen;
