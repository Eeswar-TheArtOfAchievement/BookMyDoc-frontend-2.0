import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import BookAppointmentScreen from '../screens/home/BookAppointmentScreen';
import MyAppointmentsScreen from '../screens/home/MyAppointmentsScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import {IconButton} from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
const Tab = createBottomTabNavigator();

// TabIcon component to render icons based on the focused state
const TabIcon = ({route, focused }) => {
    const {theme} = useTheme();
  let iconName;

  // Determine icon name based on the focused state
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Book-Appointment') {
    iconName = focused ? 'calendar' : 'calendar-outline';
  } else if (route.name === 'My-Appointments') {
    iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'account' : 'account-outline';
  }

  return <IconButton icon={iconName} color={theme.text} />;
};

// Tab Navigator definition
const TabNavigator = ({ navigation }) => {
    const {theme} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: props => <TabIcon {...props} route={route} />,
        tabBarActiveTintColor: theme.white , //  '#1878F1',
        tabBarInactiveTintColor:  theme.text, //'#000',
        tabBarLabelStyle: {fontSize: 13 , color: theme.text },
        tabBarActiveBackgroundColor: theme.background, // '#f7f9fc',
        tabBarItemStyle: { paddingBottom : 7},
        tabBarStyle: {
            backgroundColor: theme.background, // Tab bar background color based on theme
            borderTopColor: theme.border, // Border color for the top of the tab bar
          },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Book-Appointment"
        component={BookAppointmentScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="My-Appointments"
        component={MyAppointmentsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
