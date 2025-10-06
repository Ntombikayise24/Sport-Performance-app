import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';

export default function Biometrics() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const logout = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const biometrics = [
    "Blood Tests",
    "Blood Pressure",
    "Body Composition",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Biometric Data</Text>
        <IconButton
          icon="menu"
          size={24}
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

      <Text style={styles.subHeader}>Check the team’s biometric data.</Text>

      {biometrics.map((item, index) => (
        <TouchableOpacity key={index} style={styles.metricButton}>
          <Text style={styles.metricText}>{item}</Text>
        </TouchableOpacity>
      ))}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view")}>
          <Ionicons name="home-outline" size={26} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view-metrics")}>
          <Ionicons name="heart-outline" size={26} color="#FF4500" />
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
    backgroundColor: '#1E3A4D',
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
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subHeader: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  metricButton: {
    backgroundColor: '#234C63',
    paddingVertical: 30,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  metricText: {
    color: 'white',
    fontWeight: '900',
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
});
