import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, TouchableOpacity, Modal, Image  } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useUser } from '../../utils/UserProvider';
import { Picker } from '@react-native-picker/picker';

const ProfileScreen = ({navigation}) => {
    const { userDetails , updateUserDetails } = useUser();
    const [modalVisible, setModalVisible] = useState(false);
    const [tempDetails, setTempDetails] = useState(userDetails);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setTempDetails(userDetails);
    }, [userDetails]);

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true, // If you want to upload base64
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = response.assets[0];
        setImage(selectedImage.uri);
        uploadImage(selectedImage);
      }
    });
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      name: image.fileName || 'photo.jpg',
      type: image.type || 'image/jpeg',
    });

    try {
      const response = await axios.post('http://192.168.1.14:5000/api/v1/uploads/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
    const handleUpdateDetails = () => {
        updateUserDetails(tempDetails);
        setModalVisible(false);
        Alert.alert('Update Details', 'User details have been updated successfully!');
    };

    const handleSignOut = async () => {
        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK',
                onPress: async () => {
                    try {
                        // Clear AsyncStorage
                        await AsyncStorage.removeItem('token'); // Adjust key as necessary
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
                <View style={styles.photoContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.label}>Full Name:</Text>
                        <Text style={styles.value}>{userDetails.fullName}</Text>
                    </View>
                    <View style={styles.container1}>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <Button title="upload image" onPress={pickImage} />
                    </View>
                </View>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userDetails.email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{userDetails.phone ? userDetails.phone: "-  -  -  -  -  -"}</Text>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.value}>{userDetails.gender ? userDetails.gender: "-  -  -  -  -  -"}</Text>
                <Text style={styles.label}>DateOfBirth:</Text>
                <Text style={styles.value}>{userDetails.dateOfBirth ? userDetails.dateOfBirth: "-  -  -  -  -  -"}</Text>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>{userDetails.location ? userDetails.location: "-  -  -  -  -  -"}</Text>
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
                            onChangeText={text => {
                            const numericText = text.replace(/[^0-9]/g, '').slice(0, 10); // Remove non-numeric characters
                            setTempDetails({ ...tempDetails, phone: numericText });}}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="DD/MM/YYYY"
                            value={tempDetails.dateOfBirth}
                            onChangeText={text => {
                                const numericText = text.replace(/[^0-9/]/g, '').slice(0, 10); // Remove non-numeric characters
                                setTempDetails({ ...tempDetails, dateOfBirth: numericText }); // Update state with the filtered text
                            }}
                            keyboardType="numeric"
                        />
                        <View style={styles.modalInputContainer}>
                            <Text style={styles.label}>Gender:</Text>
                            <Picker
                                selectedValue={tempDetails.gender}
                                style={styles.picker}
                                onValueChange={(itemValue) => setTempDetails({ ...tempDetails, gender: itemValue })}
                            >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                                <Picker.Item label="LGBT" value="lgbt" />
                                <Picker.Item label="Rather not say" value="not_say" />
                            </Picker>
                        </View>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Location"
                            value={tempDetails.location}
                            onChangeText={text => setTempDetails({ ...tempDetails, location: text })}
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
    modalInputContainer: {
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F9FC',
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 100,
        height: 100,
        marginTop: 20,
        borderRadius:20,
      },
    nameContainer:{
        flex: 1,
    },
    photoContainer:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profileImage: {
        width: 50, // Set the desired width
        height: 50, // Set the desired height
        borderRadius: 25, // To make it circular
        marginLeft: 10, // Add some spacing
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
