import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const doctors = [
        { name: 'Dr. John Doe', specialty: 'Cardiologist' },
        { name: 'Dr. Jane Smith', specialty: 'Dermatologist' },
        { name: 'Dr. Emily Johnson', specialty: 'Pediatrician' },
        { name: 'Dr. Michael Brown', specialty: 'Orthopedic' },
    ];

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/asset1.png')} // Use a relevant image
                style={styles.banner}
                resizeMode="cover"
            />
            <Text style={styles.title}>Welcome to Your Healthcare App</Text>
            <Text style={styles.subtitle}>Book your appointment with our available doctors</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.doctorList}>
                {doctors.map((doctor, index) => (
                    <View key={index} style={styles.doctorCard}>
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
});

export default HomeScreen;
