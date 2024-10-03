import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyPatientsScreen from '../screens/doctor/MyPatientsScreen';
import DoctorProfileScreen from '../screens/doctor/DoctorProfileScreen';
import DoctorDashboard from '../screens/doctor/DoctorDashboard';

const DoctorDrawer = createDrawerNavigator();

const DoctorDrawerNav = () => {
    return (
        <DoctorDrawer.Navigator>
            <DoctorDrawer.Screen name="DoctorHome" component={DoctorDashboard} />
            <DoctorDrawer.Screen name="MyPatients" component={MyPatientsScreen} />
            <DoctorDrawer.Screen name="DoctorProfile" component={DoctorProfileScreen} />
        </DoctorDrawer.Navigator>
    );
};

export default DoctorDrawerNav;
