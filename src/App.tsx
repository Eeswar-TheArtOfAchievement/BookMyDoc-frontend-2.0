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
import { UserProvider } from './contexts/UserProvider';

const Stack = createStackNavigator();

// Define the Main Stack Navigator
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(null);

    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const userData = await AsyncStorage.getItem('token');
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
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
          {isLoggedIn ? (
            <TabNavigator />
          ) : (
              <Stack.Navigator
                  screenOptions={{
                    headerStyle: { backgroundColor: '#1878F1' },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: '400',
                      },
                    }}
                    >
                  <Stack.Screen name="Disclosure of App Permissions" component={DisclosureScreen} />
                  <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="OtpScreen" component={OtpScreen} />
                  <Stack.Screen name="TermsConditions" component={TermsConditions} />
                  <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                  <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
              </Stack.Navigator>
          )}
      </NavigationContainer>
     </GestureHandlerRootView>
    </UserProvider>
    );
};

export default App;

