// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppointmentProvider, AuthProvider, UserProvider } from './contexts/UserProvider';
import Toast from 'react-native-toast-message';
import AuthStackNavigator from './navigation/AuthStackNavigator';

const App = () => {



  return (
    <UserProvider>
        <AuthProvider>

      <AppointmentProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>

              <AuthStackNavigator  />
            <Toast />
          </NavigationContainer>
        </GestureHandlerRootView>
      </AppointmentProvider>
        </AuthProvider>
    </UserProvider>
  );
};

export default App;
