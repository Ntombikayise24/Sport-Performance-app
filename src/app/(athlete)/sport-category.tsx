import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SportCategory() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const logout = () => {
    router.push("/");
    setMenuVisible(false);
  };

  const sports = [
    { name: "Aerobics", icon: "fitness", color: "#FF5722", status: "Active" },
    { name: "Basketball", icon: "basketball", color: "#FF9800", status: "Active" },
    { name: "Cycling", icon: "bicycle", color: "#4CAF50", status: "Active" },
    { name: "Fast Walking", icon: "walk", color: "#2196F3", status: "Active" },
    { name: "Hiking", icon: "trail-sign", color: "#9C27B0", status: "Active" },
    { name: "Jump Rope", icon: "repeat", color: "#00BCD4", status: "Active" },
    { name: "Run", icon: "walk", color: "#8BC34A", status: "Active" },
    { name: "Soccer", icon: "football", color: "#F57C00", status: "Active" },
    { name: "Swimming", icon: "water", color: "#3F51B5", status: "Active" },
    { name: "Tennis", icon: "tennisball", color: "#E91E63", status: "Active" },
    { name: "Yoga", icon: "body", color: "#607D8B", status: "Active" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>

      {/* Menu Dropdown */}
      {menuVisible && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Sport Category</Text>
        {sports.map((sport, index) => (
          <TouchableOpacity key={index} style={[styles.sportCard, { backgroundColor: sport.color }]} onPress={() => router.push("/(athlete)/rag-status")}>
            <Ionicons name={sport.icon as any} size={40} color="white" />
            <View style={styles.sportInfo}>
              <Text style={styles.sportName}>{sport.name}</Text>
              <Text style={styles.sportStatus}>{sport.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(athlete)/medical-view")}
        >
          <Ionicons name="home-outline" size={26} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(athlete)/playermetrics")}
        >
          <MaterialCommunityIcons name="chart-bar" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(dashboard)/notifications")}
        >
          <Ionicons name="notifications-outline" size={26} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(athlete)/athlete-profile")}
        >
          <Ionicons name="person-outline" size={26} color="#32CD32" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A394B",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A394B",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },

  menuIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
  },
  menuDropdown: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    zIndex: 10,
    elevation: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    marginLeft: 8,
    fontSize: 16,
    color: "black",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  sportCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sportInfo: {
    marginLeft: 20,
  },
  sportName: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  sportStatus: {
    color: "white",
    fontSize: 18,
    marginTop: 8,
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
  navButton: {
    padding: 10,
  },
});
