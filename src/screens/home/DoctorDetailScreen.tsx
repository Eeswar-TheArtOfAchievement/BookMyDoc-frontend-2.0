// DoctorDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import CustomHeader from './CustomHeader';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const DoctorDetailScreen = ({ route, navigation }) => {
    const { doctor, location } = route.params; // Receive doctor and location from params
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlotId, setSelectedSlotId] = useState('');
    const [slotTime, setSlotTime] = useState('');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startDate = tomorrow;
    const endDate = new Date(tomorrow);
    endDate.setDate(endDate.getDate() + 30);

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Appointment booked successfully',
        });
    };

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <CustomHeader
                    title={doctor.fullName}
                    imageUri={doctor.imageUri || 'https://picsum.photos/200/300'}
                    location={location || 'Location not available'}
                    onBackPress={() => navigation.goBack()} // Handle back press
                />
            ),
        });
    }, [navigation, doctor, location]);

    useEffect(() => {
        if (selectedDate) {
            setLoading(true);
            const fetchTimeSlots = async () => {
                try {
                    const response = await axios.get('http://192.168.1.14:5000/api/v1/appointments/timeslots', {
                        params: {
                            date: selectedDate,
                            doctorId: doctor._id,
                        },
                    });
                    setTimeSlots(response.data);
                } catch (error) {
                    console.error('Error fetching time slots:', error);
                    Alert.alert('Error', 'Could not load time slots. Please select another date.');
                } finally {
                    setLoading(false);
                }
            };
            fetchTimeSlots();
        }
    }, [selectedDate, doctor]);

    const handleSubmit = async () => {
        if (!selectedSlotId || !slotTime) {
            Alert.alert('Error', 'Please select a time slot.');
            return;
        }

        // Prepare the appointment data
        const appointmentData = {
            doctorId: doctor._id,
            date: selectedDate,
            slotTime: slotTime,
            locationId: location,
            // Add other necessary fields here
        };

        try {
            const response = await axios.post('http://192.168.1.14:5000/api/v1/appointments/book', appointmentData);
            if (response.status === 201) {
                showToast();
                navigation.navigate('My-Appointments'); // Navigate back after booking
            } else {
                Alert.alert('Error', 'Failed to book appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            Alert.alert('Error', 'An error occurred while booking the appointment. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clinic Vu46u46isit Slots</Text>

            <HorizontalDatepicker
                mode="gregorian"
                startDate={startDate}
                endDate={endDate}
                onSelectedDateChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
                selectedItemWidth={150}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={20}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            />

            <Text style={styles.timing}>Select Time Slot:</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : timeSlots.length === 0 ? (
                <Text>No time slots available</Text>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
                    {timeSlots.map((item) => (
                        <Pressable
                            key={item._id}
                            onPress={() => {
                                setSelectedSlotId(item._id);
                                setSlotTime(item.startTime);
                            }}
                            style={{
                                margin: 10,
                                height: 50,
                                borderRadius: 7,
                                padding: 15,
                                borderColor: selectedSlotId === item._id ? "red" : "gray",
                                borderWidth: 0.7,
                            }}
                        >
                            <Text>{item.startTime}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2E3A47',
    },
    timing: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 10,
    },
    flatListContainerStyle: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    scroll: {
        maxHeight: 100,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DoctorDetailScreen;
