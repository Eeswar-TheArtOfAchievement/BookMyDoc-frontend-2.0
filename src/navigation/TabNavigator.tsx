import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import BookAppointmentScreen from '../screens/home/BookAppointmentScreen';
import MyAppointmentsScreen from '../screens/home/MyAppointmentsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { IconButton } from 'react-native-paper';
const Tab = createBottomTabNavigator();


// TabIcon component to render icons based on the focused state
const TabIcon = ({ route, focused, color }) => {
    let iconName;

    // Determine icon name based on the focused state
    if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'BookAppointment') {
        iconName = focused ? 'calendar' : 'calendar-outline';
    } else if (route.name === 'MyAppointments') {
        iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
    } else if (route.name === 'Profile') {
        iconName = focused ? 'account' : 'account-outline';
    }

    return (
        <IconButton
            icon={iconName}
            color={color}
        />
    );
};

// Tab Navigator definition
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: (props) => <TabIcon {...props} route={route} />,
                tabBarActiveTintColor: '#1878F1',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: 12 },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="BookAppointment" component={BookAppointmentScreen} options={{ headerShown: false }} />
            <Tab.Screen name="MyAppointments" component={MyAppointmentsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;



