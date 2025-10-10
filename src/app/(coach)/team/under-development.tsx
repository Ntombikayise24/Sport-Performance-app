import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function UnderDevelopment() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={40} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/partial-react-logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          OOPS, SORRY!{"\n"}TECH IS STILL{"\n"}UNDER DEVELOPMENT
        </Text>
      </View>
    </SafeAreaView>
  );
}

const COLORS = {
  background: "#12324E",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  image: {
    width: 180,
    height: 140,
    marginBottom: 30,
  },
  message: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 32,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});