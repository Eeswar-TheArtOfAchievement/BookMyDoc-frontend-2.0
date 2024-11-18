import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import {ThemeProvider} from './contexts/ThemeContext';
import { AppointmentProvider, AuthProvider, UserProvider } from './contexts/UserProvider';
import { StyleSheet } from 'react-native';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <UserProvider>
          <AuthProvider>
            <AppointmentProvider>
              <NavigationContainer>
                <AuthStackNavigator />
                <Toast />
              </NavigationContainer>
            </AppointmentProvider>
          </AuthProvider>
        </UserProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default App;
