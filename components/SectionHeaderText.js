import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SectionHeaderText = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inlineContainer}>
        <Image source={require('../assets/monkey.png')} style={styles.inlineImage} />
        <Text style={styles.text}>
          {text} 
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  inlineImage: {
    width: 50, // adjust the width as needed
    height: 50, // adjust the height as needed
    marginRight: 5, // adjust the margin as needed
  },
});

export default SectionHeaderText;
