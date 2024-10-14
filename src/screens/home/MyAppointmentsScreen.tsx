import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useUser } from '../../contexts/UserProvider';

const MyAppointmentsScreen = () => {
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
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://192.168.1.14:5000/api/v1/appointments/patient/${patientId}`); // Update to your server URL
                console.log(response.data);
                setAppointments(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch appointments');
            }
        };

        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter(appointment =>
        appointment.doctorId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.locationId.cityName.toLowerCase().includes(searchTerm.toLowerCase())
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

            await axios.put(`http://localhost:5000/appointments/${selectedAppointment._id}`, updatedAppointment);
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

    const handleCancelAppointment = async (id) => {
        Alert.alert('Cancel Appointment', `Are you sure you want to cancel appointment ID: ${id}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: async () => {
                try {
                    await axios.delete(`http://localhost:5000/appointments/${id}`);
                    setAppointments(prev => prev.filter(appointment => appointment._id !== id));
                    Alert.alert('Cancelled', 'Your appointment has been cancelled.');
                } catch (error) {
                    console.error(error);
                    Alert.alert('Error', 'Failed to cancel appointment');
                }
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
            <Text style={styles.doctorName}>{item.doctorId.fullName}</Text>
            <Text>Date: {new Date(item.appointmentDate).toLocaleDateString()}</Text>
            <Text>Time: {new Date(item.appointmentDate).toLocaleTimeString()}</Text>
            <Text>Location: {item.locationId.hospitalName} , {item.locationId.address} , {item.locationId.cityName}</Text>
            <Text>Contact: {item.contact}</Text>
            <Text>Status: {item.status}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEditAppointment(item)} />
                <Button title="Cancel" color="#F44336" onPress={() => handleCancelAppointment(item._id)} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by doctor or city"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <FlatList
                data={filteredAppointments}
                renderItem={renderItem}
                keyExtractor={item => item._id} // MongoDB ID is used
                showsVerticalScrollIndicator={false}
            />

            {/* Modal for editing appointment */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Appointment</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Doctor"
                            value={updatedDoctor}
                            onChangeText={setUpdatedDoctor}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Date"
                            value={updatedDate}
                            onChangeText={setUpdatedDate}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Time"
                            value={updatedTime}
                            onChangeText={setUpdatedTime}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Location"
                            value={updatedLocation}
                            onChangeText={setUpdatedLocation}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Contact"
                            value={updatedContact}
                            onChangeText={setUpdatedContact}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Button title="Save" onPress={handleUpdateAppointment} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#F44336" />
                        </View>
                    </View>
                </View>
            </Modal>
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
