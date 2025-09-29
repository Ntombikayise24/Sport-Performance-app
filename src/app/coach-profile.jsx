import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useRef } from "react";
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
  useColorScheme,
  Animated,
} from "react-native";

const themeOptions = [
  { key: "system", label: "System Default" },
  { key: "light", label: "Light Mode" },
  { key: "dark", label: "Dark Mode" },
];

const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  inputBackground: "#F0F0F0",
  sectionTitle: "#333333",
  switchTrackFalse: "#767577",
  switchTrackTrue: "#81b0ff",
  switchThumbFalse: "#f4f3f4",
  switchThumbTrue: "#f5dd4b",
  borderColor: "#DDD",
};

const darkTheme = {
  background: "#1E3A4D",
  text: "white",
  inputBackground: "#2C4A5A",
  sectionTitle: "white",
  switchTrackFalse: "#767577",
  switchTrackTrue: "#81b0ff",
  switchThumbFalse: "#f4f3f4",
  switchThumbTrue: "#f5dd4b",
  borderColor: "#444",
};

export default function CoachProfile() {
  const router = useRouter();
  const { name: userName, email: userEmail, role: userRole } =
    useLocalSearchParams();

  const systemTheme = useColorScheme();
  const [coachImage, setCoachImage] = useState(null);

  // Editable fields
  const [name, setName] = useState(userName || "");
  const [email, setEmail] = useState(userEmail || "");
  const [role, setRole] = useState(userRole || "");

  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationTones, setNotificationTones] = useState(false);
  const [encryptedBackup, setEncryptedBackup] = useState(false);
  const [theme, setTheme] = useState("system");
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Change Password Modal state
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Animation
  const successAnim = useRef(new Animated.Value(0)).current;
  const [showToast, setShowToast] = useState(false);
  const toastAnim = useRef(new Animated.Value(0)).current;

  const colors =
    theme === "system"
      ? systemTheme === "light"
        ? lightTheme
        : darkTheme
      : theme === "light"
      ? lightTheme
      : darkTheme;

  const styles = getStyles(colors);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setCoachImage(result.assets[0].uri);
    }
  };

  const handleDeleteAccount = () =>
    alert("Delete account functionality to be implemented.");
  const handleSignOut = () => router.push("/");

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

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) return;

    // Play checkmark animation
    Animated.sequence([
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(successAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Show toast
    setShowToast(true);
    Animated.timing(toastAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowToast(false));
    }, 2000);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangePasswordVisible(false);
  };

  const saveButtonEnabled =
    newPassword && confirmPassword && newPassword === confirmPassword;

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color={colors.text}
          onPress={() => router.back()}
        />
        <Ionicons
          name="menu"
          size={28}
          color={colors.text}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Image */}
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={pickImage}
        >
          <Image
            source={
              coachImage
                ? { uri: coachImage }
                : require("../assets/images/coach.png")
            }
            style={styles.profileImage}
          />
          <Text style={styles.editText}>Tap to Change</Text>
        </TouchableOpacity>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name & Surname"
          placeholderTextColor={colors.text + "99"}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          placeholderTextColor={colors.text + "99"}
        />
        <TextInput
          style={styles.input}
          value={role}
          onChangeText={setRole}
          placeholder="Role"
          placeholderTextColor={colors.text + "99"}
        />

        {/* Change Password Button */}
        <TouchableOpacity
          style={styles.changePassword}
          onPress={() => setChangePasswordVisible(true)}
        >
          <Text style={styles.changePasswordText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>

        {/* Theme Section */}
        <Text style={styles.sectionTitle}>Theme</Text>
        <TouchableOpacity
          style={styles.themeSelector}
          onPress={() => setThemeModalVisible(true)}
        >
          <Text style={styles.themeText}>
            {themeOptions.find((option) => option.key === theme)?.label ||
              "Select Theme"}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.text} />
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
            <View style={styles.modalContent}>
              <FlatList
                data={themeOptions}
                renderItem={renderThemeOption}
                keyExtractor={(item) => item.key}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Change Password Modal */}
        <Modal
          visible={changePasswordVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setChangePasswordVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.passwordModalContent}>
              <Text style={[styles.sectionTitle, { marginBottom: 15 }]}>
                Change Password
              </Text>

              <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Current Password"
                secureTextEntry
                placeholderTextColor={colors.text + "99"}
              />

              {/* New Password with Eye */}
              <View style={{ position: "relative" }}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        newPassword && confirmPassword
                          ? newPassword === confirmPassword
                            ? "green"
                            : "red"
                          : colors.borderColor,
                    },
                  ]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="New Password"
                  secureTextEntry={!showNewPassword}
                  placeholderTextColor={colors.text + "99"}
                />
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.text}
                  style={{ position: "absolute", right: 10, top: 12 }}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              </View>

              {/* Confirm Password with Eye */}
              <View style={{ position: "relative" }}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        newPassword && confirmPassword
                          ? newPassword === confirmPassword
                            ? "green"
                            : "red"
                          : colors.borderColor,
                    },
                  ]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm New Password"
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor={colors.text + "99"}
                />
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.text}
                  style={{ position: "absolute", right: 10, top: 12 }}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={[
                  styles.signOutButton,
                  {
                    backgroundColor: saveButtonEnabled
                      ? "#4CAF50"
                      : colors.inputBackground,
                    marginTop: 10,
                  },
                ]}
                disabled={!saveButtonEnabled}
                onPress={handleChangePassword}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              {/* Animated Checkmark */}
              <Animated.View
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  ...animatedCheckStyle,
                }}
              >
                <Ionicons name="checkmark-circle" size={28} color="green" />
              </Animated.View>
            </View>
          </View>
        </Modal>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            Show notifications for new messages
          </Text>
          <Switch
            value={showNotifications}
            onValueChange={setShowNotifications}
            trackColor={{
              false: colors.switchTrackFalse,
              true: colors.switchTrackTrue,
            }}
            thumbColor={
              showNotifications
                ? colors.switchThumbTrue
                : colors.switchThumbFalse
            }
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notification tones</Text>
          <Switch
            value={notificationTones}
            onValueChange={setNotificationTones}
            trackColor={{
              false: colors.switchTrackFalse,
              true: colors.switchTrackTrue,
            }}
            thumbColor={
              notificationTones
                ? colors.switchThumbTrue
                : colors.switchThumbFalse
            }
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
            trackColor={{
              false: colors.switchTrackFalse,
              true: colors.switchTrackTrue,
            }}
            thumbColor={
              encryptedBackup
                ? colors.switchThumbTrue
                : colors.switchThumbFalse
            }
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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

function getStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 40,
    },
    header: {
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    content: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    profileImageContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 140,
      borderRadius: 70,
      borderWidth: 2,
      borderColor: colors.switchTrackTrue,
    },
    editText: {
      color: colors.text,
      marginTop: 5,
    },
    sectionTitle: {
      color: colors.sectionTitle,
      fontWeight: "bold",
      fontSize: 16,
      marginTop: 20,
      marginBottom: 10,
    },
    input: {
      backgroundColor: colors.inputBackground,
      color: colors.text,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    changePassword: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.inputBackground,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 10,
      alignItems: "center",
    },
    changePasswordText: {
      color: colors.text,
      fontWeight: "600",
    },
    themeSelector: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.inputBackground,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 10,
      alignItems: "center",
    },
    themeText: {
      color: colors.text,
      fontWeight: "600",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.inputBackground,
      borderRadius: 5,
      width: 200,
      paddingVertical: 10,
    },
    passwordModalContent: {
      backgroundColor: colors.inputBackground,
      borderRadius: 15,
      padding: 20,
      width: "90%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    themeOptionItem: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    themeOptionText: {
      color: colors.text,
      fontSize: 16,
    },
    switchRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    switchLabel: {
      color: colors.text,
      flex: 1,
    },
    themeOption: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.inputBackground,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 10,
      alignItems: "center",
    },
    buttonsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
    },
    deleteButton: {
      backgroundColor: colors.inputBackground,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    signOutButton: {
      backgroundColor: colors.inputBackground,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    buttonText: {
      color: colors.text,
      fontWeight: "600",
    },
    menuDropdown: {
      position: "absolute",
      top: 75,
      right: 20,
      backgroundColor: colors.background === "#FFFFFF" ? "#D9D9D9" : "#2C4A5A",
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
      color: colors.text === "white" ? "white" : "black",
    },
    toast: {
      position: "absolute",
      bottom: 50,
      alignSelf: "center",
      backgroundColor: "#4CAF50",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    toastText: {
      color: "white",
      fontWeight: "600",
    },
  });
}
