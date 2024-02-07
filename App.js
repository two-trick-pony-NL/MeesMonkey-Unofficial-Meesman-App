import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import Authed from './screens/Authed';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

Sentry.init({
  dsn: 'https://879cf8019f8f4d40f22f593feff7fa5f@o4506684609789952.ingest.sentry.io/4506684611035136',
});

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    // Handle the login action and store the token in AsyncStorage
    setToken(newToken);
    AsyncStorage.setItem('authtoken', newToken);
  };

  const onLogout = async () => {
    console.log("Logout hit");
    try {
      setToken(null);
      await AsyncStorage.removeItem('authtoken');
      console.log('Token cleared successfully');
      console.log('Logging user out');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };

  useEffect(() => {
    const fetchStoredToken = async () => {
      console.log("Trying to log the user in with token");
      try {
        console.log("Trying to fetch the existing token");
        const storedToken = await AsyncStorage.getItem('authtoken');
        if (storedToken) {
          console.log("Token found. Fetching data");
          setToken(storedToken);
        }
      } catch (error) {
        console.log("No token found. Sending the user to the login screen");
      }
    };

    fetchStoredToken();
  }, []);

  const authenticateWithBiometrics = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your account', // Customize this message
      });

      if (result.success) {
        console.log('Biometric authentication successful');
        // You may want to fetch user data here if needed
      } else {
        console.log('Biometric authentication failed');
      }
    } catch (error) {
      console.error('Error during biometric authentication:', error);
    }
  };

  // Check if a token is present
  if (token) {
    authenticateWithBiometrics();
    return <Authed token={token} onLogout={onLogout} />;
  } else {
    
    return <LoginScreen onLogin={handleLogin} />;
  }
};

export default App;
