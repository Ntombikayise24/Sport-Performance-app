import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../../contexts/ThemeContext"; // ✅ uses your app theme

export default function Biometrics() {
  const router = useRouter();
  const { colors, effectiveTheme } = useTheme(); // ✅ get theme colors
  const isDarkMode = effectiveTheme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(fadeAnim, {
      toValue: isMenuOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const logout = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const biometrics = [
    { title: "Blood Tests", icon: "blood-bag" },
    { title: "Blood Pressure", icon: "heart-pulse" },
    { title: "Body Composition", icon: "human-male-height" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: "#1A394B" }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view-metrics")}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={[styles.title, { color: "white" }]}>
          Biometric Data
        </Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={26} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Animated Dropdown Menu */}
      {isMenuOpen && (
        <Animated.View
          style={[
            styles.menuDropdown,
            {
              opacity: fadeAnim,
              transform: [{ scale: fadeAnim }],
              backgroundColor: colors.surface,
            },
          ]}
        >
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Subheader */}
      <Text style={[styles.subHeader, { color: colors.muted }]}>
        Check the team’s biometric data.
      </Text>

      {/* Metric Cards */}
      <FlatList
        data={biometrics}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.metricCard,
              {
                backgroundColor: isDarkMode ? "#2A5068" : "#EAF2FA",
              },
            ]}
            activeOpacity={0.85}
          >
            <View style={styles.metricLeft}>
              <MaterialCommunityIcons
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={28}
                color={isDarkMode ? "#4FC3F7" : "#1976D2"}
              />
              <Text style={[styles.metricText, { color: colors.text }]}>
                {item.title}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDarkMode ? "#B0C4DE" : "#555"}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 20,
    marginBottom: 10,
  },
  metricCard: {
    flexDirection: "row",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    elevation: 6,
  },
  metricLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  metricText: {
    fontSize: 17,
    fontWeight: "600",
  },
  menuDropdown: {
    position: "absolute",
    top: 80,
    right: 20,
    borderRadius: 8,
    padding: 8,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "600",
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
