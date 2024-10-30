import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert ,Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNewAppointments, useUser } from '../../contexts/UserProvider';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

import axios from 'axios';
import Toast from 'react-native-toast-message';
const BookAppointmentScreen = ({ route, navigation }) => {
    const { updateNewAppointments } = useNewAppointments();
    const { userDetails , updateUserDetails } = useUser();
    

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [problem, setProblem] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] =useState('');
    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState('');
    const [slotTime, setSlotTime] = useState('');
    const [location, setLocation] = useState('');
    const [customerLocation, setCustomerLocation] = useState('')
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startDate = tomorrow;
    const endDate = new Date(tomorrow);
    endDate.setDate(endDate.getDate() + 30);
    const showToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Appointment booked successfully',
        //   text2: 'Appointment Booked Successfully  👋',
        //   style: {
        //     height: 100, // Customize height
        //     width: 400, // Customize width
        //     backgroundColor: '#000', // Customize background color
        // },
        });
      };
      const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    // useEffect(() => {
    //     if (doctorDetails) {
    //         setSelectedLocation([doctorDetails.locationId.cityName]); // Set the selected location
    //         setSelectedDoctor(doctorDetails.fullName); // Set the selected doctor
    //     }
    // }, [doctorDetails]);
    // Get today's date and the date one month from now
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };


    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://192.168.1.14:5000/api/v1/doctors/locations');
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
                Alert.alert('Error', 'Could not load locations.');
            }
        };

        fetchLocations();
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

    useEffect(() => {
        if (selectedDate || selectedDoctor) {
            setTimeSlots([]);
            setSelectedTime([]);
            const fetchTimeSlots = async () => {
                try {
                    const response = await axios.get('http://192.168.1.14:5000/api/v1/appointments/timeslots', {
                        params: {
                            date: selectedDate,
                            doctorId: selectedDoctor,
                        },
                    });
                    console.log(response.data);
                    setTimeSlots(response.data); // Set the time slots from response
                } catch (error) {
                    console.error('Error fetching time slots:', error);
                    Alert.alert('Error', 'Could not load time slots. \nSelect another doctor / date ');
                }
            };
            fetchTimeSlots();
        } else {
            setTimeSlots([]);
        }
    }, [selectedDate , selectedDoctor]);

    const handleSubmit = async () => {
      setLoading(true);

        // Basic validation
        if (!selectedDoctor || !selectedDate || !selectedTime || !problem || !symptoms) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        // Prepare the appointment data
        const appointmentData = {
            doctorId: selectedDoctor,
            date: selectedDate,
            slotTime: slotTime,
            problem: problem,
            symptoms: symptoms,
            userId: userDetails.id,
            locationId : selectedLocation,
        };
        try {
            // Send the appointment data to your backend API
            const response1 = await axios.get('http://192.168.1.14:5000/api/v1/appointments/check', {
                params: {
                    doctorId: selectedDoctor,
                    date: selectedDate,
                    slotId: selectedSlotId,
                },
            });

            if (response1.data.isAvailable === false) {
                Alert.alert('Error', 'The selected time slot is no longer available. Please choose another slot.');
                return;
            }
            const response = await axios.post('http://192.168.1.14:5000/api/v1/appointments/book', appointmentData);
            console.log(response, "re")
            // Check the response from the backend
            if (response.status === 201) {
                updateNewAppointments(response);
                setDoctors([]);
                setSelectedLocation('');
                setSelectedDoctor('');
                setSelectedDate('');
                setSelectedTime([]);
                setTimeSlots([]);
                setLocations([]);
                setProblem('');
                setSymptoms('');
                showToast();
                navigation.navigate('My-Appointments'); // Navigate back after booking
            } else {
                setDoctors([]);
                Alert.alert('Error', 'Failed to book appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            Alert.alert('Error', 'An error occurred while booking the appointment. Please try again.');
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
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
            <View >
            <HorizontalDatepicker
                mode="gregorian"
                startDate={startDate}
                endDate={endDate}
                // initialSelectedDate={startDate}
                onSelectedDateChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
                selectedItemWidth={150}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={20}
                // selectedItemTextStyle={styles.selectedItemTextStyle}
                // unselectedItemTextStyle={styles.selectedItemTextStyle}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            />
            </View>
            <Text style={styles.timing}>Select Time Slot:</Text>
            {timeSlots.length === 0 ? (
            <Text>No time slots available</Text>
        ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
                {timeSlots.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            onPress={() => setSelectedSlotId(item._id),  setSlotTime(item.startTime)} // Update selected time
                            style={{
                                margin: 10,
                                height:50,
                                borderRadius: 7,
                                padding: 15,
                                borderColor: selectedSlotId === item._id ? "red" : "gray",
                                borderWidth: 0.7,
                            }
                            } 
                        >
                            <Text>{item.startTime}</Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
            // <Picker
            //     selectedValue={selectedTimeSlot}
            //     onValueChange={(itemValue) => setSelectedTimeSlot(itemValue)}
            //     style={styles.picker}
            //     enabled={timeSlots.length > 0}
            // >
            //     <Picker.Item label="Select a time slot" value="" />
            //     {timeSlots.map((slot, index) => (
            //         <Picker.Item
            //             key={index}
            //             label={`${slot.startTime} -- ${slot.endTime}`}
            //             value={`${slot.startTime} -- ${slot.endTime}`}
            //         />
            //     ))}
            // </Picker>   
        )}

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
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Book Appointment</Text>
                )}
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
    dateText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
    flatListContainerStyle: {
       borderRadius: 10,
       backgroundColor: '#fff',
    },
    scroll:{
        maxHeight:100,
        backgroundColor: '#fff',
    },
    timing:{
        fontSize: 18,
        fontWeight: '500',
        marginHorizontal: 10,
     },
    title: {
        fontSize: 20,
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
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default BookAppointmentScreen;


