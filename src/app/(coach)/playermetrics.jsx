import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PlayerMetrics() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const logout = () => {
    router.push('/');
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.jpeg')} style={styles.logo} />
        <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuVisible && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>Player Metrics</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search metric"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          {/* Row 1 */}
          <View style={styles.metricCard} backgroundColor="#FFD700"> {/* Distance - Yellow */}
            <Ionicons name="location-outline" size={24} color="white" />
            <Text style={styles.metricLabel}>Distance</Text>
            <Text style={styles.metricValue}>4.5 km</Text>
          </View>

          <View style={styles.metricCard} backgroundColor="#FF69B4"> {/* Steps - Pink */}
            <Ionicons name="footsteps" size={24} color="white" />
            <Text style={styles.metricLabel}>Steps</Text>
            <Text style={styles.metricValue}>4087</Text>
          </View>

          <View style={styles.metricCard} backgroundColor="#A9A9A9"> {/* Weight - Gray */}
            <Ionicons name="barbell-outline" size={24} color="white" />
            <Text style={styles.metricLabel}>Weight</Text>
            <Text style={styles.metricValue}>68 kg</Text>
          </View>

          <View style={styles.metricCard} backgroundColor="#E26A2C"> {/* Avg Heart - Orange */}
            <Ionicons name="heart" size={24} color="white" />
            <Text style={styles.metricLabel}>Your Avg Heart</Text>
            <Text style={styles.metricValue}>145 bpm</Text>
          </View>

          {/* Row 2 */}
          <View style={styles.metricCard} backgroundColor="#2E7D32"> {/* Sleep - Green */}
            <Ionicons name="moon-outline" size={24} color="white" />
            <Text style={styles.metricLabel}>Sleep</Text>
            <Text style={styles.metricValue}>24 hrs</Text>
          </View>

          <View style={styles.metricCard} backgroundColor="#4169E1"> {/* Check O2 - Blue */}
            <Ionicons name="checkmark-circle-outline" size={24} color="white" />
            <Text style={styles.metricLabel}>Check O2 Level</Text>
            <Text style={styles.metricValue}>98%</Text>
          </View>

          <View style={styles.metricCard} backgroundColor="#DC143C"> {/* Blood Pressure - Red */}
            <Ionicons name="pulse-outline" size={24} color="white" />
            <Text style={styles.metricLabel}>Blood Pressure</Text>
            <Text style={styles.metricValue}>120/80</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/athleteview')}>
          <Ionicons name="home-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/playermetrics')}>
          <Ionicons name="heart-outline" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/dashboard')}>
          <Ionicons name="person-outline" size={28} color="#32CD32" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A394B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A394B',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  menuIcon: {
    padding: 10,
  },
  menuDropdown: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    zIndex: 10,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Increased to account for bottom nav height
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E4E62',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  metricLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  metricValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0a394b',
    paddingVertical: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navButton: {
    padding: 10,
  },
});
