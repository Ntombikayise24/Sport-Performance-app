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
        {/* Greeting and Profile */}
        <View style={styles.greetingContainer}>
          <View>
            <Text style={styles.greetingText}>Hi, Jabulile</Text>
            <Text style={styles.roleText}>Hockey Player</Text>
          </View>
          <TouchableOpacity style={styles.currentFormButton}>
            <Ionicons name="barbell-outline" size={20} color="white" />
            <Text style={styles.currentFormText}>Current Form</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/hockey.png")}
            style={styles.profileImage}
          />
        </View>

        {/* Status and Notifications */}
        <View style={styles.statusNotificationsContainer}>
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Status</Text>
            <Text style={styles.statusMessage}>
              Still good to go, have fun training!
            </Text>
          </View>

          <View style={styles.notificationsBox}>
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
        </View>

        {/* Performance Metrics */}
        <View style={styles.performanceMetricsContainer}>
          <Text style={styles.performanceTitle}>Performance Metrics</Text>
          <TouchableOpacity style={styles.performanceArrow} onPress={() => router.push('/playermetrics')}>
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/athleteview')}>
          <Ionicons name="home-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/playermetrics')}>
          <Ionicons name="heart-outline" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/dashboard')}>
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
    paddingBottom: 120, // Increased to account for bottom nav height
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
  currentFormButton: {
    flexDirection: "row",
    backgroundColor: "#2E4E62",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 15,
    alignItems: "center",
  },
  currentFormText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "600",
  },
  profileImage: {
    width: 80,
    height: 100,
    borderRadius: 40,
    marginLeft: 15,
  },
  statusNotificationsContainer: {
    backgroundColor: "#2E4E62",
    borderRadius: 5,
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
  },
  notificationsBox: {},
  notificationsTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#A9A9A9",
    borderRadius: 5,
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
  },
  performanceMetricsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  performanceTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    flex: 1,
  },
  performanceArrow: {
    paddingLeft: 10,
  },
  metricsCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricCard: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: "center",
  },
  metricLabel: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10,
  },
  metricValue: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0a394b',
    paddingVertical: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navButton: {
    padding: 10,
  },
});
