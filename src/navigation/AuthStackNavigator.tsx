// AuthStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DisclosureScreen from '../screens/DisclosureScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import OtpScreen from '../screens/auth/OtpScreen';
import TermsConditions from '../screens/TermsConditions';
import AboutScreen from '../screens/AboutScreen';
import TabNavigator from './TabNavigator';
import DoctorDrawerNav from './DoctorDrawerNav';
import AdminDrawerNav from './AdminDrawerNav';
import PrivacyPolicy from '../screens/PrivacyPolicy';

const Stack = createStackNavigator();

const AuthStackNavigator = ({ role }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1878F1' },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '400',
        },
      }}
      initialRouteName={role ? 'Login' : 'Disclosure of App Permissions'}
    >
      <Stack.Screen name="Disclosure of App Permissions" component={DisclosureScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="DoctorDrawerNav" component={DoctorDrawerNav} options={{ headerShown: false }} />
      <Stack.Screen name="AdminDrawerNav" component={AdminDrawerNav} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
