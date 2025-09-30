import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const trainingTypes = [
  {
    id: "1",
    title: "Continuous Training",
    description: "Focuses on endurance activities for long periods without rest.",
  },
  {
    id: "2",
    title: "Interval Training",
    description:
      "Alternating between periods of high-intensity work and recovery, improves speed, strength and muscular endurance.",
  },
  {
    id: "3",
    title: "Strength Training",
    description:
      "Includes exercises to build muscle and increase general strength.",
  },
  {
    id: "4",
    title: "Flexibility Training",
    description: "Enhances range of motion and helps prevent injuries.",
  },
  {
    id: "5",
    title: "Plyometric Training",
    description:
      "Exercises that focus on power by training muscles to exert maximum force in short intervals.",
  },
  {
    id: "6",
    title: "Fartlek Training",
    description: "Mixes high-training and low-training efforts.",
  },
];

export default function TrainingTypes() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderTrainingType = ({ item }) => (
    <TouchableOpacity
      style={styles.trainingItem}
      onPress={() => {
        if (item.title === "Continuous Training") {
          router.push("./continuous-training");
        }
      }}
    >
      <View style={styles.avatar}>
        <Ionicons name="person" size={24} color="white" />
      </View>
      <View style={styles.trainingInfo}>
        <Text style={styles.trainingTitle}>{item.title}</Text>
        <Text style={styles.trainingDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="white" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Training Plans</Text>
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
      <Text style={styles.subTitle}>Select training.</Text>
      <FlatList
        data={trainingTypes}
        keyExtractor={(item) => item.id}
        renderItem={renderTrainingType}
        contentContainerStyle={styles.listContent}
      />

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
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  subTitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  trainingItem: {
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
  trainingInfo: {
    flex: 1,
  },
  trainingTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  trainingDescription: {
    color: "#ccc",
    fontSize: 14,
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
