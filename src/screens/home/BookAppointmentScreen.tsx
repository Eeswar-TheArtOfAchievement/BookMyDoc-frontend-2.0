import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BookAppointmentScreen = ({ route, navigation }) => {
    const [locations, setLocations] = useState([    ]);
    const [doctors, setDoctors] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const [problem, setProblem] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

    // Fetch locations when the component mounts
    useEffect(() => {
        fetch('http://192.168.1.14:5000/api/v1/doctors/locations') // Adjust the endpoint as necessary
            .then((response) => response.json())
            .then((data) => {
                setLocations(data); // Assuming data is an array of location objects
            })
            .catch((error) => {
                console.error('Error fetching locations:', error);
                Alert.alert('Error', 'Could not load locations.');
            });
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            fetch(`http://192.168.1.14:5000/api/v1/doctors/location/${selectedLocation}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setDoctors(data); // Assuming the data is an array of doctor objects
            })
            .catch((error) => {
                console.error('Error fetching doctors:', error);
                Alert.alert('Error', 'Could not load doctors.');
            setDoctors([]);
            });
        } else {
            setDoctors([]);
        }
    }, [selectedLocation]);
    const isValidDate = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regex)) {return { valid: false, future: false };}

        const selectedDate = new Date(dateString);
        const today = new Date();

        // Set time to the start of the day for today's date
        today.setHours(0, 0, 0, 0);

        // Check if selected date is in the future
        if (selectedDate >= today) {
            return { valid: true, future: true };
        }

        // If the selected date is today, compare with the current time
        if (selectedDate.getTime() === today.getTime()) {
            return { valid: true, future: false }; // Today is not valid since it should be after the current time
        }

        return { valid: true, future: false }; // Selected date is in the past
    };


    const handleDateChange = (inputDate) => {
        const { valid, future } = isValidDate(inputDate);
        setDate(inputDate);
        if (!valid) {
            Alert.alert('Error', 'Invalid date format. Please use YYYY-MM-DD.');
            return;
        }
        if (!future) {
            Alert.alert('Error', 'Cannot enter past dates or today\'s date unless it is later than the current time.');
            return;
        }
    };
    useEffect(() => {
        if (isValidDate(date) && selectedDoctor) {
            fetch(`http://192.168.1.14:5000/api/v1/timeslots?date=${date}&doctor=${selectedDoctor}`)
                .then((response) => response.json())
                .then((data) => {
                    setTimeSlots(data);
                })
                .catch((error) => {
                    console.error('Error fetching time slots:', error);
                    Alert.alert('Error', 'Could not load time slots.');
                });
        } else {
            setTimeSlots([]);
        }
    }, [date, selectedDoctor]);
    const handleSubmit = () => {
        if (!selectedDoctor || !date  || !selectedTimeSlot || !problem || !symptoms) {
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
                {locations.map((location) => (
                    <Picker.Item key={location._id} label={location.cityName} value={location._id} />
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
                    <Picker.Item key={doctor._id} label={doctor.fullName} value={doctor._id} />
                ))}
            </Picker>

            <TextInput
                style={styles.input}
                placeholder="Date (YYYY-MM-DD)"
                value={date}
                onChangeText={handleDateChange}
            />
            <Text style={styles.label}>Select Time Slot:</Text>
            <Picker
                selectedValue={selectedTimeSlot}
                onValueChange={(itemValue) => setSelectedTimeSlot(itemValue)}
                style={styles.picker}
                enabled={timeSlots.length > 0}
            >
                <Picker.Item label="Select a time slot" value="" />
                {timeSlots.map((slot, index) => (
                    <Picker.Item key={index} label={slot} value={slot} />
                ))}
            </Picker>

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
