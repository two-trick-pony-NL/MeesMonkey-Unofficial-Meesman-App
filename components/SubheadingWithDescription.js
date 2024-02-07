import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubheadingWithDescription = ({ subheading, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subheading}>{subheading}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default SubheadingWithDescription;
