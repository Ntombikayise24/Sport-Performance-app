import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ContinuousTraining() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Continuous Training</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        {isMenuOpen && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              onPress={() => {
                router.push("/");
                setIsMenuOpen(false);
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="black" />
              <Text style={styles.menuText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Description Card */}
      <View style={styles.card}>
        <Ionicons name="calendar" size={32} color="#fff" style={{ marginRight: 15 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Continuous Training</Text>
          <Text style={styles.cardDescription}>
            Focuses on endurance activities for long periods without rest.
          </Text>
        </View>
      </View>

      {/* Training Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.trainingButton}>
          <Text style={styles.buttonText}>Daily Training</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.trainingButton} onPress={() => router.push("./weekly-training")}>
          <Text style={styles.buttonText}>Weekly Training</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.trainingButton}>
          <Text style={styles.buttonText}>Monthly Training</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A394B",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 8,
  },
  menuDropdown: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    padding: 10,
    zIndex: 100,
  },
  menuText: {
    color: "black",
    marginTop: 5,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#20506B",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    color: "#ccc",
    fontSize: 14,
  },
  buttonContainer: {
    flex: 1,
  },
  trainingButton: {
    flexDirection: "row",
    backgroundColor: "#20506B",
    padding: 15,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
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
