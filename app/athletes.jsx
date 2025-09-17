import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const initialAthletes = [
  { id: '1', name: 'Sarah van de Merwe', position: 'Team Captain', status: 'Online' },
  { id: '2', name: 'Ayanda Dlamini', position: 'Goalkeeper', status: 'Training' },
  { id: '3', name: 'Siphosethu Khumalo', position: 'Midfielder', status: 'Training' },
  { id: '4', name: 'Michaela Smith', position: 'Midfielder', status: 'Offline' },
  { id: '5', name: 'Chloe Anderson', position: 'Winger', status: 'Offline' },
  { id: '6', name: 'Karabelo Ndlovu', position: 'Winger', status: 'Online' },
];

export default function Athletes() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [athletes, setAthletes] = useState(initialAthletes);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const sortAthletes = () => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newSortOrder);
    const sorted = [...athletes].sort((a, b) =>
      newSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setAthletes(sorted);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Online':
        return { color: 'green' };
      case 'Training':
        return { color: 'orange' };
      case 'Offline':
        return { color: 'gray' };
      default:
        return { color: 'black' };
    }
  };

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAthlete = ({ item }) => (
    <TouchableOpacity style={styles.athleteCard}>
      <View style={styles.iconPlaceholder}>
        <Ionicons name="person-circle-outline" size={40} color="#1A394B" />
      </View>
      <View style={styles.athleteInfo}>
        <Text style={styles.athleteName}>{item.name}</Text>
        <Text style={styles.athletePosition}>{item.position}</Text>
        <Text style={[styles.athleteStatus, getStatusStyle(item.status)]}>{item.status}</Text>
      </View>
      <Text style={styles.arrow}>&rarr;</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Athletes</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
        {isMenuOpen && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                setIsMenuOpen(false);
                router.push('/');
              }}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Search bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search team"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="gray" style={{ marginRight: 5 }} />
          </TouchableOpacity>
        )}
       
      </View>

      {/* Add and Sort buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Add +</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={sortAthletes}>
          <Text style={styles.actionButtonText}>Sort {sortOrder === 'desc' ? '▼' : '▲'}</Text>
        </TouchableOpacity>
      </View>

      {/* Athletes list */}
      <FlatList
        data={filteredAthletes}
        renderItem={renderAthlete}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/coachview')}>
          <Ionicons name="home-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/coachviewmetrics')}>
          <Ionicons name="heart-outline" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/coachProfile')}>
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
    padding: 20,
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 10,
  },
  backArrow: {
    fontSize: 24,
    color: 'black',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  menuButton: {
    width: 30,
    justifyContent: 'space-between',
    height: 20,
  },
  menuLine: {
    height: 3,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  menuDropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#D9D9D9',
    zIndex: 1,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#1A394B',
    borderRadius: 5,
  },
  logoutText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlusButton: {
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 80,
  },
  actionButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 16,
    color: 'black',
  },
  list: {
    flex: 1,
  },
  athleteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  iconPlaceholder: {
    marginRight: 15,
  },
  athleteInfo: {
    flex: 1,
  },
  athleteName: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 2,
    color: 'black',
  },
  athletePosition: {
    fontSize: 14,
    color: 'black',
  },
  athleteStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 24,
    color: 'black',
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
