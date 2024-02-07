import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import CustomTabBar from './CustomTabNavigation';


const Authed = ({token, onLogout}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://w1ofof2wuh.execute-api.eu-central-1.amazonaws.com/dev/getmeesmandata?token='+token);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (

      <View style={{ flex: 1 }}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <CustomTabBar data={data} onLogout={onLogout} />
        )}
      </View>

  );
};


const LoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#384956' }}>
    <ActivityIndicator size="large" color="#fff" />
    <Text style={{color:'#fff', fontWeight:'bold', fontSize:24}}>Account ophalen...</Text>
  </View>
);
export default Authed;
