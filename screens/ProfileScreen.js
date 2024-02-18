import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Linking,
} from "react-native";
import SectionHeaderText from "../components/SectionHeaderText";
import SubheadingWithDescription from "../components/SubheadingWithDescription";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "./LoginScreen";

const ProfileScreen = () => {
  const [storedToken, setStoredToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("authtoken");
        setStoredToken(token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  const handleOpenSourceLinkAPI = () => {
    Linking.openURL("https://github.com/two-trick-pony-NL/MeesmanAPI");
  };

  const handleOpenSourceLinkAPP = () => {
    Linking.openURL(
      "https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App",
    );
  };

  const onLogout = async () => {
    console.log("Logout hit");
    try {
      await SecureStore.deleteItemAsync("authtoken");
      console.log("Token cleared successfully");
      console.log("Logging user out");
      setStoredToken(null);
    } catch (error) {
      console.error("Error clearing token:", error);
    }
    // Consider navigating to the LoginScreen after logout
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <SectionHeaderText text={"MeesMonkey"} />
        <SubheadingWithDescription
          subheading={"Over deze app"}
          description={
            "Deze app is een verlengstuk voor Meesman Indexbeleggen. MeesMonkey haalt jouw gegevens op door in te loggen op mijn.meesman.nl en toont jouw gegevens hier. MeesMonkey heeft geen affiliatie met Meesman Indexbeleggen."
          }
        />
        <SubheadingWithDescription
          subheading={"Jouw Meesman Login Gegevens"}
          description={
            "We slaan jouw inloggegevens niet op - dit is onveilig. In plaats daarvan genereert MeesMonkey een geheime token en bewaart deze op jouw telefoon. Met de Token kan MeesMonkey jouw account ophalen bij Meesman. Meer gegevens hebben we niet nodig, en verzamelen we dus ook niet. \n\nVerwijder je de token, dan moet je bij de volgende keer opnieuw inloggen.\n\n Jouw geheime token is:"
          }
        />
        <Text style={styles.token}>{storedToken}</Text>
        <Button title="Vergeet Token" onPress={onLogout} />

        <SubheadingWithDescription
          subheading={"Garanties en Disclaimer"}
          description={
            "Deze app is handig, maar gebruik op eigen risico. MeesMonkey geeft geen garanties over nauwkeurigheid, betrouwbaarheid, of functionaliteit. \n\nDe ontwikkelaar is niet aansprakelijk voor verliezen of schade door het gebruik. Gebruik op eigen verantwoordelijkheid. \n\nWees voorzichtig met gevoelige info zoals jouw logingegevens of jouw geheime token."
          }
        />
        <SubheadingWithDescription
          subheading={"Beveiliging en Privacy"}
          description={
            "Om jouw veiligheid te waarborgen slaan wij geen gegevens op in een database. Verder gebruikt MeesMonkey AES-encryptie voor de Token, zodat niemand die kan ontsleutelen en is alle communicatie tussen de app en de server versleuteld via HTTPS.\n\nOm jouw privacy te waarborgen logt MeesMonkey geen persoonlijke gegevens of gebruikersdata. Simpelweg de app verwijderen volstaat om al jouw gegevens te wissen."
          }
        />
      </SafeAreaView>

      <SubheadingWithDescription
        subheading={"Voor Software Developers"}
        description={
          "Het MeesMonkey team bestaat uit developers. Daarom was het geen enkele discussie: Zowel deze app als de API zijn volledig open source zo kun jij zien wat er met jouw gegevens gebeurt, hoe we de app gebouwd hebben en zelf een nieuwe feature inbouwen als je iets mist."
        }
      />
      <View style={styles.buttonContainer}>
        <Button
          title="GitHub voor MeesMonkey API"
          onPress={handleOpenSourceLinkAPI}
        />
        <View style={{ height: 10 }} />
        <Button
          title="GitHub voor MeesMonkey App"
          onPress={handleOpenSourceLinkAPP}
        />
      </View>
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  token: {
    alignItems: "center",
    color: "gray",
    fontSize: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

export default ProfileScreen;
