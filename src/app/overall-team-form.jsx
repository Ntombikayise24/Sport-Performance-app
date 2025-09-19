import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OverallTeamForm() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top bar with back arrow, title, and menu */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Overall Team Form</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
      </View>

      {/* Stats box */}
      <View style={styles.statsBox}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Team members</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Active Today</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>35%</Text>
          <Text style={styles.statLabel}>Avg performance</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Team Fixtures</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Results</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Statistics</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/coach-view")}
        >
          <Ionicons name="home-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/coach-view-metrics")}
        >
          <Ionicons name="heart-outline" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="notifications-outline" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/coach-profile")}
        >
          <Ionicons name="person-outline" size={28} color="#32CD32" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A394B",
    padding: 20,
    justifyContent: "flex-start",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    paddingRight: 10,
  },
  backArrow: {
    fontSize: 24,
    color: "black",
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: "black",
  },
  menuButton: {
    width: 30,
    justifyContent: "space-between",
    height: 20,
  },
  menuLine: {
    height: 3,
    backgroundColor: "black",
    borderRadius: 2,
  },
  statsBox: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    padding: 15,
    marginBottom: 30,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
  },
  statLabel: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#0a394b",
    paddingVertical: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});
