import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SimpleComponent = ({ onLogout }) => {


  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Waardeontwikkeling:</Text>
      <TouchableOpacity onPress={onLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SimpleComponent;
