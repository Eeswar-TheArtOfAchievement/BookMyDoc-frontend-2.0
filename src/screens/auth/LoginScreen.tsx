import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert , Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import ipAddress from '../../../config/ipConfig';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
        try {
            const response = await fetch(`http://${ipAddress}:5000/api/v1/public/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
              const {token ,role} = data;
              console.log(token , role)
              // Store only the token clg
              await AsyncStorage.setItem('token',token);
              await AsyncStorage.setItem('role',role);
              if (role === 'doctor') {
                navigation.replace('DoctorDrawerNav'); // Navigate to Doctor Drawer
            } else if (role === 'admin') {
                navigation.replace('AdminDrawerNav'); // Navigate to Admin Drawer
            } else {
                navigation.replace('TabNavigator'); // Navigate to User Tab (default case)
            }
          } else {
              Alert.alert('Error', data.message || 'Login failed');
          }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Something went wrong in login route');
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
    } else {
        Alert.alert('Error', 'Please enter both email and password.');
    }
};


  return (
    <View style={styles.container}>
        <View style={styles.logo}>
             <Image source={require('../../assets/logo.png')} style={styles.logo1}  />
            <Text style={styles.bar}>BookMyDoc</Text>
        </View>
        <Text style={styles.bar1}>Welcome Back</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          autoCapitalize="none"
        />

       <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
    {loading ? (
        <ActivityIndicator size="small" color="#fff" />
    ) : (
        <Text style={styles.buttonText}>Login</Text>
    )}
 </TouchableOpacity>

      </View>

      {/* Separate TouchableOpacity for the Sign-Up button */}
      <TouchableOpacity style={styles.signUpButton} onPress={()=> navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account ,Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  bar1: {
    fontSize: 24,
    display: 'flex',
    marginLeft: -250,
    fontWeight: 'bold',
    marginBottom: 20,

  },
  bar: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    padding:20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor:'#f5f5f5',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    paddingVertical: 10,
    borderRadius: 5,
  },
  signUpText: {
    color: '#007bff',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  logo1:{
    width: 50,
    height: 50,
    resizeMode: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  logo: {
    width: width * 1,
    height: height * 0.2,
    display: 'flex',
flexDirection: 'row',
    justifyContent: 'center',
    gap:10,
    alignItems: 'center',

},
});

export default LoginScreen;
