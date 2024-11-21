import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useUser} from '../../contexts/UserProvider';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Toast from 'react-native-toast-message';
import ipAddress from '../../config/ipConfig';
const ProfileScreen = ({navigation}) => {
  const {userDetails, updateUserDetails} = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempDetails, setTempDetails] = useState(userDetails);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Profile Image update takes time  👋',
    //   text2: 'Appointment Booked Successfully  👋',
    //   style: {
    //     borderRadius: 15,
    //     height: 100, // Customize height
    //     width: 400, // Customize width
    //     backgroundColor: '#000', // Customize background color
    // },
    });
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTempDetails(userDetails);
  }, [userDetails]);

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = response.assets[0];
        setImage(selectedImage.uri);
        const base64Image = selectedImage.base64;
        uploadImage(base64Image);
      }
    });
  };

  const uploadImage = async base64Image => {
    const userId = userDetails.id;
    try {
      await axios.post(`http://${ipAddress}:5000/api/v1/auth/image`, {
        userId,
        image: base64Image,
      });
      showToast();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleUpdateDetails = async () => {
    setIsLoading(true);
    try {
      const formattedDate = new Date(
        tempDetails.dateOfBirth.split('/').reverse().join('-'),
      );
      const token = await AsyncStorage.getItem('token');

      await axios.patch(
        `http://${ipAddress}:5000/api/v1/auth/update`,
        {
          ...tempDetails,
          dateOfBirth: formattedDate.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      updateUserDetails(tempDetails);
      setModalVisible(false);
      Alert.alert('Successful', 'User details have been updated successfully.');
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert(
        'Update Failed',
        'An error occurred while updating user details.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('token');
            Alert.alert('Signed Out', 'You have been signed out successfully.');
            // Reset navigation to AuthStackNavigator
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}], // Ensure this is correct
            });
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.photoContainer}>
          {userDetails.profileImage ? (
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${userDetails.profileImage}`,
                }}
                style={styles.image}
              />
              <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                <Icon name="camera" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Icon name="user-circle" size={100} color="#ccc" />
              <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                <Icon name="edit" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          {[
            {icon: 'user', label: 'Full Name', value: userDetails.fullName},
            {icon: 'envelope', label: 'Email', value: userDetails.email},
            {
              icon: 'phone',
              label: 'Phone',
              value: userDetails.phone || '- - - - - -',
            },
            {
              icon: 'genderless',
              label: 'Gender',
              value: userDetails.gender || '- - - - - -',
            },
            {
              icon: 'calendar',
              label: 'DOB',
              value: userDetails.dateOfBirth || '- - - - - -',
            },
            {
              icon: 'map-marker',
              label: 'Location',
              value: userDetails.location || '- - - - - -',
            },
          ].map((info, index) => (
            <View style={styles.infoRow} key={index}>
              <View style={styles.info1}>
                <Icon name={info.icon} size={20} color="#007bff" />
              </View>
              <View style={styles.info2}>
                <Text style={styles.label}>{info.label}:</Text>
              </View>
              <View style={styles.info3}>
                <Text style={styles.value}>{info.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="account-edit-outline" size={23} color="#fff" />
          <Text style={styles.buttonText}> Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Icon name="sign-out" size={20} color="#fff" />
          <Text style={styles.buttonText}> Sign Out</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('My-Appointments')}>
        <Text style={styles.linkText}>View Appointment History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.linkText}>About BookMyDoc</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>version 2.0</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Update Profile</Text>
            <TextInput
              style={[styles.modalInput, isFocused && styles.focusedInput]}
              placeholder="Full Name"
              value={tempDetails.fullName}
              onChangeText={text =>
                setTempDetails({...tempDetails, fullName: text})
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={tempDetails.email}
              editable={false}
            />
            <TextInput
              style={[styles.modalInput, isFocused && styles.focusedInput]}
              placeholder="Phone"
              value={tempDetails.phone}
              onChangeText={text => {
                const numericText = text.replace(/[^0-9]/g, '').slice(0, 10);
                setTempDetails({...tempDetails, phone: numericText});
              }}
              keyboardType="numeric"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <TextInput
              style={[styles.modalInput, isFocused && styles.focusedInput]}
              placeholder="MM/DD/YYYY"
              value={tempDetails.dateOfBirth}
              onChangeText={text => {
                const numericText = text.replace(/[^0-9/]/g, '').slice(0, 10);
                setTempDetails({...tempDetails, dateOfBirth: numericText});
              }}
              keyboardType="numeric"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Gender:</Text>
              <Picker
                selectedValue={tempDetails.gender}
                style={styles.picker}
                onValueChange={itemValue =>
                  setTempDetails({...tempDetails, gender: itemValue})
                }>
                <Picker.Item label="select" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="LGBT" value="lgbt" />
                <Picker.Item label="Rather not say" value="not_say" />
              </Picker>
            </View>
            <TextInput
              style={[styles.modalInput, isFocused && styles.focusedInput]}
              placeholder="Location"
              value={tempDetails.location}
              onChangeText={text =>
                setTempDetails({...tempDetails, location: text})
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Save" onPress={handleUpdateDetails} />
              <Button
                title="Cancel"
                color="#F44336"
                onPress={() => setModalVisible(false)}
              />
            </View>
            {isLoading && <ActivityIndicator size="small" color="#007bff" />}
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
    backgroundColor: '#f0f4f8',
  },
  card: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {},
  infoRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  info1: {
    width: 30,
  },
  info2: {
    width: 100,
  },
  label: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  value: {
    flex: 2,
    color: '#555',
  },
  button: {
    width: 150,
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  link: {
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  focusedInput: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
