import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, SafeAreaView, Button, Linking} from 'react-native';
import SectionHeaderText from '../components/SectionHeaderText';
import SubheadingWithDescription from '../components/SubheadingWithDescription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';




const ProfileScreen = () => {

    
      const handleOpenSourceLinkAPI = () => {
        Linking.openURL('https://github.com/two-trick-pony-NL/MeesmanAPI');
      };
      const handleOpenSourceLinkAPP = () => {
        Linking.openURL('https://github.com/two-trick-pony-NL/MeesmanUnofficialApp');
      };


  const onLogout = async () => {
    console.log("Logout hit");
    try {
      //setToken(null);
      await AsyncStorage.removeItem('authtoken');
      console.log('Token cleared successfully');
      console.log('Logging user out');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
    return <LoginScreen />
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <SectionHeaderText text={'Over'} />
        <Button title='Log dit profiel uit' onPress={onLogout} />
        <SubheadingWithDescription
          subheading={'Over deze app'}
          description={'Deze app is een onofficiële wrapper rondom Meesman Indexbeleggen. Dit betekent dat we jouw gegevens ophalen door te doen alsof we inloggen op mijn.meesman.nl en die gegevens hier te tonen. Er is geen enkele affiliatie met Meesman Indexbeleggen zelf. Hoewel we de app graag verder voor hen zouden uitwerken.'}
        />
        <SubheadingWithDescription
          subheading={'Garanties en Disclaimer'}
          description={'Deze app wordt aangeboden voor jouw gemak, maar het gebruik ervan is volledig voor eigen risico. De ontwikkelaar biedt geen garanties met betrekking tot de nauwkeurigheid, betrouwbaarheid of functionaliteit van de app. Het is belangrijk om te begrijpen dat de ontwikkelaar niet aansprakelijk is voor eventuele verliezen, schade of ongemakken die kunnen voortvloeien uit het gebruik van deze app. Door de app te gebruiken, ga je akkoord met het feit dat je dit op eigen verantwoordelijkheid doet. We raden aan om voorzichtig om te gaan met gevoelige informatie en eventuele handelingen zorgvuldig te overwegen.'}
        />
        <SubheadingWithDescription
          subheading={'Beveiliging en Privacy'}
          description={'Jouw privacy is van het grootste belang voor ons. We slaan jouw inloggegevens veilig op als een door Fernet versleutelde token op jouw apparaat. Fernet maakt gebruik van AES voor encryptie, en deze token wordt gedecodeerd op de server tijdens het inlogproces. Al het verkeer tussen de app en de server is versleuteld via HTTPS. Belangrijk om te weten is dat wij geen persoonlijke gegevens van jou als gebruiker loggen. Bovendien wordt alle data lokaal op jouw apparaat opgeslagen, hierdoor houd jij maximale controle over jouw gegevens en privacy. Simpelweg deze app verwijderen is genoeg om al jouw data te vergeten.'}
        />
      </SafeAreaView>
      
      <SubheadingWithDescription
          subheading={'Open Source en Contact'}
          description={'Wij geloven in transparantie en samenwerking. Daarom hebben we besloten om zowel onze app als de bijbehorende API volledig open source te maken. Deze beslissing stelt iedereen in staat om te zien hoe de app functioneert en bij te dragen aan de ontwikkeling en verbeteringen voor te stellen. Om in contact te komen open een issue.'}
        />
      <View style={styles.buttonContainer}>
        <Button title="Source code API" onPress={handleOpenSourceLinkAPI} />
        <Button title="Source code App" onPress={handleOpenSourceLinkAPP} />
      </View>
      <View style={{ height: 200 }} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
  },
});

export default ProfileScreen;
