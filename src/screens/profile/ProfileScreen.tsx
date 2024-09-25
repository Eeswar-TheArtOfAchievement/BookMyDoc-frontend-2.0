import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';

const ProfileScreen = ({navigation}) => {
    const [userDetails, setUserDetails] = useState({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [tempDetails, setTempDetails] = useState(userDetails);

    const handleUpdateDetails = () => {
        setUserDetails(tempDetails);
        setModalVisible(false);
        Alert.alert('Update Details', 'User details have been updated successfully!');
    };

    // const handleSignOut = () => {
    //     Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
    //         { text: 'Cancel', style: 'cancel' },
    //         { text: 'OK', onPress: () => {
    //             // Logic to handle sign out
    //             Alert.alert('Signed Out', 'You have been signed out successfully.');
    //             navigation.navigate('Login')
    //         }},
    //     ]);
    // };
    const handleSignOut = async () => {
        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK',
                onPress: async () => {
                    try {
                        // Clear AsyncStorage
                        await AsyncStorage.removeItem('userData'); // Adjust key as necessary
                        Alert.alert('Signed Out', 'You have been signed out successfully.');
                        // Reset the navigation stack and navigate to the login screen
                        navigation.navigate('Login');
                        // navigation.reset({
                        //     index: 0,
                        //     routes: [{ name: 'Login' }],
                        // });
                    } catch (error) {
                        console.error('Error clearing AsyncStorage:', error);
                    }
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Full Name:</Text>
                <Text style={styles.value}>{userDetails.fullName}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userDetails.email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{userDetails.phone}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => Alert.alert('View Appointments', 'Navigating to appointment history...')}>
                <Text style={styles.linkText}>View Appointment History</Text>
            </TouchableOpacity>

            {/* Modal for updating user details */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Update Profile</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Full Name"
                            value={tempDetails.fullName}
                            onChangeText={text => setTempDetails({ ...tempDetails, fullName: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Email"
                            value={tempDetails.email}
                            editable={false} // Email is not editable
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Phone"
                            value={tempDetails.phone}
                            onChangeText={text => setTempDetails({ ...tempDetails, phone: text })}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Button title="Save" onPress={handleUpdateDetails} />
                            <Button title="Cancel" color="#F44336" onPress={() => setModalVisible(false)} />
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        alignItems: 'center',
    },
    linkText: {
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ProfileScreen;
