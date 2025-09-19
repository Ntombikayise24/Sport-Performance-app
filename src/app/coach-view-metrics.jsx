import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton, Searchbar, Text } from "react-native-paper";

import BiometricImage from "../assets/images/Biometric.png";
import HealthImage from "../assets/images/Health.png";
import TrainingImage from "../assets/images/Training.png";
import InjuryImage from "../assets/images/injury.png";
import PhysicalImage from "../assets/images/physical.png";

const TeamMetricsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const logout = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const cards = [
    {
      name: "TRAINING PERFORMANCE",
      text: "TRAINING\nPERFORMANCE",
      icon: (
        <View style={styles.trainingImageWrapper}>
          <Image
            source={TrainingImage}
            style={styles.trainingImage}
            resizeMode="cover"
          />
        </View>
      ),
      color: "#D81B60",
    },
    {
      name: "INJURY & RECOVERY",
      text: "INJURY\n& RECOVERY",
      icon: (
        <Image
          source={InjuryImage}
          style={styles.cardImage}
          resizeMode="contain"
        />
      ),
      color: "rgba(156, 128, 0, 1)",
    },
    {
      name: "BIO-METRIC DATA",
      text: "BIO-METRIC\nDATA",
      icon: (
        <Image
          source={BiometricImage}
          style={styles.cardImage}
          resizeMode="contain"
        />
      ),
      color: "#817f7fff",
    },
    {
      name: "PHYSICAL",
      text: "PHYSICAL",
      icon: (
        <Image
          source={PhysicalImage}
          style={styles.cardImage}
          resizeMode="contain"
        />
      ),
      color: "#188a09b7",
    },
    {
      name: "HEALTH & WELLNESS",
      text: "HEALTH\n& WELLNESS",
      icon: (
        <Image
          source={HealthImage}
          style={styles.cardImage}
          resizeMode="contain"
        />
      ),
      color: "#d17316ff",
    },
  ];

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          color="white"
          onPress={() => router.push("/coach-view")}
        />
        <Text style={styles.title}>Team Metrics</Text>
        <IconButton
          icon="menu"
          size={24}
          color="white"
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      </View>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <Searchbar
        placeholder="Search athlete"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={{ color: "white" }}
        iconColor="white"
        placeholderTextColor="white"
      />

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredCards.map((card) => (
          <TouchableOpacity
            key={card.name}
            style={[styles.card, { backgroundColor: card.color }]}
          >
            <Text style={[styles.cardText, card.textStyle]}>{card.text}</Text>
            <View style={styles.iconContainer}>{card.icon}</View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A4D",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchbar: {
    marginBottom: 20,
    backgroundColor: "#2C4A5A",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "45%",
    height: 140,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    overflow: "hidden",
  },
  cardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  iconContainer: {
    marginTop: 10,
  },
  menuDropdown: {
    position: "absolute",
    top: 75,
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0a3a4d",
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  navButton: {
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
  },
  trainingImage: {
    width: 80,
    height: 80,
  },
  trainingImageWrapper: {
    backgroundColor: "#D81B60",
    borderRadius: 10,
    padding: 5,
  },
});

export default TeamMetricsScreen;
