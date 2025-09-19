import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MedicalView() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const logout = () => {
    router.push("/");
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.jpeg")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuVisible && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Greeting and Profile */}
        <View style={styles.greetingContainer}>
          <View>
            <Text style={styles.greetingText}>Hi, Meredith Grey</Text>
            <Text style={styles.roleText}>Medical Staff</Text>
          </View>
          <Image
            source={require("../assets/images/hockey.png")}
            style={styles.profileImage}
          />
        </View>

        {/* Notifications */}
        <View style={styles.notificationsBox}>
          <Text style={styles.notificationsTitle}>Notifications</Text>
          <TouchableOpacity style={styles.notificationItem}>
            <Ionicons name="alert-circle-outline" size={20} color="#FF0000" />
            <Text style={styles.notificationText}>Red Alerts! (5)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationItem}>
            <Ionicons name="alert-circle-outline" size={20} color="#FFA500" />
            <Text style={styles.notificationText}>Amber Alerts. (2)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationItem}>
            <Ionicons name="alert-circle-outline" size={20} color="#32CD32" />
            <Text style={styles.notificationText}>Green Alerts. (0)</Text>
          </TouchableOpacity>
        </View>

        {/* Sports Category */}
        <View style={styles.sportsCategoryContainer}>
          <Text style={styles.performanceTitle}>Sports Category</Text>
          <View style={styles.sportsGrid}>
            <View
              style={[styles.metricCardWide, { backgroundColor: "#F57C00" }]}
            >
              <Ionicons name="football" size={28} color="white" />
              <Text style={styles.metricLabel}>SOCCER</Text>
              <Text style={styles.metricValue}>Active</Text>
            </View>
            <View
              style={[styles.metricCardWide, { backgroundColor: "#388E3C" }]}
            >
              <Ionicons name="baseball" size={28} color="white" />
              <Text style={styles.metricLabel}>CRICKET</Text>
              <Text style={styles.metricValue}>Active</Text>
            </View>
            <View
              style={[styles.metricCardWide, { backgroundColor: "#FBC02D" }]}
            >
              <Ionicons name="navigate" size={28} color="white" />
              <Text style={styles.metricLabel}>HOCKEY</Text>
              <Text style={styles.metricValue}>Active</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A394B",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  menuIcon: {
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
    paddingBottom: 80,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  roleText: {
    color: "white",
    fontSize: 14,
    marginTop: 2,
  },
  profileImage: {
    width: 80,
    height: 100,
    borderRadius: 40,
    marginLeft: 15,
  },
  notificationsBox: {
    backgroundColor: "#2E4E62",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  notificationsTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  notificationText: {
    marginLeft: 10,
    color: "white",
    fontWeight: "600",
  },
  sportsCategoryContainer: {
    marginBottom: 30,
  },
  performanceTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 22,
    marginBottom: 18,
  },
  sportsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sportCard: {
    flexBasis: "48%",
    borderRadius: 12,
    paddingVertical: 28,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  metricLabel: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    marginTop: 14,
  },
  metricValue: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 8,
  },
});
