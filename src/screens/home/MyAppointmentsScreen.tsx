import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNewAppointments, useUser } from '../../contexts/UserProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import ipAddress from '../../../config/ipConfig';

const MyAppointmentsScreen = () => {
    const { newAppointments } = useNewAppointments();
    const [selectedValue, setSelectedValue] = useState('Confirmed');
    const inputRef = useRef(null);
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [updatedDoctor, setUpdatedDoctor] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [updatedTime, setUpdatedTime] = useState('');
    const [updatedLocation, setUpdatedLocation] = useState('');
    const [updatedContact, setUpdatedContact] = useState('');
    const { userDetails , updateUserDetails } = useUser();
    const [patientId, setpatientId] = useState(userDetails.id);
    // Fetch appointments on mount
    console.log(patientId , 'h');
    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`http://${ipAddress}:5000/api/v1/appointments/patient/${patientId}`); // Update to your server URL
            setAppointments(response.data);

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch appointments');
        }
    };
    useEffect(() => {
        fetchAppointments();
    }, [newAppointments]);
    console.log(appointments);

    const filteredAppointments = appointments.filter(appointment =>
        (appointment.doctorId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         appointment.locationId.cityName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedValue === 'Confirmed' ? appointment.status === 'Confirmed' :
         selectedValue === 'Completed' ? appointment.status === 'Completed' :
         selectedValue === 'Cancelled' ? appointment.status === 'Cancelled' : true)

    );

    const handleEditAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setUpdatedDoctor(appointment.doctor);
        setUpdatedDate(appointment.date);
        setUpdatedTime(appointment.time);
        setUpdatedLocation(appointment.location);
        setUpdatedContact(appointment.contact);
        setModalVisible(true);
    };

    const handleUpdateAppointment = async () => {
        try {
            const updatedAppointment = {
                doctor: updatedDoctor,
                date: updatedDate,
                time: updatedTime,
                location: updatedLocation,
                contact: updatedContact,
                status: selectedAppointment.status, // Keep the same status
            };

            await axios.put(`http://${ipAddress}:5000/appointments/${selectedAppointment._id}`, updatedAppointment);
            setAppointments(prev => prev.map(appointment =>
                appointment._id === selectedAppointment._id ? { ...appointment, ...updatedAppointment } : appointment
            ));
            setModalVisible(false);
            Alert.alert('Success', 'Appointment updated successfully!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update appointment');
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        Alert.alert('Cancel Appointment', `Are you sure you want to cancel appointment ID: ${appointmentId}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: async () => {
                try {
                    await axios.patch(`http://${ipAddress}:5000/api/v1/appointments/${appointmentId}`);
                    setAppointments(prev => prev.filter(appointment => appointment._id !== appointmentId));
                    fetchAppointments();
                    Alert.alert('Cancelled', 'Your appointment has been cancelled.');
                    console.log('deleted');
                } catch (error) {
                    console.error(error);
                    Alert.alert('Error', 'Failed to cancel appointment');
                }
            }},
        ]);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return '#4CAF50'; // Green
            case 'Completed':
                return '#2196F3'; // Blue
            case 'Cancelled':
                return '#F44336'; // Red
            default:
                return '#000';
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.appointmentCard, { borderColor: getStatusColor(item.status) }]}>
            <Text style={styles.doctorName}>{item.doctorId.fullName}</Text>
            <Text>Date: {new Date(item.appointmentDate).toLocaleDateString()}</Text>
            <Text>Time: {item.startTime}</Text>
            <Text>Location: {item.locationId.hospitalName} , {item.locationId.address} , {item.locationId.cityName}</Text>
            <Text>Contact: {item.contact}</Text>
            <Text>Status: {item.status}</Text>
            <View style={styles.buttonContainer}>
            {item.status === 'Confirmed' && (
                <Button title="Cancel" color="#F44336" onPress={() => handleCancelAppointment(item._id)} />
            )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchCard}>
            <TouchableOpacity onPress={() => inputRef.current.focus()}>
                    <Icon name={'search'} size={30} color="#000" style={styles.icon} />
                </TouchableOpacity>
            <TextInput
                ref={inputRef}
                style={styles.searchInput}
                placeholder="Search by doctor or city"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            </View>
            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Total Count: {filteredAppointments.length}</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.dropdown}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Confirmed" value="Confirmed" />
                    <Picker.Item label="Completed" value="Completed" />
                    <Picker.Item label="Cancelled" value="Cancelled" />
                </Picker>
            </View>
            <FlatList
                data={filteredAppointments}
                renderItem={renderItem}
                keyExtractor={item => item._id} // MongoDB ID is used
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
        width: '90%',
        height: 50,
        padding: 10,
    },
    searchCard:{
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        height: 50,
        alignItems:'center',
        marginBottom:10,
        backgroundColor: '#fff',
    },
    icon: {
        height: 50,
        padding: 10,
    },

    dropdownContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    label: {
        fontSize: 18,
    },
    dropdown: {
        height: 50,
        width: '35%',
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
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    modalInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        width: '100%',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default MyAppointmentsScreen;
