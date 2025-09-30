import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(athlete)/athlete-view')}
        >
          <Ionicons name="chevron-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Player Metrics</Text>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => setMenuVisible(!menuVisible)}
        >
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search metric..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
        />
      </View>

      {/* Metrics Grid */}
      <ScrollView contentContainerStyle={styles.metricsContainer}>
        <View style={styles.metricGrid}>
          {metrics.map((item, index) => (
            <View
              key={index}
              style={[styles.metricCard, { backgroundColor: item.color }]}
            >
              <Ionicons name={item.icon} size={30} color="white" />
              <Text style={styles.metricTitle}>{item.title}</Text>
              <Text style={styles.metricSubtitle}>{item.subtitle}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/(athlete)/athlete-view')}>
          <Ionicons name="home-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/playermetrics')}>
          <MaterialCommunityIcons name="chart-line" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <Ionicons name="person-outline" size={28} color="#32CD32" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

type IoniconsName =
  | 'location-outline'
  | 'walk-outline'
  | 'fitness-outline'
  | 'flash-outline'
  | 'heart-outline'
  | 'moon-outline'
  | 'water-outline'
  | 'pulse-outline';

const metrics: {
  title: string;
  subtitle: string;
  value: string;
  icon: IoniconsName;
  color: string;
}[] = [
  {
    title: 'Distance',
    subtitle: 'You’ve walked',
    value: '4.5 km',
    icon: 'location-outline',
    color: '#FFB300',
  },
  {
    title: 'Steps',
    subtitle: 'You’ve taken',
    value: '4057 steps',
    icon: 'walk-outline',
    color: '#FF69B4',
  },
  {
    title: 'Weight',
    subtitle: 'Stay on top of',
    value: '65 kg',
    icon: 'fitness-outline',
    color: '#A9A9A9',
  },
  {
    title: 'Speed',
    subtitle: 'Sprint speed',
    value: '24.5 km/h',
    icon: 'flash-outline',
    color: '#388E3C',
  },
  {
    title: 'Heart Rate',
    subtitle: 'Avg heart rate',
    value: '124.5 bpm',
    icon: 'heart-outline',
    color: '#FF6347',
  },
  {
    title: 'Sleep',
    subtitle: 'Schedule & improve',
    value: '7.5 hrs',
    icon: 'moon-outline',
    color: '#4682B4',
  },
  {
    title: 'SpO2',
    subtitle: 'Oxygen level',
    value: '98%',
    icon: 'water-outline',
    color: '#C71585',
  },
  {
    title: 'Blood Pressure',
    subtitle: 'Current pressure',
    value: '110/70',
    icon: 'pulse-outline',
    color: '#f8e007ff',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3c4c',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pageTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  menuIcon: {
    padding: 8,
  },
  menuDropdown: {
    position: 'absolute',
    top: 90,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    zIndex: 1000,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginTop: 15,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  metricsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  metricSubtitle: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'white',
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0a394b',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
