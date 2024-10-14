import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminProfile from '../screens/admin/AdminProfile';
import { AdminProvider } from '../contexts/UserProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AdminDrawer = createDrawerNavigator();

// Define a separate function for the icons
const getDrawerIcon = (name) => {
    return ({ color }) => <Ionicons name={name} size={24} color={color} />;
};

const AdminDrawerNav = () => {
    return (
        <AdminProvider>
            <AdminDrawer.Navigator>
                <AdminDrawer.Screen name="AdminDashboard" component={AdminDashboard}
                    options={{
                        drawerIcon: getDrawerIcon('home-outline'),
                        title: 'Dashboard', // Optional: Custom title for the drawer item
                    }}
                    />
                <AdminDrawer.Screen name="AdminProfile" component={AdminProfile}
                    options={{
                        drawerIcon: getDrawerIcon('person-outline'),
                        title: 'Profile', // Optional: Custom title for the drawer item
                    }}
                    />
            </AdminDrawer.Navigator>
        </AdminProvider>
    );
};

export default AdminDrawerNav;
