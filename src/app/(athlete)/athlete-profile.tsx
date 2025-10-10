import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function AthleteProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const athleteName = params.name || "Athlete";
  const [selectedRange, setSelectedRange] = useState("W");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ranges = [
    { key: "D", label: "D" },
    { key: "W", label: "W" },
    { key: "M", label: "M" },
    { key: "6M", label: "6M" },
    { key: "Y", label: "Y" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{athleteName}</Text>
        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        {isMenuOpen && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                setIsMenuOpen(false);
                router.push("/"); // logout to home
              }}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.speedLabel}>AVERAGE RUNNING SPEED</Text>
        <Text style={styles.speedValue}>38 <Text style={styles.speedUnit}>km/h</Text></Text>
        <Text style={styles.dateRange}>30 Aug-29 Sep 2025</Text>

        <View style={styles.rangeSelector}>
          {ranges.map((range) => (
            <TouchableOpacity
              key={range.key}
              style={[
                styles.rangeButton,
                selectedRange === range.key && styles.rangeButtonSelected,
              ]}
              onPress={() => setSelectedRange(range.key)}
            >
              <Text
                style={[
                  styles.rangeButtonText,
                  selectedRange === range.key && styles.rangeButtonTextSelected,
                ]}
              >
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chartPlaceholder}>
          <Image source={require('../../assets/images/chart.png')} style={styles.chartImage} />
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Average Hear Rate</Text>
            <Text style={styles.metricValue}>24.5 bpm</Text>
            <Text style={styles.metricTime}>08:40</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Distance Traveled</Text>
            <Text style={styles.metricValue}>4.5 km</Text>
            <Text style={styles.metricTime}>08:40</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Steps Taken</Text>
            <Text style={styles.metricValue}>2096 steps</Text>
            <Text style={styles.metricTime}>08:40</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Sleep Quality</Text>
            <Text style={styles.metricValue}>5h 33mins</Text>
            <Text style={styles.metricTime}>08:40</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Stress Levels</Text>
            <View style={styles.stressBar}>
              <View style={[styles.stressSegment, { backgroundColor: "#00f" }]} />
              <View style={[styles.stressSegment, { backgroundColor: "#0f0" }]} />
              <View style={[styles.stressSegment, { backgroundColor: "#ff0" }]} />
              <View style={[styles.stressSegment, { backgroundColor: "#f00" }]} />
            </View>
            <Text style={styles.stressText}>Still okay!</Text>
            <Text style={styles.metricTime}>08:40</Text>
          </View>
        </View>
      </ScrollView>

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
    backgroundColor: "#1A394B",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  contentContainer: {
    paddingBottom: 100,
  },
  speedLabel: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  speedValue: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  speedUnit: {
    fontSize: 24,
  },
  dateRange: {
    color: "white",
    fontSize: 12,
    marginBottom: 15,
  },
  rangeSelector: {
    flexDirection: "row",
    marginBottom: 15,
  },
  rangeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#2E4E62",
    marginRight: 10,
  },
  rangeButtonSelected: {
    backgroundColor: "#E26A2C",
  },
  rangeButtonText: {
    color: "white",
    fontWeight: "600",
  },
  rangeButtonTextSelected: {
    color: "white",
  },
  chartPlaceholder: {
    height: 250,
    backgroundColor: 'transparent',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  chartText: {
    color: "#888",
  },
  chartImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderWidth: 0,
  },
  metricsContainer: {
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: "#20506B",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  metricLabel: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 5,
  },
  metricValue: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  metricTime: {
    color: "#ccc",
    fontSize: 10,
    marginTop: 5,
  },
  stressBar: {
    flexDirection: "row",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 5,
  },
  stressSegment: {
    flex: 1,
  },
  stressText: {
    color: "#FFA500",
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#12324E',
    paddingVertical: 12,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 8,
  },
  menuDropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#D9D9D9",
    zIndex: 10,
    elevation: 10,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 5,
  },
  logoutText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
});
