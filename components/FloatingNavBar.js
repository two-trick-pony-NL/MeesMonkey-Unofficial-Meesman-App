import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatingNavBar = ({ setActiveScreen }) => {
  const handlePress = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem} onPress={() => handlePress('Portfolio')}>
        <Icon name="home" size={30} color="white" />
        <Text style={styles.navText}>Portfolio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handlePress('Rendementen')}>
        <Icon name="finance" size={30} color="white" />
        <Text style={styles.navText}>Rendement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handlePress('Transacties')}>
        <Icon name="view-list" size={30} color="white" />
        <Text style={styles.navText}>Transacties</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: '5%',
    right: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#384956',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FloatingNavBar;
