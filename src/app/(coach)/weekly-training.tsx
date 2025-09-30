import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function WeeklyTraining() {
  const router = useRouter();
  const [trainingPlan, setTrainingPlan] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="white"
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Weekly Training</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen((prev) => !prev)}
        >
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        {menuOpen && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              onPress={() => {
                router.push("/");
                setMenuOpen(false);
              }}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.subtitle}>Select training.</Text>

      <View style={styles.highlightedTraining}>
        <Ionicons
          name="calendar"
          size={24}
          color="white"
          style={styles.icon}
        />
        <View style={styles.trainingInfo}>
          <Text style={styles.trainingTitle}>Continuous Training</Text>
          <Text style={styles.trainingDescription}>Weekly training</Text>
        </View>
      </View>

      <Text style={styles.createTrainingLabel}>Create training plan</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={6}
        placeholder="Type here..."
        placeholderTextColor="#ccc"
        value={trainingPlan}
        onChangeText={setTrainingPlan}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save as</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view")}>
          <Ionicons name="home-outline" size={26} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(coach)/coach-view-metrics")}
        >
          <MaterialCommunityIcons name="chart-bar" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(dashboard)/notifications")}>
          <Ionicons name="notifications-outline" size={26} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-profile")}>
          <Ionicons name="person-outline" size={26} color="#32CD32" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A394B",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutText: {
    color: "white",
    fontSize: 14,
    padding: 8,
    backgroundColor: "#20506B",
    borderRadius: 6,
  },
  subtitle: {
    color: "white",
    marginBottom: 15,
  },
  highlightedTraining: {
    flexDirection: "row",
    backgroundColor: "#20506B",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  trainingInfo: {
    flex: 1,
  },
  trainingTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  trainingDescription: {
    color: "#ccc",
    fontSize: 14,
  },
  createTrainingLabel: {
    color: "white",
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: "#20506B",
    borderRadius: 8,
    color: "white",
    padding: 10,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#20506B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  menuButton: {
    padding: 5,
  },
  menuDropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#20506B",
    borderRadius: 6,
    padding: 10,
    zIndex: 100,
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
