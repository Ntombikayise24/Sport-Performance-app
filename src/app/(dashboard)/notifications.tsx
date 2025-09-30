import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Notifications() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, name: "Naledi Motaung", alert: "red" },
    { id: 2, name: "Ayanda Dlamini", alert: "red" },
    { id: 3, name: "Sarah van de Merwe", alert: "amber" },
    { id: 4, name: "Karabelo Ndlovu", alert: "red" },
    { id: 5, name: "Michaela Smith", alert: "amber" },
  ]);

  const [sortOrder, setSortOrder] = useState("asc");

  const logout = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const sortNotifications = () => {
    const sorted = [...notifications].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setNotifications(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const alertColors = {
    red: "red",
    amber: "orange",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(coach)/coach-view")}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Ionicons name="menu" size={24} color="white" />
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

      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton} onPress={sortNotifications}>
          <Text style={styles.sortButtonText}>
            Sort {sortOrder === "asc" ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.notificationsList}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <Ionicons name="notifications-outline" size={20} color="white" />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.nameText}>{notification.name}</Text>
              <Text style={styles.isOnText}> is on </Text>
              <Text
                style={[
                  styles.alertText,
                  { color: alertColors[notification.alert] },
                ]}
              >
                {notification.alert} alert.
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(coach)/coach-view")}
        >
          <Ionicons name="home-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(coach)/coach-view-metrics")}
        >
        <MaterialCommunityIcons name="chart-bar" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(dashboard)/notifications")}
        >
          <Ionicons name="notifications-outline" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(coach)/coach-profile")}
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuButton: {
    padding: 5,
  },
  menuDropdown: {
    position: "absolute",
    top: 40,
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
  sortContainer: {
    marginBottom: 10,
  },
  sortButton: {
    backgroundColor: "#2A4A6E",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  sortButtonText: {
    color: "white",
    fontSize: 14,
  },
  notificationsList: {
    paddingBottom: 20,
  },
  notificationText: {
    marginLeft: 10,
    fontSize: 14,
  },
  notificationTextContainer: {
    flexDirection: "row",
  },
  nameText: {
    color: "white",
  },
  isOnText: {
    color: "white",
  },
  alertText: {
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A5A7E",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "white",
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
});
