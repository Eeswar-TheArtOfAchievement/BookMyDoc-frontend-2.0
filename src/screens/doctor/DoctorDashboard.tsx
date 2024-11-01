import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {  View,  Text,  StyleSheet,  Button,  Alert,  FlatList,  TouchableOpacity,  ActivityIndicator,  Image } from 'react-native';
import { useDoctor } from '../../contexts/UserProvider';

const DoctorDashboard = ({navigation}) => {
    const {doctorDetails , updateDoctorDetails} = useDoctor();
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [showingTelehealth, setShowingTelehealth] = useState(false);

  // fetch doctor data
  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Session Expired', 'Please log in again.');
        navigation.navigate('Login');
        return;
      }
      const response = await fetch(
        'http://192.168.1.14:5000/api/v1/doctors/dashboard',
        {
          method: 'GET',
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const data = await response.json();
      updateDoctorDetails(data);
      setDoctorData(data.doctor);
      setAppointments(data.appointments);
      setLoading(false);
    };
    fetchData();
  }, []);
   // loader indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const data = [
    { id: '1', icon: require('../../assets/logo.png'), heading: 'Coming appointments', number: '123', date: '2023-11-01' },
    { id: '2', icon:require('../../assets/logo.png'), heading: 'Total Appointments', number: '456', date: '2023-11-02' },
    { id: '3', icon: require('../../assets/logo.png'), heading: 'Update schedule', number: '789', date: '2023-11-03' },
    { id: '4', icon: require('../../assets/logo.png'), heading: 'Rating', number: '4.5', date: '2023-11-04' },

  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
            <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Image source={item.icon} style={styles.icon} />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.heading}>{item.heading}</Text>
              <Text style={styles.number}>{item.number}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F9FC',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginBottom: 16,
        width: '50%',
        padding: 10,
    },
    
    iconContainer: {
      width: '30%', // 230% of the card size here means you can adjust this as needed
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 50, // Adjust icon size as necessary
      height: 50,
    },
    detailsContainer: {
      width: '70%', // Remaining space for details
      justifyContent: 'center',
      paddingLeft: 10,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    number: {
      fontSize: 16,
      color: 'gray',
    },
    date: {
      fontSize: 14,
      color: 'lightgray',
    },
    row: {
    justifyContent: 'space-between', // Distribute space evenly
  },

});

export default DoctorDashboard;
