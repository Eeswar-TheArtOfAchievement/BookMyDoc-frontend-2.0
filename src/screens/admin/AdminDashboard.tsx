import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, BackHandler, Alert, View, ActivityIndicator } from 'react-native';
import { useAdmin } from '../../contexts/UserProvider';
import { useFocusEffect } from '@react-navigation/native';


const AdminDashboard: React.FC = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(false); // New loading state
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
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default AdminDashboard;
