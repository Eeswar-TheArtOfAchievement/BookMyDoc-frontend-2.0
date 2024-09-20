import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/auth/LoginScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import TermsConditions from './screens/TermsConditions';
import PrivacyPolicy from './screens/PrivacyPolicy';
import OtpScreen from './screens/auth/OtpScreen';
import HomeScreen from './screens/home/HomeScreen';
import BookAppointmentScreen from './screens/home/BookAppointmentScreen';
import MyAppointmentsScreen from './screens/home/MyAppointmentsScreen';
import DisclosureScreen from './screens/DisclosureScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define the Tab Navigator
const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="BookAppointment" component={BookAppointmentScreen} />
            <Tab.Screen name="MyAppointments" component={MyAppointmentsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

// Define the Main Stack Navigator
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(null);

    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const userData = await AsyncStorage.getItem('userData');
          if (userData) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Failed to check login status:', error);
          setIsLoggedIn(false);
        }
      };
      checkLoginStatus();
    }, []);
    if (isLoggedIn === null) {
      // You can return a loading screen here while checking the AsyncStorage
      return null; // Or some loading indicator
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                  headerStyle: { backgroundColor: '#1878F1'},
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                  fontWeight: '400',
              },
            }}
            >
              {isLoggedIn ? (
                  <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen  name="Disclosure of App Permissions" component={DisclosureScreen} />
                )}
              <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUpScreen}   options={{ headerShown: false }}/>
              <Stack.Screen name="Welcome" component={WelcomeScreen}   options={{ headerShown: false }}/>
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="TermsConditions" component={TermsConditions} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;


