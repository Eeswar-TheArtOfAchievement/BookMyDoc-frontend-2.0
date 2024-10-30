import React from 'react';
import { Text, StyleSheet, ScrollView, BackHandler, Alert } from 'react-native';
import { useAdmin } from '../../contexts/UserProvider';
import { useFocusEffect } from '@react-navigation/native';


const AdminDashboard: React.FC = () => {

    useFocusEffect(
        React.useCallback(() => {
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
          return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
          };
        }, []),
      );
      const handleBackPress = () => {
        Alert.alert('Exit App', 'Do you want to exit?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
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
