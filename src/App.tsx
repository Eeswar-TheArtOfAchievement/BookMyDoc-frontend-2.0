import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/auth/LoginScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import TermsConditions from './screens/TermsConditions';
import PrivacyPolicy from './screens/PrivacyPolicy';
import OtpScreen from './screens/auth/OtpScreen';
import DisclosureScreen from './screens/DisclosureScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from './navigation/TabNavigator';
import { AppointmentProvider, UserProvider } from './contexts/UserProvider';
import DoctorDrawerNav from './navigation/DoctorDrawerNav';
import AdminDrawerNav from './navigation/AdminDrawerNav';
import AboutScreen from './screens/AboutScreen';
import Toast from 'react-native-toast-message';
const Stack = createStackNavigator();

// Define the Main Stack Navigator
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(null);
    const [role, setRole] = React.useState(null);

    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const userData = await AsyncStorage.getItem('token');
          const role1 = await AsyncStorage.getItem('role');
          setRole(role1);
          setIsLoggedIn(userData ? true : false);
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
    <UserProvider>
        <AppointmentProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
          {isLoggedIn ? (
            role === 'admin' ? (
                
                <AdminDrawerNav />
            ) : role === 'doctor' ? (
                <DoctorDrawerNav /> // Render Doctor-specific navigation
            ) : (
                <TabNavigator /> // Render general navigation for other roles
            )
        ) : (
            <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#1878F1' },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: '400',
                },
            }} initialRouteName={role ? 'Login' : 'Disclosure of App Permissions'}
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
          )}
          <Toast />
      </NavigationContainer>
     </GestureHandlerRootView>
    </AppointmentProvider>
    
    </UserProvider>
    );
};

export default App;

