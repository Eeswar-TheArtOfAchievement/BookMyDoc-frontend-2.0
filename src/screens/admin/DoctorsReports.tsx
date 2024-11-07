import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useAdmin } from '../../contexts/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ipAddress from '../../../config/ipConfig';

// Sample data types
interface Doctor {
  _id: string;
  fullName: string;
  specializations: Array<{ specializationName: string }>;
}


const DoctorsReports: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Input states
  const [newDoctor, setNewDoctor] = useState({
    email: '',
    fullName: '',
    password: '',
    role: 'doctor',
    isVerified: false,
    gender: '',
    phoneNumber: '',
    experience: 0,
    rating: 3,
    locationId: '',
    specializations: [],
    certifications: [],
    availabilityId: [],
});
const [newPatient, setNewPatient] = useState(
  {
    fullName: '',
    email: '',
    password: '',
    role: 'user',
    gender: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    medicalHistory: '',
    prescriptions: [],
    insuranceId: '',
  }
);
const { adminDetails , updateAdminDetails } = useAdmin();

const [specializations, setSpecializations] = useState([]);
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [newAppointment, setNewAppointment] = useState<{ patientId: string; doctorId: string; date: string; time: string }>({ patientId: '', doctorId: '', date: '', time: '' });
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState(''); // State to hold formatted date

  useEffect(() => {
    fetchDoctors();
  }, []);


  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`http://${ipAddress}:5000/api/v1/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };


  const handleAddDoctor = async () => {
    try {
        const response = await axios.post(`http://${ipAddress}:5000/api/v1/doctors/doctor`, newDoctor);
        console.log('Doctor added:', response.data);
        // Reset form or update state as needed
        Alert.alert('Doctor added successfully');
    } catch (error) {
        console.error('Error adding doctor:', error);
    }
};

  const handleDeleteDoctor = (id: string) => {
    Alert.alert('Delete Doctor', `Are you sure you want to delete doctor with ID: ${id}?`, [
      { text: 'Cancel' },
      { text: 'OK', onPress: async () => {
          try {
            await axios.delete(`http://${ipAddress}:5000/api/v1/doctors/doctor/${id}`);
            setDoctors(doctors.filter(doctor => doctor._id !== id));
             Alert.alert('Doctor deleted successfully');

          } catch (error) {
            console.error('Error deleting doctor:', error);
          }
        }},
    ]);
  };
const handleEditDoctor = (id: string) => {
  Alert.alert('EditDoctor', 'coming soon');
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Manage Doctors</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={newDoctor.email}
                onChangeText={(text) => setNewDoctor({ ...newDoctor, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={newDoctor.fullName}
                onChangeText={(text) => setNewDoctor({ ...newDoctor, fullName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Gender "
                value={newDoctor.gender}
                onChangeText={(text) => setNewDoctor({ ...newDoctor, gender: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={newDoctor.password}
                onChangeText={(text) => setNewDoctor({ ...newDoctor, password: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={newDoctor.phoneNumber}
                onChangeText={(text) => setNewDoctor({ ...newDoctor, phoneNumber: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Experience (Years)"
                keyboardType="numeric"
                value={newDoctor.experience.toString()}
                onChangeText={(text) => setNewDoctor({ ...newDoctor, experience: parseInt(text) })}
            />
            <TextInput
                style={styles.input}
                placeholder="Rating (1-5)"
                keyboardType="numeric"
                value={newDoctor.rating.toString()}
                onChangeText={(text) => setNewDoctor({ ...newDoctor, rating: parseFloat(text) })}
            />
            {/* Add other fields for gender, locationId, specializations, certifications, availabilityId */}

            <Button title="Add Doctor" onPress={handleAddDoctor} />

            {/* Display the list of doctors and patients as before */}
            <Text style={styles.header}>Doctors List</Text>
        <FlatList
          data={doctors}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.fullName} ({item.specializations[0]?.specializationName || 'No Specialty'})</Text>
              <View style={styles.container1}>

              <Button title="Edit" onPress={() => handleEditDoctor(item._id)} />
              <Button title="Delete" onPress={() => handleDeleteDoctor(item._id)} />
              </View>
            </View>
          )}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  container1: {
    flexDirection:'row',
    gap: 1,

  },
  title: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
},
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DoctorsReports;
