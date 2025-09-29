<<<<<<< HEAD:app/coachview.jsx
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
=======
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
>>>>>>> 92eeddab8306013455697786f4b4f7ec4a41bb8d:src/app/(coach)/coach-view.tsx

export default function CoachView() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coachImage, setCoachImage] = useState<string | null>(null);

  // ✅ Get logged-in user info from navigation params
  const { name, role } = useLocalSearchParams();

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setCoachImage(result.assets[0].uri);
    }
  };

  const logout = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Top bar with logo and menu */}
      <View style={styles.topBar}>
        <View style={styles.flexSpacer} />
        <Image
          source={require("../../assets/images/logo.jpeg")}
          style={styles.logo}
        />
        <View style={styles.flexSpacer} />
        <View style={styles.menuAndCoachContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.coachImageContainer}
            onPress={pickImage}
          >
            <Image
              source={
                coachImage
                  ? { uri: coachImage }
                  : require("../../assets/images/coach.png")
              }
              style={styles.coachImage}
            />
            <View style={styles.editIconContainer}>
              <Ionicons name="camera" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ Greeting shows actual logged-in user */}
      <View style={styles.greetingContainer}>
<<<<<<< HEAD:src/app/coach-view.jsx
        <Text style={styles.greetingText}>Hi, {name}</Text>
        <Text style={styles.subText}>{role}</Text>
=======
        <Text style={styles.greetingText}>Hi, Ntombikayise</Text>
        <Text style={styles.subText}>Coach</Text>
>>>>>>> 4a1ef0c3451fccdb62252bb0cb502fb3c5187861:src/app/(coach)/coach-view.tsx
      </View>

      {/* Added space between Coach and Team Overview */}
      <View style={styles.spacer20} />

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.teamOverviewButton}
        onPress={() => router.push("/(coach)/team-overview")}
      >
        <Ionicons name="people-outline" size={24} color="#1A394B" />
        <Text style={styles.teamOverviewText}>Team {"\n"}Overview</Text>
      </TouchableOpacity>

      {/* Notifications Section */}
      <TouchableOpacity
        style={styles.notificationsContainer}
        onPress={() => router.push("/(dashboard)/notifications")}
      >
        <Text style={styles.notificationsTitle}>Notifications</Text>
        <View style={styles.notificationItem}>
          <Ionicons name="alert-circle-outline" size={20} color="#FF0000" />
          <Text style={styles.notificationText}>
            Naledi Motaung is on red alert.
          </Text>
        </View>
        <View style={styles.notificationItem}>
          <Ionicons name="alert-circle-outline" size={20} color="#FF0000" />
          <Text style={styles.notificationText}>
            Ayanda Dlamini is on red alert.
          </Text>
        </View>
        <View style={styles.notificationItem}>
          <Ionicons name="alert-circle-outline" size={20} color="#FFA500" />
          <Text style={styles.notificationText}>
            Sarah van de Merwe is on amber alert.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Training Plans Button */}
      <TouchableOpacity
        style={styles.trainingPlansButton}
        onPress={() => router.push("/(coach)/training-plans")}
      >
        <Ionicons name="clipboard-outline" size={24} color="#1A394B" />
        <Text style={styles.trainingPlansText}>Training Plans</Text>
      </TouchableOpacity>

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
          <Ionicons name="heart-outline" size={28} color="#FF4500" />
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
    justifyContent: "flex-start",
  },
  flexSpacer: {
    flex: 1,
  },
  spacer20: {
    height: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 180,
    resizeMode: "contain",
    alignSelf: "center",
  },
  greetingContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  greetingText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
  subText: {
    color: "black",
    fontSize: 14,
  },
  menuButton: {
    width: 30,
    justifyContent: "space-between",
    height: 20,
    marginBottom: 5,
  },
  menuLine: {
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
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
  coachImageContainer: {
    width: 120,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#0a394b",
    backgroundColor: "#1A394B",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 5,
  },
  menuAndCoachContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    position: "absolute",
    top: 0,
    right: 20,
  },
  teamOverviewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a394b",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
  teamOverviewText: {
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
    color: "white",
  },
  notificationsContainer: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  notificationsTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
    color: "black",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A3A3A3",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationText: {
    marginLeft: 8,
    color: "black",
    fontSize: 14,
  },
  trainingPlansButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
  trainingPlansText: {
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
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
  coachImage: {
    width: 100,
    height: 140,
    borderRadius: 100,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#0a394b",
    borderRadius: 20,
    padding: 5,
  },
});
