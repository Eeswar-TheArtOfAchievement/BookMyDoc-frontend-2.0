import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Dimensions , Alert , Button  } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ipAddress from '../../../config/ipConfig';

// Get screen width for responsive image
const { width, height } = Dimensions.get('window');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validateName = (fullName) => {
  const nameRegex = /^[A-Za-z]+(\s[A-Za-z]+){0,2}?$/;
  return nameRegex.test(fullName);
};
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,@#$]).{8,}$/;
  return passwordRegex.test(password);  // Minimum 8 characters, at least one letter and one number
};

const SignUpScreen = ({navigation}) => {
  const [fullName,setFullName] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,SetConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email,setEmail] = useState('');
  const [role, setSelectedRole] = useState('user');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
     // Name validation
     if (!validateName(fullName)) {
      setErrorMessage('Name must be at least 3 letters.');
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setErrorMessage('Password minimum 8 characters long and include both capital, small letters , numbers and 1 symbol like (.#$@)');
      return;
    }

    // Success
    setErrorMessage('');
    try {
      const response = await fetch(`http://${ipAddress}:5000/api/v1/public/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password , role }),
      });

      const data = await response.text();
      if (response.ok) {
        navigation.navigate('OtpScreen', { email: email , role : role , password: password, fullName :fullName});
      } else {
        Alert.alert('Error', data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <>
    <View>
      {/* Logo/Image */}
      <Image
        source={require('../../assets/images/asset2.png')}
        style={styles.logo}
        />
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        onChangeText={setFullName}
        placeholder="Full Name"
        placeholderTextColor="#888"
        />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        placeholderTextColor="#888"
        keyboardType="email-address"
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        placeholderTextColor="#888"
        secureTextEntry
        />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={SetConfirmPassword}
        placeholderTextColor="#888"
        secureTextEntry
        />
        {/* radioButton */}
        <View style={[styles.containerRadio, styles.row]}>
            <Text style={styles.titleRadio}>Select your role:</Text>
            <RadioButton.Group
                onValueChange={newValue => setSelectedRole(newValue)}
                value={role}
            >
              <View style={styles.row}>

                <View style={styles.radioContainer}>
                    <RadioButton value="user" />
                    <Text style={styles.footerText1}>User</Text>
                </View>
                <View style={styles.radioContainer}>
                    <RadioButton value="doctor" />
                    <Text style={styles.footerText1}>Doctor</Text>
                </View>
                <View style={styles.radioContainer}>
                    <RadioButton value="admin" />
                    <Text style={styles.footerText1}>Admin</Text>
                </View>
              </View>
            </RadioButton.Group>
        </View>

      {errorMessage ? <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text> : null}
      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText1}>By Signing in you agree to our </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.links} onPress={()=>navigation.navigate('TermsConditions')}>Terms and conditions</Text>
        <Text>  &</Text>
      <Text style={styles.links} onPress={()=>navigation.navigate('PrivacyPolicy')}>Privacy Policy </Text>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  row:{
    flex:1,
    flexDirection:'row',
  },
    logo: {
        height: height * 0.3, // Maintain aspect ratio
        width: width * 1, // 70% of screen width
        resizeMode:'cover',
    },
    container:{
        flex:1,
        paddingHorizontal:10,
    },
    title: {
        textAlign:'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent background for the overlay
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom:20,
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff', // Bootstrap blue
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#555',
    fontSize: 20,
  },
  footerText1:{
    color: '#555',
    fontSize: 16,
  },
  footerLink: {
    color: '#007bff', // Bootstrap blue
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom:10,
  },
  footer1:{
    flexGrow:1,
},
links:{
    color:'#1878F1',
  },

  containerRadio: {
    maxHeight: 60,
    borderRadius:10,
    justifyContent:'space-between',
    paddingHorizontal: 8,
    alignItems:'center',
    backgroundColor: '#fff',
    flex: 1,
},
titleRadio: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent:'center',
},
radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
});

export default SignUpScreen;
