// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert ,Button} from 'react-native';
// import ProfileScreen from '../profile/ProfileScreen';
// import { useNavigation } from '@react-navigation/native';

// const LoginScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const navigation = useNavigation();

//   const signUpFunction = () => {
//     navigation.navigate('ProfileScreen'); // Navigate to ProfileScreen
//   };

//   const handleLogin = () => {
//     if (username && password) {
     
//     } else {
//       Alert.alert('Error', 'Please enter both username and password.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.bar}>LoginScreen</Text>
//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={username}
//           onChangeText={(text) => setUsername(text)}
//           autoCapitalize="none"
//         />
        
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//           secureTextEntry
//           autoCapitalize="none"
//         />
        
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>

//       </View>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text onPress={signUpFunction} style={styles.buttonText}>signup</Text>
//         </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   bar: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;








import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const signUpFunction = () => {
    navigation.navigate('ProfileScreen'); // Navigate to ProfileScreen
  };

  const handleLogin = () => {
    if (username && password) {
      // Logic for logging in the user
      console.log('Logging in:', username);
    } else {
      Alert.alert('Error', 'Please enter both username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bar}>LoginScreen</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
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
      <TouchableOpacity style={styles.signupButton} onPress={signUpFunction}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  bar: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
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
  signupButton: {
    paddingVertical: 15,
    borderRadius: 5,
  },
  signupText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
