import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import RendementScreen from './RendementScreen';
import SimpleComponent from '../components/simplecomponent';
import TransactionTable from './DataTableScreen';
import FloatingNavBar from '../components/FloatingNavBar';
import ProfileScreen from './ProfileScreen';

const CustomTabBar = (data, onLogout) => {
  const [activeScreen, setActiveScreen] = useState('Portfolio'); // Default screen

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Portfolio':
        return <HomeScreen data={data.data} graphdata={data.data['historic_data']} onLogout={onLogout}  />;
      case 'Rendementen':
        return <RendementScreen data={data['data']} graphdata={data.data['historic_data']}  />;
      case 'Transacties':
        return <TransactionTable data={data.data['historic_data']} to_invest={data.data}  />;
        case 'Profile':
          return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Display the active screen */}
      {renderScreen()}
      {activeScreen !== 'LoginScreen' && <FloatingNavBar setActiveScreen={setActiveScreen} />}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    height: 50,
  },
  navBarItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomTabBar;
