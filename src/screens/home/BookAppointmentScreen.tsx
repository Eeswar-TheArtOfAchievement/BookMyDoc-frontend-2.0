import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert ,Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useUser } from '../../contexts/UserProvider';

const BookAppointmentScreen = ({ route, navigation }) => {
    const { doctorDetails } = route.params;
    console.log("1",doctorDetails);
    const [locations, setLocations] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [problem, setProblem] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const { userDetails , updateUserDetails } = useUser();

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (doctorDetails) {
            setSelectedLocation([doctorDetails.locationId.cityName]); // Set the selected location
            setSelectedDoctor(doctorDetails.fullName); // Set the selected doctor
        }
    }, [doctorDetails]);
    // Get today's date and the date one month from now
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

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

    useEffect(() => {
        if (date && selectedDoctor) {
            const fetchTimeSlots = async () => {
                try {
                    const response = await axios.get('http://192.168.1.14:5000/api/v1/appointments/timeslots', {
                        params: {
                            date: date,
                            doctorId: selectedDoctor,
                        },
                    });
                    console.log(response.data , "timeSlots");
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
    }, [date, selectedDoctor]);

    const handleSubmit = async () => {
        // Basic validation
        if (!selectedDoctor || !date || !selectedTimeSlot || !problem || !symptoms) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        // Prepare the appointment data
        const appointmentData = {
            doctorId: selectedDoctor,
            date: date,
            timeSlot: selectedTimeSlot,
            problem: problem,
            symptoms: symptoms,
            userId: userDetails.id,
            locationId : selectedLocation,
        };
        try {
            // Send the appointment data to your backend API
            const response = await axios.post('http://192.168.1.14:5000/api/v1/appointments', appointmentData);

            // Check the response from the backend
            if (response.status === 201) {
                setDoctors([]);
                setTimeSlots([]);
                setLocations([]);
                setProblem('');
                setSymptoms('');
                Alert.alert('Success', 'Appointment booked successfully!');
                navigation.goBack(); // Navigate back after booking
            } else {
                setDoctors([]);
                Alert.alert('Error', 'Failed to book appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            Alert.alert('Error', 'An error occurred while booking the appointment. Please try again.');
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

            <Button title="Select Date" onPress={showDatePicker} />
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    minimumDate={today}
                    maximumDate={maxDate}
                />
            )}
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>

            <Text style={styles.label}>Select Time Slot:</Text>
            {timeSlots.length === 0 ? (
            <Text>No time slots available</Text>
        ) : (
            <Picker
                selectedValue={selectedTimeSlot}
                onValueChange={(itemValue) => setSelectedTimeSlot(itemValue)}
                style={styles.picker}
                enabled={timeSlots.length > 0}
            >
                <Picker.Item label="Select a time slot" value="" />
                {timeSlots.map((slot, index) => (
                    <Picker.Item
                        key={index}
                        label={`${slot.startTime} -- ${slot.endTime}`}
                        value={`${slot.startTime} -- ${slot.endTime}`}
                    />
                ))}
            </Picker>
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
    dateText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
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
