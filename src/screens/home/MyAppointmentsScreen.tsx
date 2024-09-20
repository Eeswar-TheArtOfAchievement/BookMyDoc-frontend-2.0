import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput } from 'react-native';

const MyAppointmentsScreen = () => {
    const [appointments, setAppointments] = useState([
        { id: '1', doctor: 'Dr. John Doe', date: '2023-09-20', time: '10:00 AM', location: 'Location 1', contact: '123-456-7890', status: 'upcoming' },
        { id: '2', doctor: 'Dr. Jane Smith', date: '2023-09-18', time: '11:30 AM', location: 'Location 2', contact: '234-567-8901', status: 'completed' },
        { id: '3', doctor: 'Dr. Emily Johnson', date: '2023-09-22', time: '2:00 PM', location: 'Location 1', contact: '345-678-9012', status: 'cancelled' },
        { id: '4', doctor: 'Dr. Emily Johnson', date: '2023-09-22', time: '2:00 PM', location: 'Location 1', contact: '345-678-9012', status: 'cancelled' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredAppointments = appointments.filter(appointment =>
        appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditAppointment = (id) => {
        Alert.alert('Edit Appointment', `Editing appointment with ID: ${id}`);
        // Logic to navigate to the edit screen or open an edit modal
    };

    const handleCancelAppointment = (id) => {
        Alert.alert('Cancel Appointment', `Are you sure you want to cancel appointment ID: ${id}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => {
                setAppointments(prev => prev.filter(appointment => appointment.id !== id));
                Alert.alert('Cancelled', 'Your appointment has been cancelled.');
            }},
        ]);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming':
                return '#4CAF50'; // Green
            case 'completed':
                return '#2196F3'; // Blue
            case 'cancelled':
                return '#F44336'; // Red
            default:
                return '#000';
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.appointmentCard, { borderColor: getStatusColor(item.status) }]}>
            <Text style={styles.doctorName}>{item.doctor}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Contact: {item.contact}</Text>
            <Text>Status: {item.status}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEditAppointment(item.id)} />
                <Button title="Cancel" color="#F44336" onPress={() => handleCancelAppointment(item.id)} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by doctor or location"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <FlatList
                data={filteredAppointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F9FC',
    },
    searchInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    appointmentCard: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default MyAppointmentsScreen;

