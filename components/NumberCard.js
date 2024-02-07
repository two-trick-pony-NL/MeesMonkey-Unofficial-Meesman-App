import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const NumberCard = ({ explainerText, bigNumber }) => {


  return (
    <View style={styles.card}>
      <Text style={styles.explainerText}>{explainerText}</Text>
      <Text style={styles.bigNumber}>{bigNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#384956',
    borderRadius: 10,
    padding: 20,
    alignItems: 'left',
    elevation: 3, // for Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 5,
  },
  explainerText: {
    fontSize: 16,
    color: '#c2c2c2',
    marginBottom: 10,
  },
  bigNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
});

export default NumberCard;
