import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, SafeAreaView, Button} from 'react-native';
import HistoricDataChart from '../components/HistoricDataChart';
import ThreeTileComponent from '../components/ThreeNumberCard';
import NumbercardGradient from '../components/NumberCardGradient';
import NumberCard from '../components/NumberCard';

import SectionHeaderText from '../components/SectionHeaderText';
import SubheadingWithDescription from '../components/SubheadingWithDescription';
import RendementScreen from './RendementScreen';
import SimpleComponent from '../components/simplecomponent';


const HomeScreen = ({ data, graphdata}) => {
  const accountsData = data && data.accounts;
  const portefeuilleData = data && data["portefeuille"]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView>

      <SectionHeaderText text={'Portfolio'}/>
      <HistoricDataChart graphdata={graphdata} />

      <SubheadingWithDescription subheading={'Rekeningen'} description={'Dit is het saldo op jouw beleggingsrekeningen'}/>

        {accountsData && accountsData.map(account => {
          const accountId = Object.keys(account)[0];
          const { euro_value, label } = account[accountId];

          return (
            <NumbercardGradient
              key={accountId}
              explainerText={label}
              bigNumber={`€ ${euro_value}`}
            />
          );
        })}
      <SubheadingWithDescription subheading={'Samenstelling'} description={'Dit zijn de fondsen waarin je belegd'}/>
        {portefeuilleData.map((portefeuille, index) => {
          const {
            fund,
            aantal,
            koers,
            datum,
            waarde,
            actuele_weging,
          } = portefeuille;

          return (
            <ThreeTileComponent 
            key={index}
            bigNumberleft={fund} 
            explainerTextleft={"Fonds"} 
            bigNumbertop={waarde} 
            explainerTexttop={"Waarde"} 
            bigNumberbottom={actuele_weging} 
            explainerTextbottom={"Deel van portfolio"} 
            backsidetitle={datum}
            backsidefield1title='Aantal: '
            backsidefield1value={aantal}
            backsidefield2title='Koers: '
            backsidefield2value={koers}
            />
          );
        })}
        
      </SafeAreaView>
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
  },
  greetingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  tilesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tile: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue', // Customize tile color
    borderRadius: 10,
  },
  tallTile: {
    width: '50%', // Takes half of the horizontal space
    aspectRatio: 1, // Maintains a square shape
    backgroundColor: 'blue', // Customize the color
  },
  squareTile: {
    width: '50%', // Takes half of the horizontal space
    aspectRatio: 1, // Maintains a square shape
    backgroundColor: 'green', // Customize the color
  },
});

export default HomeScreen;
