import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminProfile from '../screens/admin/AdminProfile';
import {AdminProvider, useAdmin} from '../contexts/UserProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Text, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import DoctorsReports from '../screens/admin/DoctorsReports';
import UserReports from '../screens/admin/UserReports';
import ipAddress from '../../config/ipConfig';
const AdminDrawer = createDrawerNavigator();

// Define a separate function for the icons
const getDrawerIcon = name => {
  return ({color}) => <Ionicons name={name} size={24} color={color} />;
};
const CustomDrawerContent = props => {
  const {adminDetails, updateAdminDetails} = useAdmin();
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Fetch user details using the token
          const adminResponse = await fetch(
            `http://${ipAddress}:5000/api/v1/admin/admin1`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );
          const adminData = await adminResponse.json();
          if (adminResponse.ok) {
            // Decode and format the dateOfBirth
            const dateOfBirth = new Date(adminData.dateOfBirth); // Convert to Date object
            const formattedDate = dateOfBirth.toLocaleDateString(); // Format the date
            const tempDetails = {
              ...adminData,
              dateOfBirth: formattedDate, // Store formatted date as string
            };
            // Update the user details in context
            updateAdminDetails(tempDetails);
            console.log(adminDetails);
            // Set the formatted date for rendering
            setFormattedDateOfBirth(formattedDate);
            if (tempDetails && adminData.fullName && adminData.email) {
              Alert.alert('Welcome', `Welcome, ${adminData.fullName}!`);
            } else {
              Alert.alert('Error', 'User data is incomplete or not available.');
            }
          } else {
            Alert.alert('Error', 'Failed to fetch admin details.');
          }
        } else {
          Alert.alert('Error', 'No token found. Please log in again.');
        }
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        Alert.alert('Error', 'An error occurred while fetching admin data.');
      }
    };
    fetchAdminData();
  }, []);
  const profileImageUri = adminDetails?.profileImage
    ? `data:image/jpeg;base64,${adminDetails.profileImage}`
    : null;
  const displayName = adminDetails?.fullName || 'Admin'; // Default name if not available
  const displayEmail = adminDetails?.email || 'Not available'; // Default email if not available
  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('token');
            Alert.alert('Signed Out', 'You have been signed out successfully.');
            props.navigation.replace('Login');
            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [{ name: 'Login' }],
            //     }));
          } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
          }
        },
      },
    ]);
  };
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <View style={styles.profileContainer}>
      <Image
          source={{ uri: profileImageUri }} // Replace with your background image URL
          style={styles.backgroundImage}
        />
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {profileImageUri ? (
                <Avatar.Image
                  source={{uri: profileImageUri}}
                  size={100}
                  style={{marginTop: 5}}
                />
              ) : (
                <Icon name="user-circle" size={100} color="#ccc" />
              )}
              <Title style={styles.title}>{displayName}</Title>
              <Text style={styles.caption} numberOfLines={1}>
                {displayEmail}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />

      <TouchableOpacity style={styles.logoutContainer} onPress={handleSignOut}>
        <DrawerItem
          label="Log out"
          icon={getDrawerIcon('log-out-outline')}
          onPress={handleSignOut}
          labelStyle={styles.logoutLabel}
          style={styles.logoutItem}
        />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};
const AdminDrawerNav = ({navigation}) => {
  return (
    <AdminProvider>
      <AdminDrawer.Navigator
        initialRouteName="AdminDashboard"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <AdminDrawer.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{
            drawerIcon: getDrawerIcon('home-outline'),
            title: 'Dashboard', // Optional: Custom title for the drawer item
          }}
        />
        <AdminDrawer.Screen
          name="DoctorAvailability"
          component={DoctorsReports}
          options={{
            drawerIcon: getDrawerIcon('person-outline'),
            title: 'Doctors', // Optional: Custom title for the drawer item
          }}
        />
        <AdminDrawer.Screen
          name="UserManagement"
          component={UserReports}
          options={{
            drawerIcon: getDrawerIcon('person-outline'),
            title: 'Users', // Optional: Custom title for the drawer item
          }}
        />
        <AdminDrawer.Screen
          name="AppointmentManagement"
          component={AdminProfile}
          options={{
            drawerIcon: getDrawerIcon('calendar-outline'),
            title: 'Appointments', // Optional: Custom title for the drawer item
          }}
        />
        <AdminDrawer.Screen
          name="Notifications"
          component={AdminProfile}
          options={{
            drawerIcon: getDrawerIcon('notifications-outline'),
            title: 'Notifications', // Optional: Custom title for the drawer item
          }}
        />
        <AdminDrawer.Screen
          name="Reports"
          component={AdminProfile}
          options={{
            drawerIcon: getDrawerIcon('bar-chart-outline'),
            title: 'Reports', // Optional: Custom title for the drawer item
          }}
        />
        <AdminDrawer.Screen
          name="Settings"
          component={AdminProfile}
          options={{
            drawerIcon: getDrawerIcon('settings-outline'),
            title: 'Settings', // Optional: Custom title for the drawer item
          }}
        />
      </AdminDrawer.Navigator>
    </AdminProvider>
  );
};
const styles = StyleSheet.create({
  logoutContainer: {
    marginTop: 'auto',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    resizeMode: 'cover',
  },
  profileImageBackground: {
    resizeMode: 'cover',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  profileImage1: {
    borderRadius: 10,
    // marginRight: 16,
  },
  userInfoSection: {
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    width: '100%',
  },
  logoutItem: {
    color: 'red',
    backgroundColor: '#f4f4f4', // Optional: Customize the background color if needed
    marginBottom: 10, // Optional: Add some margin to the bottom
  },
  logoutLabel: {
    color: '#000', // Customize the text color if needed
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#f4f4f4', // Optional: Background color for the profile section
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make it circular
    marginRight: 16,
  },
});
export default AdminDrawerNav;
