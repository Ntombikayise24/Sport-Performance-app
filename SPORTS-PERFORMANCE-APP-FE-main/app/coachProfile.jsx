import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from './ThemeContext';

const themeOptions = [
  { key: 'system', label: 'System Default' },
  { key: 'light', label: 'Light Mode' },
  { key: 'dark', label: 'Dark Mode' },
];

export default function CoachProfile() {
  const router = useRouter();
  const { theme, setTheme, effectiveTheme } = useContext(ThemeContext);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationTones, setNotificationTones] = useState(false);
  const [encryptedBackup, setEncryptedBackup] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDeleteAccount = () => alert('Delete account functionality to be implemented.');
  const handleSignOut = () => router.push('/');

  const renderThemeOption = ({ item }) => (
    <TouchableOpacity
      style={styles.themeOptionItem}
      onPress={() => {
        setTheme(item.key);
        setThemeModalVisible(false);
      }}
    >
      <Text style={styles.themeOptionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  // Define styles for light and dark themes
  const themedStyles = effectiveTheme === 'dark' ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themedStyles.container]}>
      {/* Header with Back and Menu icons */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color={effectiveTheme === 'dark' ? 'white' : 'black'}
          onPress={() => router.back()}
        />
        <Ionicons
          name="menu"
          size={28}
          color={effectiveTheme === 'dark' ? 'white' : 'black'}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Image */}
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={() => router.push('/edit-profile-image')}
        >
          <Image
            source={require('../assets/images/coach.png')}
            style={styles.profileImage}
          />
          <Text style={[styles.editText, themedStyles.text]}>Tap to Change</Text>
        </TouchableOpacity>

        {/* Account Section */}
        <Text style={[styles.sectionTitle, themedStyles.text]}>Account</Text>
        <TextInput style={[styles.input, themedStyles.input]} placeholder="Name & Surname" placeholderTextColor="#7a8a99" />
        <TextInput style={[styles.input, themedStyles.input]} placeholder="E-mail" placeholderTextColor="#7a8a99" />
        <TextInput style={[styles.input, themedStyles.input]} placeholder="Role" placeholderTextColor="#7a8a99" />

        <TouchableOpacity style={styles.changePassword}>
          <Text style={[styles.changePasswordText, themedStyles.text]}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color={effectiveTheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>

        {/* Theme Section */}
        <Text style={[styles.sectionTitle, themedStyles.text]}>Theme</Text>
        <TouchableOpacity
          style={[styles.themeSelector, themedStyles.input]}
          onPress={() => setThemeModalVisible(true)}
        >
          <Text style={[styles.themeText, themedStyles.text]}>
            {themeOptions.find(option => option.key === theme)?.label || 'Select Theme'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={effectiveTheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>

        <Modal
          visible={themeModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setThemeModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setThemeModalVisible(false)}
          >
            <View style={[styles.modalContent, themedStyles.input]}>
              <FlatList
                data={themeOptions}
                renderItem={renderThemeOption}
                keyExtractor={item => item.key}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Notifications Section */}
        <Text style={[styles.sectionTitle, themedStyles.text]}>Notifications</Text>
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, themedStyles.text]}>Show notifications for new messages</Text>
          <Switch
            value={showNotifications}
            onValueChange={setShowNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={showNotifications ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, themedStyles.text]}>Notification tones</Text>
          <Switch
            value={notificationTones}
            onValueChange={setNotificationTones}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationTones ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        {/* System Backup Section */}
        <Text style={[styles.sectionTitle, themedStyles.text]}>System Backup</Text>
        <TouchableOpacity style={[styles.themeOption, themedStyles.input]}>
          <Text style={[styles.themeText, themedStyles.text]}>Auto backup</Text>
          <Ionicons name="chevron-forward" size={20} color={effectiveTheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, themedStyles.text]}>Encrypted Backup</Text>
          <Switch
            value={encryptedBackup}
            onValueChange={setEncryptedBackup}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={encryptedBackup ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={[styles.buttonText, themedStyles.text]}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={[styles.buttonText, themedStyles.text]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isMenuOpen && (
        <View style={[styles.menuDropdown, themedStyles.input]}>
          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Text style={[styles.menuItemText, themedStyles.text]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1E3A4D',
  },
  text: {
    color: 'white',
  },
  input: {
    backgroundColor: '#2C4A5A',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: 'black',
  },
  input: {
    backgroundColor: '#E0E0E0',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A4D',
    paddingTop: 40,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#81b0ff',
  },
  editText: {
    color: 'white',
    marginTop: 5,
  },
  sectionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2C4A5A',
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  changePassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C4A5A',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  changePasswordText: {
    color: 'white',
    fontWeight: '600',
  },
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C4A5A',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  themeText: {
    color: 'white',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2C4A5A',
    borderRadius: 5,
    width: 200,
    paddingVertical: 10,
  },
  themeOptionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  themeOptionText: {
    color: 'white',
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    color: 'white',
    flex: 1,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C4A5A',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  deleteButton: {
    backgroundColor: '#2C4A5A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  signOutButton: {
    backgroundColor: '#2C4A5A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A4D',
    paddingTop: 40,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#81b0ff',
  },
  editText: {
    color: 'white',
    marginTop: 5,
  },
  sectionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2C4A5A',
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  changePassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C4A5A',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  changePasswordText: {
    color: 'white',
    fontWeight: '600',
  },
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C4A5A',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  themeText: {
    color: 'white',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2C4A5A',
    borderRadius: 5,
    width: 200,
    paddingVertical: 10,
  },
  themeOptionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  themeOptionText: {
    color: 'white',
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    color: 'white',
    flex: 1,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C4A5A',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  deleteButton: {
    backgroundColor: '#2C4A5A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  signOutButton: {
    backgroundColor: '#2C4A5A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
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
