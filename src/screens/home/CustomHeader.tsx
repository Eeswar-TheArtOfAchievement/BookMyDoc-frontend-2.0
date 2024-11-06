// CustomHeader.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const CustomHeader = ({ title, imageUri, location ,hospital }) => {
    const navigation = useNavigation(); // Hook to get navigation object
console.log(location)
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}><Icon name="arrow-back" size={24}  /></Text>
            </TouchableOpacity>
            <Image
                source={{ uri: imageUri }}
                style={styles.headerImage}
            />
            <View style={styles.textContainer}>
                <Text style={styles.headerTitle}>{title}</Text>
                <Text style={styles.text}>{hospital.hospitalName} , {location}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1878F1', // Set the background color as needed
    },
    backButton: {
        marginRight: 10,
    },
    backText: {
        fontSize: 24,
        color: '#000',
    },
    headerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    text: {
        fontSize: 16,
        color: '#fff',
    },
});

export default CustomHeader;
