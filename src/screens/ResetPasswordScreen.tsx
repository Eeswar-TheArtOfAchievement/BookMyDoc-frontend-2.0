import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';
import ipAddress from '../config/ipConfig';

const ResetPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params; // Assuming the email is passed from the previous screen
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      setError('Please fill in both OTP and new password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`http://${ipAddress}:5000/api/v1/public/resetPassword`, {
        email,
        otp,
        newPassword,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Your password has been reset successfully.');
        navigation.navigate('Login'); // Navigate to login screen after successful reset
      } else {
        setError(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Reset Password</Text>

      {/* OTP Input */}
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
      />

      {/* New Password Input */}
      <TextInput
        placeholder="Enter New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
      />

      {/* Error message */}
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

      {/* Submit Button */}
      <Button title={loading ? 'Resetting...' : 'Reset Password'} onPress={handleResetPassword} disabled={loading} />
    </View>
  );
};

export default ResetPasswordScreen;
