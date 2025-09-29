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

export default function LoginScreen() {
  const router = useRouter();

  const [userType, setUserType] = useState("Athlete");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Please enter username and password");
      return;
    }

    Alert.alert("Login successful");

    // Navigate based on selected userType
    if (userType === "Athlete") {
      router.push("/athlete-view");
    } else if (userType === "Medical") {
      router.push("/medical-view");
    } else if (userType === "Staff") {
      router.push("/coach-view");
    } else {
      Alert.alert("Unknown user type");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


      {/* Runner logo */}
       <Image
                source={require("../assets/images/logo.jpeg")}
                style={styles.logo}
              />


      {/* Role Selection */}
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

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={{ width: 200, height: 1, backgroundColor: "#08ee70ff" }} />
        <Text style={{ marginHorizontal: 5, color: "#ccc" }}>OR</Text>
        <View style={{ width: 200, height: 1, backgroundColor: "#08ee70ff" }} />
      </View>


      {/* Forgot Password */}
      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/create-account")}>
          <Text style={styles.signupLink}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1A394B", // dark blue background
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
