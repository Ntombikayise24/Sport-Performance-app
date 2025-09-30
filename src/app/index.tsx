import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function LoginScreen() {
  const router = useRouter();

  const [userType, setUserType] = useState("Athlete");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Please enter username and password");
      return;
    }

    Alert.alert("Login successful");

    if (userType === "Athlete") {
      router.push("/(athlete)/athlete-view");
    } else if (userType === "Medical") {
      router.push("/(athlete)/medical-view");
    } else if (userType === "Staff") {
      router.push("/(coach)/coach-view");
    } else {
      Alert.alert("Unknown user type");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/logo.jpeg")}
        style={styles.logo}
      />

      <View style={styles.roleContainer}>
        {["Athlete", "Medical", "Staff"].map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.roleButton,
              userType === role && styles.roleButtonSelected,
            ]}
            onPress={() => setUserType(role)}
          >
            <Text
              style={[
                styles.roleText,
                userType === role && styles.roleTextSelected,
              ]}
            >
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[
          styles.input,
          usernameFocused && { borderColor: "#0A4A7B" },
        ]}
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          underlineColorAndroid="transparent" // Remove underline in Android
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={{ width: 200, height: 1, backgroundColor: "#08ee70ff" }} />
        <Text style={{ marginHorizontal: 5, color: "#ccc" }}>OR</Text>
        <View style={{ width: 200, height: 1, backgroundColor: "#08ee70ff" }} />
      </View>

      <TouchableOpacity
        style={{ marginBottom: 10 }}
        onPress={() => router.push("/(auth)/forgot-password")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ color: "white" }}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/create-account")}>
          <Text style={{ color: "#DF1965" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1A394B",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  statusBar: {
    width: "100%",
    height: 40,
    resizeMode: "stretch",
    marginBottom: 20,
  },
  logo: {
    alignSelf: "center",
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  roleButton: {
    backgroundColor: "#005A9C",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  roleButtonSelected: {
    backgroundColor: "#DE1966",
  },
  roleText: {
    color: "#fff",
    fontWeight: "500",
  },
  roleTextSelected: {
    color: "#fff",
  },
  input: {
    width: 320,
    borderWidth: 1,
    borderColor: "#0A4A7B",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#0F2C3C",
    color: "#fff",
  },
  inputContainer: {
    width: 320,
    borderWidth: 1,
    borderColor: "#0A4A7B",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#0F2C3C",
    flexDirection: "row",
    alignItems: "center",
  },
  inputPassword: {
    flex: 1,
    color: "#fff",
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  loginButton: {
    backgroundColor: "#0A4A7B",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#0e922fff",
    width: 300,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#000000",
  },
  orText: {
    marginHorizontal: 10,
    color: "#ccc",
  },
  forgotText: {
    color: "#1E90FF",
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  signupText: {
    color: "#fff",
  },
  signupLink: {
    color: "#DF1965",
    fontWeight: "600",
  },
});
