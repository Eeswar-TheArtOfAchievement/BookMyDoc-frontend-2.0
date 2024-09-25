import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert , Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const navigation = useNavigation();


  const handleLogin = async () => {
    if (email && password) {
        try {
            const response = await fetch('http://192.168.1.14:5000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
              const {token} = data;
              // Store only the token clg
              await AsyncStorage.setItem('token',token);
              // Navigate to the Home screen
              navigation.replace('TabNavigator');
          } else {
              Alert.alert('Error', data.message || 'Login failed');
          }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Something went wrong in login route');
        }
    } else {
        Alert.alert('Error', 'Please enter both email and password.');
    }
};


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/asset3.png')} style={styles.logo} />
      <Text style={styles.bar}>Nice to see u again </Text>
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
  bar: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  logo: {
    width: width * 1,
    height: height * 0.4,
},
});

export default LoginScreen;
