import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminProfile from '../screens/admin/AdminProfile';

const AdminDrawer = createDrawerNavigator();

const AdminDrawerNav = () => {
    return (
        <AdminDrawer.Navigator>
            <AdminDrawer.Screen name="AdminDashboard" component={AdminDashboard} />
            <AdminDrawer.Screen name="AdminProfile" component={AdminProfile} />
        </AdminDrawer.Navigator>
    );
};

export default AdminDrawerNav;
