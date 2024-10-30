import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, TouchableOpacity } from 'react-native';

const DoctorDashboard = ({ navigation }) => {
    const [doctorData, setDoctorData] = useState(null);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch('http://192.168.1.14:5000/api/v1/doctors/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
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
        return <Text style={styles.loading}>Loading...</Text>;
    }

    console.log(doctorData);

    const handleUpdateAvailability = () => {
        // Add functionality for updating availability
        Alert.alert('Update Availability', 'Functionality to update availability will be implemented here.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doctor Dashboard</Text>
            <View style={styles.profileContainer}>
                <Text style={styles.profileInfo}>Name: {doctorData.fullName}</Text>
                <Text style={styles.profileInfo}>Email: {doctorData.email}</Text>
                <Text style={styles.profileInfo}>Experience: {doctorData.experience} years</Text>
                <Text style={styles.profileInfo}>Rating: {doctorData.rating}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdateAvailability}>
                <Text style={styles.buttonText}>Update Availability</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Total Appointments: {doctorData.totalAppointments}</Text>

            <View>
                <Text style={styles.subtitle}>Upcoming Appointments:</Text>
                <FlatList 
                    data={doctorData.upcomingAppointments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentCard}>
                            <Text style={styles.appointmentText}>Date: {item.date}</Text>
                            <Text style={styles.appointmentText}>Patient: {item.patientName}</Text>
                            <Text style={styles.appointmentText}>Status: {item.status}</Text>
                        </View>
                    )}
                />
            </View>

            <View>
                <Text style={styles.subtitle}>Completed Appointments:</Text>
                <FlatList 
                    data={doctorData.completedAppointments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentCard}>
                            <Text style={styles.appointmentText}>Date: {item.date}</Text>
                            <Text style={styles.appointmentText}>Patient: {item.patientName}</Text>
                            <Text style={styles.appointmentText}>Feedback: {item.feedback}</Text>
                        </View>
                    )}
                />
            </View>

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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        color: '#666',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    profileContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        marginBottom: 20,
    },
    profileInfo: {
        fontSize: 18,
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    appointmentCard: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        elevation: 1,
    },
    appointmentText: {
        fontSize: 16,
        color: '#333',
    },
});

export default DoctorDashboard;
