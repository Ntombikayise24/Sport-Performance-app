import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const athletesData = [
  { id: "1", name: "Sarah van de Merwe", role: "Team Captain", status: "Online" },
  { id: "2", name: "Ayanda Dlamini", role: "Goalkeeper", status: "Training" },
  { id: "3", name: "Siphosethu Khumalo", role: "Midfielder", status: "Training" },
  { id: "4", name: "Michaela Smith", role: "Midfielder", status: "Offline" },
  { id: "5", name: "Chloe Anderson", role: "Winger", status: "Offline" },
  { id: "6", name: "Karabelo Ndlovu", role: "Winger", status: "Online" },
  { id: "7", name: "Lerato Mthembu", role: "Center", status: "Training" },
];

const statusColors = {
  Online: "#4CAF50",
  Training: "#FF9800",
  Offline: "#9E9E9E",
};

export default function TrainingPlans() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedAthleteId, setSelectedAthleteId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredAthletes = athletesData.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderAthleteItem = ({ item }) => {
    const isSelected = item.id === selectedAthleteId;
    return (
      <TouchableOpacity
        style={styles.athleteItem}
        onPress={() => setSelectedAthleteId(item.id)}
      >
        <View style={styles.avatar}>
          <Ionicons name="person" size={24} color="white" />
        </View>
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteName}>{item.name}</Text>
          <Text style={styles.athleteRole}>{item.role}</Text>
          <Text style={[styles.athleteStatus, { color: statusColors[item.status] || "#000" }]}>
            {item.status}
          </Text>
        </View>
        <View style={styles.radioButtonOuter}>
          {isSelected && <View style={styles.radioButtonInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={28} color="white" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Training Plans</Text>
        <TouchableOpacity onPress={() => setIsMenuOpen((prev) => !prev)}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        {isMenuOpen && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={() => { router.push("/"); setIsMenuOpen(false); }}>
              <Ionicons name="log-out-outline" size={20} color="black" />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search athlete"
        placeholderTextColor="#ccc"
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.subtitle}>Select an athlete to assign training.</Text>

      <FlatList
        data={filteredAthletes}
        keyExtractor={(item) => item.id}
        renderItem={renderAthleteItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (selectedAthleteId) {
            router.push("./training-types");
          } else {
            alert("Please select an athlete before proceeding.");
          }
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

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
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#0F2C3C",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 80, // to avoid bottom nav overlap
  },
  athleteItem: {
    flexDirection: "row",
    backgroundColor: "#20506B",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#000",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  athleteInfo: {
    flex: 1,
  },
  athleteName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  athleteRole: {
    color: "#ccc",
    fontSize: 14,
  },
  athleteStatus: {
    fontSize: 12,
    marginTop: 2,
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
  },
  menuDropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    padding: 10,
    zIndex: 100,
  },
  menuText: {
    color: "black",
    marginTop: 5,
  },
  nextButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#20506B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 5,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
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
