import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RagStatus() {
  const router = useRouter();
  const { alert } = useLocalSearchParams();
  const [menuVisible, setMenuVisible] = useState(false);

  const logout = () => {
    router.push("/");
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>RAG Status</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.alertButton, { backgroundColor: "#FF0000" }, alert === "red" && { borderWidth: 3, borderColor: "#FF0000" }]}>
            <Ionicons name="alert-circle-outline" size={24} color="white" />
            <Text style={styles.alertText}>Red Alert</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.alertButton, { backgroundColor: "#FFA500" }, alert === "amber" && { borderWidth: 3, borderColor: "#FFA500" }]}>
            <Ionicons name="alert-circle-outline" size={24} color="white" />
            <Text style={styles.alertText}>Amber Alert</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.alertButton, { backgroundColor: "#32CD32" }, alert === "green" && { borderWidth: 3, borderColor: "#32CD32" }]}>
            <Ionicons name="alert-circle-outline" size={24} color="white" />
            <Text style={styles.alertText}>Green Alert</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A394B",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
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
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonsContainer: {
    alignItems: "center",
  },
  alertButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: "80%",
    justifyContent: "center",
  },
  alertText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
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
