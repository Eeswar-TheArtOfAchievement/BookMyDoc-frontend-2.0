import { Alert, Button, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import CustomHeader2 from './CustomHeader2';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import ipAddress from '../../../config/ipConfig';
const AllDoctorsScreen = ({navigation}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);
    const [doctors, setDoctors] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`http://${ipAddress}:5000/api/v1/doctors/locations`);
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
                Alert.alert('Error', 'Could not load locations.');
            }
        };

        fetchLocations();
    }, []);
    useEffect(() => {
        navigation.setOptions({
          header: () => (
            <CustomHeader2
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onBackPress={() => navigation.goBack()} // Handle back press
            />
          ),
        });
      }, [navigation , locations ,selectedLocation]);
      const renderItem = ({ item }) => (
        <View style={styles.appointmentCard}>
            <Image
        source={{uri: 'https://picsum.photos/200/300'}}
        style={styles.image}
        resizeMode="cover"
      />
            <Text style={styles.doctorName}>{item.fullName}</Text>
            <Text style={styles.doctorName}>{item.specializations[0].specializationName}</Text>
            <Text>Location: {item.locationId.hospitalName} , {item.locationId.address} , {item.locationId.cityName}</Text>
            <Text>Experience: {item.experience} Years</Text>
            <Text>rating:⭐ {item.rating}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Book Now" color="blue" onPress={() => navigation.navigate('DoctorDetail', { doctor: item , locationId: item.locationId._id})}/>
            </View>
        </View>
    );
    // useEffect(() => {
    //     if (selectedLocation) {
    //         fetch(`http://${ipAddress}:5000/api/v1/doctors/location/${selectedLocation}`)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setDoctors(data); // Assuming the data is an array of doctor objects
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching doctors:', error);
    //             Alert.alert('Error', 'Could not load doctors.');
    //         setDoctors([]);
    //         });
    //     } else {
    //         setDoctors([]);
    //     }
    // }, [selectedLocation]);
console.log('selectedLocation', selectedLocation);
    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`http://${ipAddress}:5000/api/v1/doctors/location/${selectedLocation}`); // Update to your server URL
            setDoctors(response.data);
            console.log('doctors', doctors);
        } catch (error) {
            console.error(error);
            // Alert.alert('Error', 'Failed to fyletch doctors');
        }
    };
    useEffect(() => {
        fetchDoctors();
    }, [selectedLocation]);
console.log(doctors,'doctors');
    const filteredDoctors = doctors.filter(doctor =>
        (doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.locationId.cityName.toLowerCase().includes(searchTerm.toLowerCase()))
        // &&
        // (selectedValue === 'Confirmed' ? doctor.status === 'Confirmed' :
        //  selectedValue === 'Completed' ? doctor.status === 'Completed' :
        //  selectedValue === 'Cancelled' ? doctor.status === 'Cancelled' : true)

    );
  return (
    <View style={styles.container}>
            <View style={styles.searchCard}>
            <TouchableOpacity onPress={() => inputRef.current.focus()}>
                    <Icon name={'search'} size={30} color="#000" style={styles.icon} />
                </TouchableOpacity>
            <TextInput
                ref={inputRef}
                style={styles.searchInput}
                placeholder="Search by doctor or city"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            </View>


            <FlatList
                data={filteredDoctors}
                renderItem={renderItem}
                keyExtractor={item => item._id} // MongoDB ID is used
                showsVerticalScrollIndicator={false}
            />
    </View>
  );
};

export default AllDoctorsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F9FC',
    },
    searchInput: {
        width: '90%',
        height: 50,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
    searchCard:{
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        height: 50,
        alignItems:'center',
        marginBottom:10,
        backgroundColor: '#fff',
    },
    icon: {
        height: 50,
        padding: 10,
    },
    appointmentCard: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },

});

