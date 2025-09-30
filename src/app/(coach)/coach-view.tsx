import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export default function CoachView() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coachImage, setCoachImage] = useState<string | null>(null);
  const { name, role } = useLocalSearchParams();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  const notifications = [
    { msg: "Naledi Motaung is on red alert.", color: "#FF0000" },
    { msg: "Ayanda Dlamini is on red alert.", color: "#FF0000" },
    { msg: "Sarah van de Merwe is on amber alert.", color: "#FFA500" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.jpeg")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        {isMenuOpen && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={logout} style={styles.menuItem}>
              <Ionicons name="log-out-outline" size={20} color="black" />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.greeting}>Hi, Ntombikayise</Text>
          <Text style={styles.role}>{role}</Text>
          <TouchableOpacity
            style={styles.teamButton}
            onPress={() => router.push("/(coach)/team-overview")}
          >
            <Ionicons name="people-outline" size={20} color="white" />
            <Text style={styles.teamButtonText}>Team Overview</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          <Image
            source={
              coachImage
                ? { uri: coachImage }
                : require("../../assets/images/coach.png")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={styles.notificationsBox}>
        <Text style={styles.notificationsTitle}>Notifications</Text>
        {notifications.map((n, idx) => (
          <TouchableOpacity
            style={styles.notificationItem}
            key={idx}
            onPress={() => router.push("/(dashboard)/notifications")}
            activeOpacity={0.7}
          >
            <Ionicons name="alert-circle-outline" size={20} color={n.color} />
            <Text style={styles.notificationText}>{n.msg}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Training Plans Button */}
      <TouchableOpacity
        style={styles.trainingButton}
        onPress={() => router.push("/(coach)/training-plans")}
      >
        <Ionicons name="clipboard-outline" size={24} color="white" />
        <Text style={styles.trainingText}>Training Plans</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view")}>
          <Ionicons name="home-outline" size={26} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(coach)/coach-view-metrics")}
        >
          <MaterialCommunityIcons name="chart-bar" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(dashboard)/notifications")}>
          <Ionicons name="notifications-outline" size={26} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-profile")}>
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
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 130,
    resizeMode: "contain",
  },
  menuButton: {
    padding: 8,
  },
  menuDropdown: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    padding: 10,
    zIndex: 100,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  menuText: {
    color: "black",
    marginLeft: 6,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
  },
  profileTextContainer: {
    flex: 1,
  },
  greeting: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  role: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
  },
  teamButton: {
    flexDirection: "row",
    backgroundColor: "#2E4E62",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  teamButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 6,
  },
  imageWrapper: {
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    overflow: "hidden",
    width: 100,
    height: 100,
    backgroundColor: "#2E4E62",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  notificationsBox: {
    backgroundColor: "#2E4E62",
    borderRadius: 8,
    padding: 15,
    marginTop: 30,
  },
  notificationsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationText: {
    marginLeft: 10,
    color: "black",
    fontSize: 14,
  },
  trainingButton: {
    flexDirection: "row",
    backgroundColor: "#2E4E62",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  trainingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
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
});
