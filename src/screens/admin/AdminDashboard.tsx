import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useAdmin } from '../../contexts/UserProvider';


const AdminDashboard: React.FC = () => {


const { adminDetails , updateAdminDetails } = useAdmin();


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({


});

export default AdminDashboard;
