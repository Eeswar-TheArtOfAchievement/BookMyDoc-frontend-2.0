import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BookAppointmentScreen = ({ route, navigation }) => {
    const [locations, setLocations] = useState(['Hyderabad', 'Bangalore', 'Chennai']);
    const [doctors, setDoctors] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const [problem, setProblem] = useState('');
    const [symptoms, setSymptoms] = useState('');

    useEffect(() => {
        if (selectedLocation) {
            // Mocking doctor data based on selected location
            const doctorsByLocation = {
                'Hyderabad': [
                    { name: 'Dr. John Doe', id: 1 },
                    { name: 'Dr. Jane Smith', id: 2 },
                ],
                'Bangalore': [
                    { name: 'Dr. Emily Johnson', id: 3 },
                    { name: 'Dr. Michael Brown', id: 4 },
                ],
                'Chennai': [
                    { name: 'Dr. Sarah Wilson', id: 5 },
                    { name: 'Dr. Robert Davis', id: 6 },
                ],
            };
            setDoctors(doctorsByLocation[selectedLocation] || []);
        } else {
            setDoctors([]);
        }
    }, [selectedLocation]);

    const handleSubmit = () => {
        if (!selectedDoctor || !date || !problem || !symptoms) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        // Here you would typically send the data to your backend
        Alert.alert('Success', 'Appointment booked successfully!');
        navigation.goBack(); // Navigate back after booking
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book Appointment</Text>

            <Text style={styles.label}>Select Location:</Text>
            <Picker
                selectedValue={selectedLocation}
                onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Select a location" value="" />
                {locations.map((location, index) => (
                    <Picker.Item key={index} label={location} value={location} />
                ))}
            </Picker>

            <Text style={styles.label}>Select Doctor:</Text>
            <Picker
                selectedValue={selectedDoctor}
                onValueChange={(itemValue) => setSelectedDoctor(itemValue)}
                style={styles.picker}
                enabled={doctors.length > 0}
            >
                <Picker.Item label="Select a doctor" value="" />
                {doctors.map((doctor) => (
                    <Picker.Item key={doctor.id} label={doctor.name} value={doctor.name} />
                ))}
            </Picker>

            <TextInput
                style={styles.input}
                placeholder="Date (YYYY-MM-DD)"
                value={date}
                onChangeText={setDate}
            />

            <TextInput
                style={styles.input}
                placeholder="Problem"
                value={problem}
                onChangeText={setProblem}
            />

            <TextInput
                style={styles.input}
                placeholder="Symptoms Identified"
                value={symptoms}
                onChangeText={setSymptoms}
            />

            <Button title="Book Appointment" onPress={handleSubmit} />
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
        color: '#2E3A47',
    },
    label: {
        marginTop: 15,
        fontSize: 16,
        color: '#2E3A47',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});

export default BookAppointmentScreen;
