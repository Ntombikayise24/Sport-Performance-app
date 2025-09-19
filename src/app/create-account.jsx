import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createAccount } from "../api/authService";

function CreateAccount() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [selectedRace, setSelectedRace] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [sportType, setSportType] = useState("");

  const races = ["African", "Coloured", "Indian", "Asian", "White"];
  const roles = ["Athlete", "Staff"];

  const handleCreateAccount = async () => {
    if (
      !name ||
      !surname ||
      !id ||
      !selectedRace ||
      !selectedRole ||
      !password ||
      !email ||
      !passwordVerify
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== passwordVerify) {
      Alert.alert("Error", "Passwords must match");
      return;
    }

    if (!(email.endsWith("@gmail.com") || email.endsWith(".co.za"))) {
      Alert.alert("Error", "Email must end with @gmail.com or .co.za");
      return;
    }

    if (id.length !== 13 || isNaN(id)) {
      Alert.alert("Error", "ID number must be exactly 13 digits.");
      return;
    }

    const res = await createAccount(
      surname,
      name,
      password,
      email,
      id,
      selectedRace,
      selectedRole,
      sportType
    );

    if (res?.status) {
      Alert.alert("Success", res?.message || "Account created successfully");
    } else {
      Alert.alert("Error", res?.message || "Signup failed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#1A394B" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../assets/images/logo.jpeg")}
          style={styles.logo}
        />

        <View style={styles.inputBox}>
          <Text style={styles.signUp}>Sign up</Text>

          {/* Name */}
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={setName}
          />

          {/* Surname */}
          <TextInput
            style={styles.inputs}
            placeholder="Surname"
            placeholderTextColor="gray"
            value={surname}
            onChangeText={setSurname}
          />

          {/* ID */}
          <TextInput
            style={styles.inputs}
            placeholder="ID No."
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={id}
            onChangeText={setId}
          />

          {/* Race Picker */}
          <Picker
            selectedValue={selectedRace}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedRace(itemValue)}
          >
            <Picker.Item label="Select Race" value="" />
            {races.map((race, index) => (
              <Picker.Item key={index} label={race} value={race} />
            ))}
          </Picker>

          {/* Role Picker */}
          <Picker
            selectedValue={selectedRole}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
          >
            <Picker.Item label="Select Role" value="" />
            {roles.map((role, index) => (
              <Picker.Item key={index} label={role} value={role} />
            ))}
          </Picker>

          {/* Extra Input for Role */}
          {selectedRole === "Athlete" && (
            <TextInput
              style={styles.inputs}
              placeholder="Type of sport"
              value={sportType}
              onChangeText={setSportType}
              placeholderTextColor="gray"
            />
          )}
          {selectedRole === "Staff" && (
            <TextInput
              style={styles.inputs}
              placeholder="Type of staff"
              value={sportType}
              onChangeText={setSportType}
              placeholderTextColor="gray"
            />
          )}

          {/* Email */}
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eye}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Verify Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Verify password"
              placeholderTextColor="gray"
              value={passwordVerify}
              onChangeText={setPasswordVerify}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eye}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.paragraph}>
            By signing up, you agree to our Terms,
          </Text>
          <Text style={styles.paragraph}>
            Privacy Policy and Cookies Policy
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Login link */}
        <Text style={styles.text1}>Have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.text2}>Log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CreateAccount;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    alignSelf: "center",
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  inputBox: {
    backgroundColor: "#D5D5D5",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  signUp: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    fontSize: 16,
    width: "100%",
    backgroundColor: "white",
  },
  picker: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "gray",
    marginVertical: 8,
    backgroundColor: "white",
    width: "100%",
  },
  paragraph: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#01507E",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  text1: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
  },
  text2: {
    fontWeight: "bold",
    color: "#DF1965",
    alignSelf: "center",
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "black",
  },
  eye: {
    padding: 5,
  },
});
