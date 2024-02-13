import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity,Button, SafeAreaView } from 'react-native';
import SectionHeaderText from '../components/SectionHeaderText';
import { DataTable } from 'react-native-paper';
import PendingInvestment from '../components/Pending_Investment';
import SubheadingWithDescription from '../components/SubheadingWithDescription';


const TransactionTable = ({ data, to_invest }) => {

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
  };

  const getNextRowValue = (currentIndex, array) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < array.length) {
      const nextValues = array[nextIndex][1];
      return nextValues[0]; // Assuming Value 1 is the first element in the array
    }
    return 0;
  };

  const formatCurrency = (value) => {
    return `€${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const mergeDataArrays = (dataArray1, dataArray2) => {
    const mergedData = {};

    const mergeArray = (arr) => {
      arr.forEach(([timestamp, value]) => {
        const formattedDate = formatDate(timestamp);
        if (!mergedData[formattedDate]) {
          mergedData[formattedDate] = [];
        }
        mergedData[formattedDate].push(value);
      });
    };

    mergeArray(dataArray1);
    mergeArray(dataArray2);

    return mergedData;
  };

  const mergedData = mergeDataArrays(data[0], data[1]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView       showsVerticalScrollIndicator={false}>
        <SectionHeaderText text={"Transacties"}></SectionHeaderText>
        <View style={{padding:5}}>
        <SubheadingWithDescription
          subheading={'Overzicht'}
          description={'Meesman update de transacties op maandagavond. Houdt er rekening mee dat door (internationale) feestdagen het soms langer duurt om een inleg ook daadwerkelijk te beleggen. Raadpleeg mijn.meesman.nl voor actuele informatie.'}
        />
        </View>
        <PendingInvestment data={to_invest}/>

        <View style={{padding:5}}>
        <SubheadingWithDescription
          subheading={'Transacties'}
        />
        </View>

        <View style={styles.yearContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Datum</DataTable.Title>
              <DataTable.Title numeric>Storting</DataTable.Title>
              <DataTable.Title numeric>Totaal</DataTable.Title>
            </DataTable.Header>
            {Object.entries(mergedData).slice().reverse().map(([formattedDate, values], index, array) => {
              const nextValue = getNextRowValue(index, array);

              // Calculate Inleg by subtracting Value 1 from the next row's Value 1
              const inleg = values[0] - nextValue;

              // Determine text color based on the value of 'inleg'
              const saldoColor = inleg < 0 ? 'red' : 'green';

              // Determine text color based on the value of 'Rendement'
              const rendementColor = (values[1] - values[0]) < 0 ? 'red' : 'green';

              return (
                <DataTable.Row key={index} style={styles.itemContainer}>
                  <DataTable.Cell>
                    <Text style={{ fontWeight: 'bold' }}>
                      {formattedDate}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: saldoColor }}>
                      {formatCurrency(inleg)}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Text style={{ justifyContent: 'center' }}>
                      <Text style={{ fontWeight: '300', fontSize: 10 }}>Rendement: </Text>
                      <Text style={{ fontWeight: '300', fontSize: 10, color: rendementColor }}>{formatCurrency(values[1] - values[0])}</Text>{'\n'}
                      <Text style={{ fontWeight: '300', fontSize: 10 }}>Saldo: {formatCurrency(values[1])}</Text>{'\n'}
                      <Text style={{ fontWeight: '300', fontSize: 10 }}>Inleg: {formatCurrency(values[0])}</Text>

                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  yearContainer: {
    marginBottom: 20,
  },
  yearText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  timestampText: {
    fontSize: 14,
  },
  valueText: {
    fontSize: 14,
  },
});

export default TransactionTable;
