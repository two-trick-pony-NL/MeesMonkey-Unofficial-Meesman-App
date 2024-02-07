import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, Image } from 'react-native';
import getAuthToken from '../api/AuthApi';


const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const lowercasedUsername = username.toLowerCase();
      const token = await getAuthToken(lowercasedUsername, password);
      onLogin(token);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleWebLinkPress = () => {
    // Open the webpage when the subtext is pressed
    // Replace 'https://your-website.com' with your actual webpage URL
    Linking.openURL('https://github.com/two-trick-pony-NL/MeesmanUnofficialApp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/MeesmanIcon.png')} style={styles.logo} />

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Gebruikersnaam"
        placeholderTextColor="white"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Wachtwoord"
        placeholderTextColor="white"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
        <Text style={styles.subtextnormal}>Deze app wordt niet officieel onersteund door Meesman indexbeleggen. Gebruik is voor eigen risico. De die je hier invoert worden versleuteld op jouw telefoon bewaard.</Text>

      <TouchableOpacity onPress={handleWebLinkPress}>
        <Text style={styles.subtext}>Meer weten</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#384956',
  },
  logo: {
    width: 250, // Adjust the width according to your design
    height: 250, // Adjust the height according to your design
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#384956',
    color: 'white',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
  subtext: {
    marginTop: 20,
    fontSize: 10,
    color: 'lightgray',
    textDecorationLine: 'underline',
  },
  subtextnormal: {
    marginTop: 20,
    fontSize: 10,
    color: 'lightgray',
  },
});

export default LoginScreen;
