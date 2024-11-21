import React, {useEffect, useState} from 'react';
import {  createDrawerNavigator,  DrawerContentScrollView,  DrawerItemList,  DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  Alert,  ImageBackground,StyleSheet,TouchableOpacity,View} from 'react-native';
import {ActivityIndicator, Avatar, Text, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import DoctorDashboard from '../screens/doctor/DoctorDashboard';
import MyPatientsScreen from '../screens/doctor/MyPatientsScreen';
import DoctorProfileScreen from '../screens/doctor/DoctorProfileScreen';
import {DoctorProvider, useDoctor} from '../contexts/UserProvider';
import AvailabilityScreen from '../screens/doctor/AvailabilityScreen';
import ipAddress from '../config/ipConfig';
const DoctorDrawer = createDrawerNavigator();

// Define a separate function for the icons
const getDrawerIcon = name => {
  return ({color}) => <Ionicons name={name} size={24} color={color} />;
};
const CustomDrawerContent = props => {
  const {doctorDetails, updateDoctorDetails} = useDoctor();
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState(''); // State to hold formatted date
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Fetch user details using the token
          const doctorResponse = await fetch(
            `http://${ipAddress}:5000/api/v1/doctors/doctor1`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );
          const doctorData = await doctorResponse.json();
          if (doctorResponse.ok) {
            // Decode and format the dateOfBirth
            const dateOfBirth = new Date(doctorData.dateOfBirth); // Convert to Date object
            const formattedDate = dateOfBirth.toLocaleDateString(); // Format the date
            const tempDetails = {
              ...doctorData,
              dateOfBirth: formattedDate, // Store formatted date as string
            };
            // Update the user details in context
            updateDoctorDetails(tempDetails);
            console.log(doctorDetails);
            // Set the formatted date for rendering
            setFormattedDateOfBirth(formattedDate);
          } else {
            Alert.alert('Error', 'Failed to fetch doctor details.');
          }
        } else {
          Alert.alert('Error', 'No token found. Please log in again.');
        }
      } catch (error) {
        console.error('Failed to fetch doctor data:', error);
        Alert.alert('Error', 'An error occurred while fetching doctor data.');
      }
    };
    fetchDoctorData();
  }, []);
  const profileImageUri = doctorDetails?.profileImage
    ? `data:image/jpeg;base64,${doctorDetails.profileImage}`
    : null;
  const displayName = doctorDetails?.fullName || 'Doctor'; // Default name if not available
  const displayEmail = doctorDetails?.email || '****@gmail.com'; // Default email if not available
  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('token');
            Alert.alert('Signed Out', 'You have been signed out successfully.');
            props.navigation.navigate('Login');
            // props.navigation.reset({
            //     index: 0,
            //     routes: [{name: 'Login'}], // Ensure this is correct
            //   });
            // props.navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [{ name: 'AuthStackNavigator' },{ name: 'Login' }],
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
        {profileImageUri ? (
          <ImageBackground
            source={{uri: profileImageUri} as {uri: string}}
            style={styles.backgroundImage} />
        ) : (
            <ActivityIndicator size="small" color="#fff" />
        )}

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
const DoctorDrawerNav = ({navigation}) => {
  return (
    <DoctorProvider>
      <DoctorDrawer.Navigator
        initialRouteName="AdminDashboard"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <DoctorDrawer.Screen
          name="DoctorHome"
          component={DoctorDashboard}
          options={{
            drawerIcon: getDrawerIcon('home-outline'),
            title: 'Dashboard', // Optional: Custom title for the drawer item
          }}
        />
        <DoctorDrawer.Screen
          name="Availability"
          component={AvailabilityScreen}
          options={{
            drawerIcon: getDrawerIcon('person-outline'),
            title: 'Availability',
          }}
        />
        <DoctorDrawer.Screen
          name="MyPatients"
          component={MyPatientsScreen}
          options={{
            drawerIcon: getDrawerIcon('person-outline'),
            title: 'MyPatients',
          }}
        />
        <DoctorDrawer.Screen
          name="DoctorProfile"
          component={DoctorProfileScreen}
          options={{
            drawerIcon: getDrawerIcon('person-outline'),
            title: 'Settings',
          }}
        />
      </DoctorDrawer.Navigator>
    </DoctorProvider>
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
  },
  userInfoSection: {},
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
      backgroundColor: '#f4f4f4',
      marginBottom: 10,
    },
    logoutLabel: {
        // color: '#000000',
        color: 'red',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
export default DoctorDrawerNav;
