// AuthStackNavigator.js
import React, { useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../screens/LoadingIndicator';
import DoctorDetailScreen from '../screens/home/DoctorDetailScreen';
import AllDoctorsScreen from '../screens/home/AllDoctorsScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(null);
    const [userRole, setUserRole] = React.useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userData = await AsyncStorage.getItem('token');
                const role = await AsyncStorage.getItem('role');
                setUserRole(role);
                setIsLoggedIn(!!userData); // Converts userData to boolean
            } catch (error) {
                console.error('Failed to check login status:', error);
                setIsLoggedIn(false); // Set to false on error
            }
        };

        checkLoginStatus();
    }, []);

    // if(isLoggedIn) {
    //     if(userRole==='user'){
    //         return <TabNavigator />
    //     }else if (userRole==='doctor') {
    //         return <DoctorDrawerNav />
    //      } else {
    //         return <AdminDrawerNav />
    //         }
    // }

    // Check loading state
    if (isLoggedIn === null) {
        return <LoadingIndicator />; // Ensure LoadingIndicator component is defined
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#1878F1' },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: '400',
                },
            }}
            initialRouteName={
                isLoggedIn ? (userRole ? (userRole === 'admin' ? 'AdminDrawerNav' :
                     (userRole === 'doctor' ? 'DoctorDrawerNav' : 'TabNavigator')) : 'Login') : 'Disclosure of App Permissions'
            }
        >
            {isLoggedIn ? (
                <>
                    {userRole === 'admin' ? (
                        <Stack.Screen name="AdminDrawerNav" component={AdminDrawerNav} options={{ headerShown: false }}  />
                    ) : userRole === 'doctor' ? (
                        <Stack.Screen name="DoctorDrawerNav" component={DoctorDrawerNav} options={{ headerShown: false }} />
                    ) : (
                        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }}  />
                    )}
                </>
            ) :
            <>
            <Stack.Screen name="Disclosure of App Permissions" component={DisclosureScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            </>
            }
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
            <Stack.Screen name="Find Doctors" component={AllDoctorsScreen} />
        </Stack.Navigator>
    );
};

export default AuthStackNavigator;
