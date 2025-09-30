import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

export default function ForgotPassword() {
  const [input, setInput] = useState("");

  const handleSendLink = () => {
    if (input.trim().length === 0) {
      alert("Please enter your email, phone or username.");
      return;
    }
    // Implement sending login link logic here
    alert("If this account exists, a login link has been sent.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.lockIconContainer}>
        <Image
          source={require("../../assets/images/lock.png")}
          style={styles.lockIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Trouble logging in?</Text>
      <Text style={styles.description}>
        Enter your email and we’ll send you a link {"\n"}to get back into your
        account
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
        autoCapitalize="none"
        keyboardType="default"
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendLink}>
        <Text style={styles.sendButtonText}>Send login link</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <View style={{ width: 200, height: 1, backgroundColor: "#09da9bff" }} />
        <Text style={{ marginHorizontal: 10, color: "#ccc" }}>OR</Text>
        <View style={{ width: 200, height: 1, backgroundColor: "#09da9bff" }} />
      </View>
      <Text style={styles.createAccountText}>Have an Account?</Text>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A394B",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  lockIconContainer: {
    borderWidth: 2,
    borderColor: "#E37335",
    borderRadius: 100,
    padding: 20,
    marginBottom: 30,
  },
  lockIcon: {
    width: 80,
    height: 80,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  description: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: 320,
    borderWidth: 1,
    borderColor: "#5f0ce6ff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "white",
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: "#0a4a7b",
    width: 320,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
  },
  orText: {
    marginHorizontal: 10,
    color: "#ccc",
  },
  createAccountText: {
    color: "white",
    marginBottom: 10,
  },
  loginLink: {
    color: "#DF1965",
  },
});
