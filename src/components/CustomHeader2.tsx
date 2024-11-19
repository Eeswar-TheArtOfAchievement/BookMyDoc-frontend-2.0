// CustomHeader.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { Picker } from '@react-native-picker/picker';
const CustomHeader2 = ({locations , selectedLocation,setSelectedLocation}) => {
    console.log('first' , locations);
    const navigation = useNavigation(); // Hook to get navigation object
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}><Icon name="arrow-back" size={24} color="#fff" /></Text>
                <Text style={styles.backText}>Find Doctors</Text>
            </TouchableOpacity>
            <Picker
                selectedValue={selectedLocation}
                onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                style={styles.picker}
            >
                <Picker.Item style={{color: '#000'}} label="Select a location" value="" />
                {locations.map((location) => (
                    <Picker.Item key={location._id} label={location.cityName} value={location._id} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1878F1', // Set the background color as needed
    },
    backButton: {
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backText: {
        fontSize: 24,
        color: '#fff',
    },
    picker: {
        width: '50%',
        backgroundColor: '#fff',
    },

});

export default CustomHeader2;
