import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Numbercard from './NumberCard'
import SubheadingWithDescription from './SubheadingWithDescription';

const PendingInvestment = (data) => {
  // Check if there is data
  if (!data.data || !data.data['portefeuille'] || !data.data['portefeuille'][0]) {
    return null; // Render nothing if there's no data
  }

  const toinvest = data.data['portefeuille'][0]['nog_te_beleggen_bedrag'];

  return (
    <View style={styles.container}>
       <SubheadingWithDescription
          subheading={'Nog te beleggen'}
          description={'Meesman belegt geld dat jij overmaakt op vrijdag aan het eind van de dag. Door (internationale) feestdagen kan dit ook later zijn, dan wordt het op het eerstvolgende moment alsnog belegd.'}
        />
      <Numbercard explainerText={'Nog te beleggen'} bigNumber={toinvest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default PendingInvestment;
