// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppointmentProvider, UserProvider } from './contexts/UserProvider';
import TabNavigator from './navigation/TabNavigator';
import DoctorDrawerNav from './navigation/DoctorDrawerNav';
import AdminDrawerNav from './navigation/AdminDrawerNav';
import Toast from 'react-native-toast-message';
import AuthStackNavigator from './navigation/AuthStackNavigator';

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
    return null; // Or some loading indicator
  }

  return (
    <UserProvider>
      <AppointmentProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            {isLoggedIn ? (
              role === 'admin' ? (
                <AdminDrawerNav  />
              ) : role === 'doctor' ? (
                <DoctorDrawerNav />
              ) : (
                <TabNavigator />
              )
            ) : (
              <AuthStackNavigator role={role} />
            )}
            <Toast />
          </NavigationContainer>
        </GestureHandlerRootView>
      </AppointmentProvider>
    </UserProvider>
  );
};

export default App;
