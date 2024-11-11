import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import ipAddress from '../../../config/ipConfig';

const OtpScreen = ({ route, navigation }) => {
    const { email ,password, fullName, role } = route.params; // Get the email passed from SignUpScreen
    const [otp, setOtp] = useState('');
    const handleVerifyOtp = async () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter the OTP');
            return;
        }
        // Call your API to verify the OTP
        try {
            const response = await fetch(`http://${ipAddress}:5000/api/v1/public/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email,password, fullName , role , otp }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'OTP verified successfully!');
                navigation.navigate('Login');
            } else {
                Alert.alert( 'OTP verification failed', data);
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something1 went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
            <Text style={styles.resendText}>
        Didn't receive code?{' '}
        <Text style={styles.resendLink} >
          Resend
        </Text>
      </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    button: {
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    resendText: {
        marginTop: 20,
        color: '#888',
      },
      resendLink: {
        color: '#007BFF',
        fontWeight: 'bold',
      },
});

export default OtpScreen;
