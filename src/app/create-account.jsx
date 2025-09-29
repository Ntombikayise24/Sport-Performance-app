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

  const [errors, setErrors] = useState({});

  const races = ["African", "Coloured", "Indian", "Asian", "White"];
  const roles = ["Athlete", "Staff"];

  // --- Inline Validators ---

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // *** FIXED PASSWORD VALIDATOR ***
  const validatePassword = (password) => {
    // Minimum 8 chars, at least one letter and one number, allow special characters
    const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const passwordsMatch = (pass1, pass2) => pass1 === pass2;

  const validateIdNumber = (id) => {
    return id.length === 13 && /^\d+$/.test(id);
  };

  const handleCreateAccount = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!surname.trim()) newErrors.surname = "Surname is required.";
    if (!id.trim()) newErrors.id = "ID number is required.";
    else if (!validateIdNumber(id)) newErrors.id = "Invalid ID number.";

    if (!selectedRace) newErrors.race = "Please select a race.";
    if (!selectedRole) newErrors.role = "Please select a role.";

    if (!sportType.trim())
      newErrors.sportType =
        selectedRole === "Athlete"
          ? "Please enter the type of sport."
          : "Please enter the type of staff.";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";
    else if (!validatePassword(password))
      newErrors.password =
        "Password must be at least 8 characters and contain letters and numbers.";

    if (!passwordVerify)
      newErrors.passwordVerify = "Please confirm your password.";
    else if (!passwordsMatch(password, passwordVerify))
      newErrors.passwordVerify = "Passwords do not match.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // All validations passed
    router.push("/verify-account");
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

          <TextInput
            style={styles.inputs}
            placeholder="Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <TextInput
            style={styles.inputs}
            placeholder="Surname"
            placeholderTextColor="gray"
            value={surname}
            onChangeText={setSurname}
          />
          {errors.surname && <Text style={styles.error}>{errors.surname}</Text>}

          <TextInput
            style={styles.inputs}
            placeholder="ID No."
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={id}
            onChangeText={setId}
          />
          {errors.id && <Text style={styles.error}>{errors.id}</Text>}

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
          {errors.race && <Text style={styles.error}>{errors.race}</Text>}

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
          {errors.role && <Text style={styles.error}>{errors.role}</Text>}

          {(selectedRole === "Athlete" || selectedRole === "Staff") && (
            <>
              <TextInput
                style={styles.inputs}
                placeholder={
                  selectedRole === "Athlete"
                    ? "Type of sport"
                    : "Type of staff"
                }
                value={sportType}
                onChangeText={setSportType}
                placeholderTextColor="gray"
              />
              {errors.sportType && (
                <Text style={styles.error}>{errors.sportType}</Text>
              )}
            </>
          )}

          <TextInput
            style={styles.inputs}
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

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
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

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
          {errors.passwordVerify && (
            <Text style={styles.error}>{errors.passwordVerify}</Text>
          )}

          <Text style={styles.paragraph}>
            By signing up, you agree to our Terms,
          </Text>
          <Text style={styles.paragraph}>
            Privacy Policy and Cookies Policy
          </Text>
        </View>

        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.text1}>Have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/verify-account")}>
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
    width: 250,
    height: 250,
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
    padding: 8,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: -5,
    marginBottom: 8,
    marginLeft: 4,
  },
});
