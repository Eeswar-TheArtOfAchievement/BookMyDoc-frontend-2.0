import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View>
        <View style={styles.photoContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Replace with your photo URL
                  style={styles.photo}
                />
        </View>
    </View>
    // <View style={styles.container}>
    //   

    //   {/* Heading */}
    //   <Text style={styles.heading}>Find Healthcare Providers</Text>

    //   {/* Content Sections */}
    //   <View style={styles.contentContainer}>
    //       <Text style={styles.buttonText}>Book Appointments</Text>
    //       <Text style={styles.buttonText}>Search for Providers</Text>
    //       <Text style={styles.buttonText}>View History</Text>
    //       <Text style={styles.buttonText}>Stay Healthy</Text>
    //   </View>

    //   {/* Join Button */}
    //   <TouchableOpacity style={styles.joinButton}>
    //     <Text style={styles.joinButtonText}>Join</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  photoContainer: {
    flex: 1,
    width: '100%',
  },
  photo: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
