import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TeamOverview() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const teams = [
    { name: "Vikings", route: "/vikings" },
    { name: "Warriors", route: "/warriors" },
    { name: "Tigers", route: "/tigers" },
    { name: "Eagles", route: "/eagles" },
  ];

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
        <Text style={styles.title}>Team Overview</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
      </View>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <View style={[styles.menuDropdown, { top: 50, right: 0 }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              router.push("/");
              setIsMenuOpen(false);
            }}
          >
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search team"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Team buttons */}
      {filteredTeams.map((team) => (
        <TouchableOpacity
          key={team.name}
          style={styles.teamButton}
          onPress={() => router.push(team.route)}
        >
          <Ionicons
            name="people-outline"
            size={24}
            color="#1A394B"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.teamText}>{team.name}</Text>
        </TouchableOpacity>
      ))}

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
    marginBottom: 20,
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
    backgroundColor: "white",
    borderRadius: 2,
  },
  menuDropdown: {
    position: "absolute",
    top: 60,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
    marginTop: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  addButton: {
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: 24,
    color: "black",
  },
  teamButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  teamText: {
    fontSize: 18,
    fontWeight: "700",
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
});
