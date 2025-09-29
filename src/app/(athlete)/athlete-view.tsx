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

export default function AthleteView() {
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
          source={require("../../assets/images/logo.jpeg")}
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
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingText}>Hi, Jabulile</Text>
            <Text style={styles.roleText}>Hockey Player</Text>
            <TouchableOpacity style={styles.currentFormButton}>
              <Ionicons name="barbell-outline" size={18} color="white" />
              <Text style={styles.currentFormText}>Current Form</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/images/hockey.png")}
            style={styles.profileImage}
          />
        </View>

        {/* Status + Notifications */}
        <View style={styles.statusNotificationsContainer}>
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Status</Text>
            <Text style={styles.statusMessage}>
              Still good to go, have fun training!
            </Text>
          </View>

          <Text style={styles.notificationsTitle}>Notifications</Text>

          <View style={styles.notificationItem}>
            <Ionicons
              name="person-outline"
              size={20}
              color="black"
              style={styles.notificationIcon}
            />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationTitle}>Coach</Text>
              <Text style={styles.notificationMessage}>
                I need 10 laps so that you keep up the.. 21h ago
              </Text>
            </View>
          </View>

          <View style={styles.notificationItem}>
            <Ionicons
              name="medkit-outline"
              size={20}
              color="black"
              style={styles.notificationIcon}
            />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationTitle}>Medical</Text>
              <Text style={styles.notificationMessage}>
                No notifications yet.
              </Text>
            </View>
          </View>
        </View>

        {/* Metrics Section */}
        <View style={styles.performanceHeader}>
          <Text style={styles.performanceTitle}>Performance Metrics</Text>
          <TouchableOpacity onPress={() => router.push("/(athlete)/playermetrics")}>
            <Ionicons name="arrow-forward-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.metricsCardsContainer}>
          <View style={[styles.metricCard, { backgroundColor: "#E26A2C" }]}>
            <Ionicons name="heart" size={24} color="white" />
            <Text style={styles.metricLabel}>AVG HEART RATE</Text>
            <Text style={styles.metricValue}>145 bpm</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: "#2E7D32" }]}>
            <Ionicons name="flash" size={24} color="white" />
            <Text style={styles.metricLabel}>SPEED</Text>
            <Text style={styles.metricValue}>24.5 km/h</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: "#C9B037" }]}>
            <Ionicons name="navigate" size={24} color="white" />
            <Text style={styles.metricLabel}>DISTANCE</Text>
            <Text style={styles.metricValue}>4.5 km</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/(athlete)/athlete-view")}>
          <Ionicons name="home-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(athlete)/playermetrics")}>
          <Ionicons name="heart-outline" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(athlete)/medical-view")}>
          <Ionicons name="notifications-outline" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(athlete)/check-injuries")}>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  logo: {
    width: 150,
    height: 130,
    resizeMode: "contain",
  },
  menuIcon: {
    padding: 8,
  },
  menuDropdown: {
    position: "absolute",
    top: 90,
    right: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    padding: 10,
    zIndex: 10,
    elevation: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 16,
    color: "black",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingText: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  roleText: {
    color: "#B0C4DE",
    fontSize: 14,
    marginBottom: 10,
  },
  currentFormButton: {
    flexDirection: "row",
    backgroundColor: "#2E4E62",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  currentFormText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 13,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 15,
  },
  statusNotificationsContainer: {
    backgroundColor: "#2E4E62",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statusBox: {
    marginBottom: 15,
  },
  statusTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 5,
  },
  statusMessage: {
    color: "#3CB371",
    fontWeight: "600",
    fontSize: 14,
  },
  notificationsTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#D3D3D3",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: "700",
    color: "black",
  },
  notificationMessage: {
    color: "black",
    fontSize: 12,
  },
  performanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  performanceTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  metricsCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricCard: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 4,
  },
  metricLabel: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  metricValue: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#0a394b",
    paddingVertical: 10,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 10,
  },
});
