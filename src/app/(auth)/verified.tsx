import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import tickImage from "../../assets/images/tick.png";

const Verified = () => {
  const handleLoginPress = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image source={tickImage} style={styles.tick} resizeMode="contain" />
      </View>
      <Text style={styles.title}>All done</Text>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verified;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A394B",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "black",
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  tick: {
    width: 60,
    height: 60,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginText: {
    color: "#5A4DB2",
    fontSize: 18,
  },
});
