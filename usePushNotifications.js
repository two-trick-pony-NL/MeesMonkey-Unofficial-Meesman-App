import { useState, useEffect, useRef } from "react";
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import Constants from 'expo-constants';
import { Platform } from "react-native";

/**
 * @typedef {Object} PushNotificationState
 * @property {Notifications.ExpoPushToken} expoPushToken - The Expo Push Token.
 * @property {Notifications.Notification} notification - The received notification.
 */

/**
 * Custom hook for handling push notifications.
 * @returns {PushNotificationState} - The push notification state.
 */
export const usePushNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState();
  const [notification, setNotification] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert("Failed to get push token for push notifications");
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
      sendExpoPushTokenToBackend(token); // Send token to backend when obtained
    } else {
      alert("Use a physical device for push notifications");
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#fff",
      });
    }

    return token;
  }

  async function sendExpoPushTokenToBackend(token) {
    // Call your backend endpoint to register the expoPushToken
    try {
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
  
      const response = await fetch(
        `https://w1ofof2wuh.execute-api.eu-central-1.amazonaws.com/dev/registerpushtoken?token=${token.data}`,
        requestOptions
      );
  
      if (response.ok) {
        console.log('Expo Push Token registered successfully');
      } else {
        console.error('Failed to register Expo Push Token');
      }
    } catch (error) {
      console.error('Error while registering Expo Push Token:', error);
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
  
    notificationListener.current = Notifications.addNotificationReceivedListener((receivedNotification) => {
      setNotification(receivedNotification);
    });
  
    responseListener.current = Notifications.addNotificationReceivedListener((response) => {
      console.log(response);
    });
  
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
  
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
  

  return {
    expoPushToken,
    notification,
  };
};
