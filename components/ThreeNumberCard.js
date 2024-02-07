import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FlipCard from 'react-native-flip-card'




const ThreeTileComponent = (props) => {

  return (
    <View style={styles.container}>
      {/* Taller tile on the left */}
      <FlipCard>
      {/* Face Side */}
      <View style={styles.tallTile}>
        <Card explainerText={props.explainerTextleft} bigNumber={props.bigNumberleft} />
      </View>
      {/* Back Side */}
      <View style={styles.tallTile }>
        <CardBack 
        backsidetitle={props.backsidetitle} 
        backsidefield1title={props.backsidefield1title} 
        backsidefield1value={props.backsidefield1value}
        backsidefield2title={props.backsidefield2title}
        backsidefield2value={props.backsidefield2value}
        
        />
      </View>
      </FlipCard>
      {/* Two square tiles on the right */}
      <View style={styles.squareTilesContainer}>
        <Card explainerText={props.explainerTexttop} bigNumber={props.bigNumbertop} />
        <Card explainerText={props.explainerTextbottom} bigNumber={props.bigNumberbottom} />
      </View>
    </View>
  );
};

const Card = ({ explainerText, bigNumber }) => (
  <View style={styles.card}>
    <Text style={styles.explainerText}>{explainerText}</Text>
    <Text style={styles.bigNumber}>{bigNumber}</Text>
    <Text style={styles.bigNumber}></Text>
  </View>
);

const CardBack = ({ backsidetitle, backsidefield1title, backsidefield1value, backsidefield2title, backsidefield2value, backsidefield3title, backsidefield3value}) => (
  <View style={styles.card}>
    <Text style={styles.bigNumber}>{backsidetitle}</Text>
    <Text style={styles.explainerText}>{backsidefield1title} {backsidefield1value}</Text>
    <Text style={styles.explainerText}>{backsidefield2title} {backsidefield2value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 200, // Adjust the height as needed
  },
  tallTile: {
    flex: 1, // Takes one-third of the horizontal space
    margin: 5,
  },
  squareTilesContainer: {
    flex: 1, // Takes two-thirds of the horizontal space
    flexDirection: 'column',
    margin: 5,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 3, // for Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 5,
    borderColor: '#384956',
    borderWidth: 1,
  },
  explainerText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bigNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#384956',
  },
});

export default ThreeTileComponent;
