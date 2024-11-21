// AuthStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import DoctorDetailScreen from '../screens/home/DoctorDetailScreen';
import AllDoctorsScreen from '../screens/home/AllDoctorsScreen';
import SpecializationDetail from '../screens/home/SpecializationDetail';

const Stack = createStackNavigator();
const UserStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#1878F1' },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: '400',
                },
            }}
        >
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }}  />

            <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
            <Stack.Screen name="Find Doctors" component={AllDoctorsScreen} />
            <Stack.Screen name="SpecializationDetail" component={SpecializationDetail} />
        </Stack.Navigator>
    );
};

export default UserStack;
