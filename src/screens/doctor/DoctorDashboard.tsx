import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const DoctorDashboard = ({ navigation }) => {
    const [doctorData, setDoctorData] = useState(null);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                const response = await fetch('http://192.168.1.14:5000/api/v1/doctors/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Replace with actual token
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch doctor data');
                }
                const data = await response.json();
                setDoctorData(data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
                Alert.alert('Error', 'Could not load doctor data.');
            }
        };

        fetchDoctorData();
    }, []);

    if (!doctorData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doctor Dashboard</Text>
            <Text>Name: {doctorData.fullName}</Text>
            <Text>Email: {doctorData.email}</Text>
            <Text>Experience: {doctorData.experience} years</Text>
            <Text>Rating: {doctorData.rating}</Text>

            <Text style={styles.subtitle}>Availability:</Text>
            {/* {doctorData.availability.map((item, index) => (
                <View key={index}>
                    <Text>Date: {item.date}</Text>
                    {item.slots.map((slot, slotIndex) => (
                        <Text key={slotIndex}>
                            {slot.time} - {slot.available ? 'Available' : 'Booked'}
                        </Text>
                    ))}
                </View>
            ))} */}

            <Button title="Log Out" onPress={() => {/* Handle logout */}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F9FC',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default DoctorDashboard;
