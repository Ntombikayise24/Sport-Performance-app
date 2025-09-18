import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Searchbar, Text } from 'react-native-paper';

const TeamMetricsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const onChangeSearch = query => setSearchQuery(query);

  const logout = () => {
    router.push('/');
    setIsMenuOpen(false);
  };

  const cards = [
    {
      name: 'TRAINING PERFORMANCE',
      text: 'TRAINING\nPERFORMANCE',
      icon: <MaterialCommunityIcons name="run-fast" size={40} color="white" />,
      color: '#D81B60',
    },
    {
      name: 'INJURY & RECOVERY',
      text: 'INJURY\n& RECOVERY',
      icon: <MaterialCommunityIcons name="crutch" size={40} color="white" />,
      color: '#FBC02D',
    },
    {
      name: 'BIO-METRIC DATA',
      text: 'BIO-METRIC\nDATA',
      icon: <MaterialCommunityIcons name="face-recognition" size={40} color="white" />,
      color: '#616161',
    },
    {
      name: 'PHYSICAL',
      text: 'PHYSICAL',
      icon: <FontAwesome5 name="male" size={40} color="white" />,
      color: '#388E3C',
    },
    {
      name: 'HEALTH & WELLNESS',
      text: 'HEALTH\n& WELLNESS',
      icon: <FontAwesome name="heart" size={40} color="white" />,
      color: '#F57C00',
    },
  ];

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          color="white"
          onPress={() => router.push('/coachview')}
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
        inputStyle={{ color: 'white' }}
        iconColor="white"
        placeholderTextColor="white"
      />

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredCards.map(card => (
          <TouchableOpacity
            key={card.name}
            style={[styles.card, { backgroundColor: card.color }]}
          >
            <Text style={styles.cardText}>{card.text}</Text>
            <View style={styles.iconContainer}>{card.icon}</View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A4D',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchbar: {
    marginBottom: 20,
    backgroundColor: '#2C4A5A',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%',
    height: 120,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  iconContainer: {
    marginTop: 10,
  },
  menuDropdown: {
    position: 'absolute',
    top: 75,
    right: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
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
    color: 'black',
  },
});

export default TeamMetricsScreen;
