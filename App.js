import React, { useState, useEffect } from "react";
import * as Sentry from "@sentry/react-native";
import Authed from "./screens/Authed";
import LoginScreen from "./screens/LoginScreen";
import * as SecureStore from "expo-secure-store";
import { usePushNotifications } from "./api/usePushNotifications";

Sentry.init({
  dsn: "https://879cf8019f8f4d40f22f593feff7fa5f@o4506684609789952.ingest.sentry.io/4506684611035136",
});

export default function App() {
  const { expoPushToken } = usePushNotifications();
  console.log(expoPushToken);
  const [token, setToken] = useState(null);

  const handleLogin = async (newToken) => {
    // Handle the login action and store the token in SecureStore
    setToken(newToken);
    await SecureStore.setItemAsync("authtoken", newToken);
  };

  const onLogout = async () => {
    console.log("Logout hit");
    try {
      setToken(null);
      await SecureStore.deleteItemAsync("authtoken");
      console.log("Token cleared successfully");
      console.log("Logging user out");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  };

  useEffect(() => {
    const fetchStoredToken = async () => {
      console.log("Trying to log the user in with token");
      try {
        console.log("Trying to fetch the existing token");
        const storedToken = await SecureStore.getItemAsync("authtoken", {
          requireAuthentication: true,
        });
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

  // We want both the token that represents the user as verify with biometrics before we let them into the app.
  if (token) {
    return <Authed token={token} onLogout={onLogout} />;
  } else {
    return <LoginScreen onLogin={handleLogin} />;
  }
}
