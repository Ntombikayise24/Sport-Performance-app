import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
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
  Animated,
} from "react-native";

const themeOptions = [
  { key: "system", label: "System Default" },
  { key: "light", label: "Light Mode" },
  { key: "dark", label: "Dark Mode" },
];

export default function CoachProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const userName = Array.isArray(params.name) ? params.name[0] : params.name || "";
  const userEmail = Array.isArray(params.email) ? params.email[0] : params.email || "";
  const userRole = Array.isArray(params.role) ? params.role[0] : params.role || "";
  const { themePreference, updateThemePreference, colors, effectiveTheme } = useTheme();

  const [coachImage, setCoachImage] = useState<string | null>(null);

  // Editable fields
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [role, setRole] = useState(userRole);

  // Toggles
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationTones, setNotificationTones] = useState(false);
  const [encryptedBackup, setEncryptedBackup] = useState(false);

  // Modals
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Animations
  const successAnim = useRef(new Animated.Value(0)).current;
  const toastAnim = useRef(new Animated.Value(0)).current;
  const [showToast, setShowToast] = useState(false);

  const styles = getStyles(colors, effectiveTheme);

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

    if (!result.canceled && result.assets.length > 0) {
      setCoachImage(result.assets[0].uri);
    }
  };

  const handleDeleteAccount = () => alert("Delete account functionality coming soon.");
  const handleSignOut = () => router.push("/");

  const saveButtonEnabled = newPassword && confirmPassword && newPassword === confirmPassword;

  const animatedCheckStyle = {
    opacity: successAnim,
    transform: [
      {
        scale: successAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1.2],
        }),
      },
    ],
  };

  const animatedToastStyle = {
    opacity: toastAnim,
    transform: [
      {
        translateY: toastAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const handleChangePassword = () => {
    if (!saveButtonEnabled) return;

    // Animate checkmark
    Animated.sequence([
      Animated.timing(successAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(successAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();

    // Show toast
    setShowToast(true);
    Animated.timing(toastAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    setTimeout(() => {
      Animated.timing(toastAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => setShowToast(false));
    }, 2000);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangePasswordVisible(false);
  };

  const renderThemeOption = ({ item }) => (
    <TouchableOpacity
      style={styles.themeOptionItem}
      onPress={() => {
        updateThemePreference(item.key);
        setThemeModalVisible(false);
      }}
    >
      <Text style={styles.themeOptionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={28} color={colors.text} onPress={() => router.back()} />
        <Ionicons name="menu" size={28} color={colors.text} onPress={() => setIsMenuOpen(!isMenuOpen)} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Image */}
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          <Image
            source={coachImage ? { uri: coachImage } : require("../../assets/images/coach.png")}
            style={styles.profileImage}
          />
          <Text style={styles.editText}>Tap to Change</Text>
        </TouchableOpacity>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name & Surname" placeholderTextColor={colors.text + "99"} />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor={colors.text + "99"} />
        <TextInput style={styles.input} value={role} onChangeText={setRole} placeholder="Role" placeholderTextColor={colors.text + "99"} />

        {/* Change Password */}
        <TouchableOpacity style={styles.changePassword} onPress={() => setChangePasswordVisible(true)}>
          <Text style={styles.changePasswordText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>

        {/* Theme */}
        <Text style={styles.sectionTitle}>Theme</Text>
        <TouchableOpacity style={styles.themeSelector} onPress={() => setThemeModalVisible(true)}>
          <Text style={styles.themeText}>
            {themeOptions.find((option) => option.key === themePreference)?.label || "Select Theme"}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.text} />
        </TouchableOpacity>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Show notifications for new messages</Text>
          <Switch
            value={showNotifications}
            onValueChange={setShowNotifications}
            trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
            thumbColor={showNotifications ? colors.switchThumbTrue : colors.switchThumbFalse}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notification tones</Text>
          <Switch
            value={notificationTones}
            onValueChange={setNotificationTones}
            trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
            thumbColor={notificationTones ? colors.switchThumbTrue : colors.switchThumbFalse}
          />
        </View>

        {/* System Backup */}
        <Text style={styles.sectionTitle}>System Backup</Text>
        <TouchableOpacity style={styles.themeOption}>
          <Text style={styles.themeText}>Auto backup</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Encrypted Backup</Text>
          <Switch
            value={encryptedBackup}
            onValueChange={setEncryptedBackup}
            trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
            thumbColor={encryptedBackup ? colors.switchThumbTrue : colors.switchThumbFalse}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Theme Modal */}
      <Modal visible={themeModalVisible} transparent animationType="fade" onRequestClose={() => setThemeModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setThemeModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList data={themeOptions} renderItem={renderThemeOption} keyExtractor={(item) => item.key} />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Change Password Modal */}
      <Modal visible={changePasswordVisible} transparent animationType="fade" onRequestClose={() => setChangePasswordVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.passwordModalContent}>
            <Text style={[styles.sectionTitle, { marginBottom: 15 }]}>Change Password</Text>

            <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current Password" secureTextEntry placeholderTextColor={colors.text + "99"} />

            <View style={{ position: "relative" }}>
              <TextInput
                style={[styles.input, { borderColor: newPassword && confirmPassword ? (newPassword === confirmPassword ? "green" : "red") : colors.surfaceVariant }]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                secureTextEntry={!showNewPassword}
                placeholderTextColor={colors.text + "99"}
              />
              <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color={colors.text} style={{ position: "absolute", right: 10, top: 12 }} onPress={() => setShowNewPassword(!showNewPassword)} />
            </View>

            <View style={{ position: "relative" }}>
              <TextInput
                style={[styles.input, { borderColor: newPassword && confirmPassword ? (newPassword === confirmPassword ? "green" : "red") : colors.surfaceVariant }]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm New Password"
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor={colors.text + "99"}
              />
              <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color={colors.text} style={{ position: "absolute", right: 10, top: 12 }} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
            </View>

            <TouchableOpacity
              style={[styles.signOutButton, { backgroundColor: saveButtonEnabled ? "#4CAF50" : colors.surface, marginTop: 10 }]}
              disabled={!saveButtonEnabled}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <Animated.View style={{ position: "absolute", top: 10, right: 10, ...animatedCheckStyle }}>
              <Ionicons name="checkmark-circle" size={28} color="green" />
            </Animated.View>
          </View>
        </View>
      </Modal>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toast */}
      {showToast && (
        <Animated.View style={[styles.toast, animatedToastStyle]}>
          <Text style={styles.toastText}>Password changed successfully</Text>
        </Animated.View>
      )}
    </View>
  );
}

function getStyles(colors, effectiveTheme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingTop: 40 },
    header: { height: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
    profileImageContainer: { alignItems: "center", marginBottom: 20 },
    profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: colors.primary },
    editText: { color: colors.text, marginTop: 5 },
    sectionTitle: { color: colors.primary, fontWeight: "bold", fontSize: 16, marginTop: 20, marginBottom: 10 },
    input: {
      backgroundColor: effectiveTheme === "dark" ? colors.background : colors.surface,
      color: colors.text,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.surfaceVariant,
    },
    changePassword: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: effectiveTheme === "dark" ? "#1A394B" : colors.surface,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      marginBottom: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.surfaceVariant,
    },
    changePasswordText: { color: colors.text, fontWeight: "600" },
    themeSelector: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: effectiveTheme === "dark" ? "#1A394B" : colors.surface,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      marginBottom: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.surfaceVariant,
    },
    themeText: { color: colors.text, fontWeight: "600" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    modalContent: { backgroundColor: colors.surface, borderRadius: 10, width: 220, paddingVertical: 10 },
    passwordModalContent: {
      backgroundColor: colors.surface,
      borderRadius: 15,
      padding: 20,
      width: "90%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    themeOptionItem: { paddingVertical: 12, paddingHorizontal: 20 },
    themeOptionText: { color: colors.text, fontSize: 16 },
    switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    switchLabel: { color: colors.text, flex: 1 },
    themeOption: { flexDirection: "row", justifyContent: "space-between", backgroundColor: effectiveTheme === "dark" ? "#1A394B" : colors.surface, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 10, alignItems: "center", borderWidth: 1, borderColor: colors.surfaceVariant },
    buttonsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 30 },
    deleteButton: { backgroundColor: effectiveTheme === "dark" ? "#1A394B" : colors.surface, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: colors.surfaceVariant },
    signOutButton: { backgroundColor: effectiveTheme === "dark" ? "#1A394B" : colors.surface, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: colors.surfaceVariant },
    buttonText: { color: colors.text, fontWeight: "600" },
    menuDropdown: { position: "absolute", top: 75, right: 20, backgroundColor: colors.surface, borderRadius: 8, padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
    menuItem: { paddingVertical: 6, paddingHorizontal: 10 },
    menuItemText: { fontSize: 14, color: colors.text },
    toast: { position: "absolute", bottom: 50, alignSelf: "center", backgroundColor: "#4CAF50", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
    toastText: { color: "white", fontWeight: "600" },
  });
}
