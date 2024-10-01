import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUser } from '../../contexts/UserProvider';
const HomeScreen = ({ navigation }) => {
    const doctors = [
        { name: 'Dr. John Doe', specialty: 'Cardiologist' },
        { name: 'Dr. Jane Smith', specialty: 'Dermatologist' },
        { name: 'Dr. Emily Johnson', specialty: 'Pediatrician' },
        { name: 'Dr. Michael Brown', specialty: 'Orthopedic' },
    ];
    const {userDetails, updateUserDetails } = useUser();
    const [formattedDateOfBirth, setFormattedDateOfBirth] = useState(''); // State to hold formatted date
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve the token from AsyncStorage
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    // Fetch user details using the token
                    const userResponse = await fetch('http://192.168.1.14:5000/api/v1/auth/user', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const userData = await userResponse.json();

                        if (userResponse.ok) {
                        // Decode and format the dateOfBirth
                        const dateOfBirth = new Date(userData.dateOfBirth); // Convert to Date object
                        const formattedDate = dateOfBirth.toLocaleDateString(); // Format the date

                        const tempDetails = {
                            ...userData,
                            dateOfBirth: formattedDate, // Store formatted date as string
                        };

                        // Update the user details in context
                        updateUserDetails(tempDetails);

                        // Set the formatted date for rendering
                        setFormattedDateOfBirth(formattedDate);
                            if (tempDetails && userData.fullName && userData.email) {
                                Alert.alert('Welcome', `Welcome, ${userData.fullName}!`);
                            } else {
                                Alert.alert('Error', 'User data is incomplete or not available.');
                            }
                        } else {
                            Alert.alert('Error', 'Failed to fetch user details.');
                        }
                } else {
                    Alert.alert('Error', 'No token found. Please log in again.');
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                Alert.alert('Error', 'An error occurred while fetching user data.');
            }
        };
        fetchUserData();
    }, []);
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/asset2.png')} // Use a relevant image
                style={styles.banner}
                resizeMode="cover"
            />
            <Text style={styles.title}>Welcome to Your Healthcare App</Text>
            <Text style={styles.subtitle}>Book your appointment with our available doctors</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.doctorList}>
                {doctors.map((doctor, index) => (
                    <View key={index} style={styles.doctorCard}>
                        <Image 
        source={{ uri: 'https://picsum.photos/200/300 ' }} 
        style={styles.image} 
        resizeMode="cover" // or "contain", "stretch", etc.
      />
                        <Text style={styles.doctorName}>{doctor.name}</Text>
                        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('BookAppointment', { doctor: doctor.name })}>
                            <Text style={styles.buttonText}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.appointmentButton} onPress={() => navigation.navigate('MyAppointments')}>
                <Text style={styles.appointmentButtonText}>View My Appointments</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        padding: 20,
    },
    banner: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#2E3A47',
    },
    subtitle: {
        fontSize: 16,
        color: '#7D8CA3',
        marginBottom: 20,
    },
    doctorList: {
        marginBottom: 20,
    },
    doctorCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginRight: 15,
        elevation: 3,
        width: 150,
        alignItems: 'center',
    },
    doctorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E3A47',
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#7D8CA3',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    appointmentButton: {
        backgroundColor: '#28a745',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
    },
    appointmentButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    image :{
        width: 100,
        height: 200,
    },
});

export default HomeScreen;
