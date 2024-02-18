import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const NumbercardGradient = ({ explainerText, bigNumber }) => {
  return (
    <LinearGradient
      style={styles.card}
      colors={["rgba(164,255,92,0.6)", "rgba(87,184,187,0.8)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.explainerText}>{explainerText}</Text>
      <Text style={styles.bigNumber}>{bigNumber}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden", // Ensure the child LinearGradient is clipped to the rounded corners
    elevation: 0, // for Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 5,
    padding: 10,
  },
  explainerText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  bigNumber: {
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#000",
  },
});

export default NumbercardGradient;
