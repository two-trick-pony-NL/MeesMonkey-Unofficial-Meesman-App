import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Rect } from 'react-native-svg';



const HistoricDataChart = ({graphdata}) => {
  const [selectedLabel, setSelectedLabel] = useState(null);


  function getTime(unixTimeStamp) {
    const date = new Date(unixTimeStamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Ensure two-digit formatting for day and month
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

// Transform data into a simpler structure with individual colors
  const transformedData = graphdata.map((data, index) => ({
      timestamps: data.map(([timestamp]) => timestamp),
      amounts: data.map(([, amount]) => amount),
      color: index === 0 ? 'rgba(164,255,92,1)' : 'rgba(87,184,187,1)', // Black and light grey colors
    }));

  // Determine the time interval
  const interval = 'weekly'; // Change to 'minutes' or 'seconds' for different intervals

  const labels = transformedData[0].timestamps.reduce((result, timestamp, index, array) => {
    // Display only the first and last labels
    if (index === 0 || index === array.length - 1) {
      result.push(getTime(timestamp, interval));
    }
    return result;
  }, []);

  return (
    <View>
      <View style={{borderBlockColor:'#384956', borderWidth:4}}>
        <LineChart
          data={{
            legend: ["Aankoopprijs", "Huidige waarde"],
            datasets: transformedData.map(({ amounts, color }) => ({
              data: amounts,
              color: (opacity = 1) => color,
              propsForDots: {
                r: '1',
                strokeWidth: '1',
                stroke: '#000',
              },
              withDots: false, // Set this to false to remove points
            })),
          }}
          width={Dimensions.get('window').width - 10}
          height={240}
          yAxisLabel="€ "
          xLabelsOffset={-10}  // Adjust this value as needed
          yAxisSuffix=""
          chartConfig={{
            legend: {
              enabled: true,
              textSize: 12,
              form: 'square',
              formSize: 14,
              xEntrySpace: 10,
              yEntrySpace: 5,
              formToTextSpace: 5,
              wordWrapEnabled: true,
            },
            backgroundGradientFrom: 'rgba(255,255,255,1)',
            backgroundGradientTo: 'rgba(255,255,255,1)',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#000',
            },
            withDots: false, // Set this to false to remove points
            propsForBackgroundLines: {
              strokeDasharray: '4', // Set this to make the line dotted
            },
          }}
          bezier
          style={{
            marginVertical: 5,
            marginHorizontal: 5,
            borderRadius: 16,
            width: Dimensions.get('window').width,
            elevation: 3, // for Android shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
          onDataPointClick={({ value }) => {
            setSelectedLabel(value || ''); // Set the selected label when a data point is clicked
          }}
        />
      </View>
      {selectedLabel && (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            Selected Label: {selectedLabel}
          </Text>
        </View>
      )}
    </View>
  );
};

export default HistoricDataChart;
