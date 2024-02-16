import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import CustomTabBar from "./CustomTabNavigation";
import * as LocalAuthentication from "expo-local-authentication";

const Authed = ({ token, onLogout }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [biometricAuthenticated, setBiometricAuthenticated] = useState(false);

  const authenticateWithBiometrics = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access your account", // Customize this message
      });

      if (result.success) {
        console.log("Biometric authentication successful");
        // Fetch user data or perform additional actions on successful authentication
        // For example: handleLogin(userToken);
        setBiometricAuthenticated(true);
      } else {
        console.log("Biometric authentication failed");
        // Handle authentication failure if needed
        setBiometricAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during biometric authentication:", error);
      setBiometricAuthenticated(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://w1ofof2wuh.execute-api.eu-central-1.amazonaws.com/dev/getmeesmandata",
          {
            method: "GET",
            headers: {
              token: `${token}`,
            },
          },
        );

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        authenticateWithBiometrics(), setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <CustomTabBar data={data} onLogout={onLogout} />
      )}
    </View>
  );
};

const LoadingIndicator = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#384956",
    }}
  >
    <ActivityIndicator size="large" color="#fff" />
    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>
      Account ophalen...
    </Text>
  </View>
);
export default Authed;
