import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const injuries = [
  { id: "1", name: "Naledi Motaung", alert: "red alert" },
  { id: "2", name: "Ayanda Dlamini", alert: "red alert" },
  { id: "3", name: "Sarah van de Merwe", alert: "amber alert" },
  { id: "4", name: "Karabelo Ndlovu", alert: "red alert" },
  { id: "5", name: "Michaela Smith", alert: "amber alert" },
];

export default function CheckInjuries() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getAlertStyle = (alert) => {
    switch (alert) {
      case "red alert":
        return { color: "red" };
      case "amber alert":
        return { color: "orange" };
      default:
        return { color: "black" };
    }
  };

  const renderInjury = ({ item }) => (
    <View style={styles.injuryItem}>
      <Image
        source={require("../assets/images/alarm.png")}
        style={styles.alarmIcon}
      />
      <Text style={styles.injuryText}>
        {item.name} is on{" "}
        <Text style={getAlertStyle(item.alert)}>{item.alert}.</Text>
      </Text>
    </View>
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
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
      </View>

      {/* Sort button */}
      <TouchableOpacity style={styles.sortButton}>
        <Text style={styles.sortButtonText}>Sort ▼</Text>
      </TouchableOpacity>

      {/* Injury list */}
      <FlatList
        data={injuries}
        renderItem={renderInjury}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

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
    backgroundColor: "black",
    borderRadius: 2,
  },
  sortButton: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  sortButtonText: {
    fontSize: 16,
    color: "black",
  },
  injuryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A3A3A3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  alarmIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  injuryText: {
    fontSize: 14,
    color: "black",
  },
  list: {
    flex: 1,
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
