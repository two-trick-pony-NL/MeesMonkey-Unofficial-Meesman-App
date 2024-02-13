import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const NumberCard = ({ explainerText, bigNumber }) => {
  const [fontSize, setFontSize] = useState(36); // Initial font size

  useEffect(() => {
    // Adjust font size dynamically based on the length of bigNumber
    const calculateFontSize = () => {
      const maxWidth = 100; // Adjust this value based on your layout
      const textWidth = bigNumber.length * (fontSize / 2); // Rough estimation of text width
      if (textWidth > maxWidth) {
        const newFontSize = (maxWidth / bigNumber.length) * 2;
        setFontSize(newFontSize);
      }
    };

    calculateFontSize();
  }, [bigNumber, fontSize]);

  return (
    <View style={styles.card}>
      <Text style={styles.explainerText}>{explainerText}</Text>
      <Text style={[styles.bigNumber, { fontSize: fontSize }]}>{bigNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#384956",
    borderRadius: 10,
    padding: 20,
    alignItems: 'left',
    elevation: 3, // for Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 5,
    height: 120
  },
  explainerText: {
    fontSize: 16,
    color: '#c2c2c2',
    marginBottom: 10,
  },
  bigNumber: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
});

export default NumberCard;
