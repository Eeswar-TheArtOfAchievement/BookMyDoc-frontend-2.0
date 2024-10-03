import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import axios from 'axios';

// Sample data types
interface Doctor {
  _id: string;
  fullName: string;
  specializations: Array<{ specializationName: string }>;
}

interface Patient {
  _id: string;
  fullName: string;
  email: string;
}

interface Appointment {
  _id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
}

const AdminDashboard: React.FC = () => {
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

const [specializations, setSpecializations] = useState([]);
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [newAppointment, setNewAppointment] = useState<{ patientId: string; doctorId: string; date: string; time: string }>({ patientId: '', doctorId: '', date: '', time: '' });

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:5000/api/v1/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:5000/api/v1/auth/users');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:5000/api/v1/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAddDoctor = async () => {
    try {
        const response = await axios.post('http://192.168.1.14:5000/api/v1/doctors/doctor', newDoctor);
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
            await axios.delete(`http://192.168.1.14:5000/api/v1/doctors/doctor/${id}`);
            setDoctors(doctors.filter(doctor => doctor._id !== id));
             Alert.alert('Doctor deleted successfully');

          } catch (error) {
            console.error('Error deleting doctor:', error);
          }
        }},
    ]);
  };

  const handleAddPatient = async () => {
    try {
        const response = await axios.post('http://192.168.1.14:5000/api/v1/auth/user', newPatient);
        console.log('patient added:', response.data);
        // Reset form or update state as needed
        Alert.alert('patient added successfully');
    } catch (error) {
        console.error('Error adding doctor:', error);
    }
};

  const handleDeletePatient = (id: string) => {
    Alert.alert('Delete Patient', `Are you sure you want to delete patient with ID: ${id}?`, [
      { text: 'Cancel' },
      { text: 'OK', onPress: async () => {
          try {
            await axios.delete(`http://192.168.1.14:5000/api/v1/patients/${id}`);
            setPatients(patients.filter(patient => patient._id !== id));
          } catch (error) {
            console.error('Error deleting patient:', error);
          }
        }},
    ]);
  };

  const handleAddAppointment = async () => {
    const newAppointmentData = { ...newAppointment };
    try {
      const response = await axios.post('http://192.168.1.14:5000/api/v1/appointments', newAppointmentData);
      setAppointments([...appointments, response.data]);
      setNewAppointment({ patientId: '', doctorId: '', date: '', time: '' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleDeleteAppointment = (id: string) => {
    Alert.alert('Delete Appointment', `Are you sure you want to delete appointment with ID: ${id}?`, [
      { text: 'Cancel' },
      { text: 'OK', onPress: async () => {
          try {
            await axios.delete(`http://192.168.1.14:5000/api/v1/appointments/${id}`);
            setAppointments(appointments.filter(appointment => appointment._id !== id));
          } catch (error) {
            console.error('Error deleting appointment:', error);
          }
        }},
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manage Doctors</Text>
        <Text style={styles.header}>Add Doctor</Text>
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
              <Button title="Delete" onPress={() => handleDeleteDoctor(item._id)} />
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manage Patients</Text>
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
        <FlatList
          data={patients}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.fullName} ({item.email})</Text>
              <Button title="Delete" onPress={() => handleDeletePatient(item._id)} />
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manage Appointments</Text>
        <TextInput
          placeholder="Patient ID"
          value={newAppointment.patientId}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, patientId: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Doctor ID"
          value={newAppointment.doctorId}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, doctorId: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          value={newAppointment.date}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, date: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Time (HH:mm)"
          value={newAppointment.time}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, time: text })}
          style={styles.input}
        />
        <Button title="Add Appointment" onPress={handleAddAppointment} />
        <FlatList
          data={appointments}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Patient ID: {item.patientId}, Doctor ID: {item.doctorId}, Date: {item.date}, Time: {item.time}</Text>
              <Button title="Delete" onPress={() => handleDeleteAppointment(item._id)} />
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  header: {
    fontSize: 24,
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

export default AdminDashboard;
