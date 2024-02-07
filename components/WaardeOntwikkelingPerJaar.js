import React from 'react';
import { ScrollView,View, Text, StyleSheet } from 'react-native';
import FlipCard from 'react-native-flip-card'
import NumberCard from './NumberCard';


const CustomCard = ({ title, data }) => (
  <FlipCard style={{width:250}}>
    <NumberCard explainerText={`Rendement: ${data[4][1]}`} bigNumber={title}></NumberCard>
    <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    {data.map((item, index) => (
      <Text key={index} style={styles.item}>
        {item[0]}: {item[1]}
      </Text>
    ))}
  </View>
  </FlipCard>
);

const WaardeOntwikkeling = ({ data }) => {
  return (
    <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
      {data ? (
        data.map((yearData, index) => (
          <CustomCard key={index} title={`${yearData.columns[0]}`} data={yearData.data} />
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  card: {
    backgroundColor: '#CFBAE1',
    borderRadius: 10,
    padding: 10,
    width: 250,
    height: 220,
    marginRight: 10, // Adjust as needed
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  item: {
    marginBottom: 3,
  },
});

export default WaardeOntwikkeling;
