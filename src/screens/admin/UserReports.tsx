import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useAdmin } from '../../contexts/UserProvider';
import ipAddress from '../../../config/ipConfig';


interface Patient {
  _id: string;
  fullName: string;
  email: string;
}



const UserReports: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

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

  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState(''); // State to hold formatted date

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://${ipAddress}:5000/api/v1/admin/users`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };


  const handleAddPatient = async () => {
    try {
        const response = await axios.post(`http://${ipAddress}:5000/api/v1/auth/user`, newPatient);
        console.log('patient added:', response.data);
        // Reset form or update state as needed
        Alert.alert('patient added successfully');
        fetchPatients();
    } catch (error) {
        console.error('Error adding doctor:', error);
    }
};

  const handleDeletePatient = (id: string) => {
    Alert.alert('Delete Patient', `Are you sure you want to delete patient with ID: ${id}?`, [
      { text: 'Cancel' },
      { text: 'OK', onPress: async () => {
          try {
            await axios.delete(`http://${ipAddress}:5000/api/v1/admin/user/${id}`);
            setPatients(patients.filter(patient => patient._id !== id));
          } catch (error) {
            console.error('Error deleting patient:', error);
          }
        }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Manage Patients</Text>
        <TextInput
                style={styles.input}
                placeholder="Email"
                value={newPatient.email}
                onChangeText={(text) => setNewPatient({ ...newPatient, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={newPatient.fullName}
                onChangeText={(text) => setNewPatient({ ...newPatient, fullName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Gender "
                value={newPatient.gender}
                onChangeText={(text) => setNewPatient({ ...newPatient, gender: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={newPatient.password}
                onChangeText={(text) => setNewPatient({ ...newPatient, password: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={newPatient.phone}
                onChangeText={(text) => setNewPatient({ ...newPatient, phone: text })}
            />
        <Button title="Add Patient" onPress={handleAddPatient} />
        <Text style={styles.header}>Patients List</Text>

        <FlatList
          data={patients}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.fullName} ({item.email})</Text>
              <View style={styles.container1}>
                <Button title="Edit" onPress={() => handleDeletePatient(item._id)} />
                <Button title="Block" onPress={() => handleDeletePatient(item._id)} />
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

export default UserReports;
