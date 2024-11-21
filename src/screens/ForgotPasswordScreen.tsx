import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import ipAddress from '../config/ipConfig';
import axios from 'axios';

const ForgotPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params; // Accessing the passed email prop
  const [newEmail, setNewEmail] = useState(email || ''); // Pre-fill email if provided
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleResetPassword = async () => {
    if (newEmail) {
      setLoading(true);
      setError('');  // Reset any previous error
      try {
        console.log('Email sent to server:', newEmail);

        // Replace this with your actual API endpoint for password reset
        const response = await axios.post(
          `http://${ipAddress}:5000/api/v1/public/forgotPassword`,
          { email: newEmail },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response);
        // Check if the response was successful
        if (response.status === 201) {
          Alert.alert('Success', 'A reset link has been sent to your email.');
          navigation.navigate('ResetPassword' , {email});
        } else {
          setError(response.data.message || 'An error occurred. Please try again.');
        }
      } catch (error) {
        console.error('Password reset error:', error);
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter your email address.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email address to receive a password reset link.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newEmail}
        onChangeText={setNewEmail}
        autoCapitalize="none"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Reset Link</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
