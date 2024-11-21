import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import {useUser} from '../../contexts/UserProvider';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {FlatList} from 'react-native-gesture-handler';
import Iconi from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import ipAddress from '../../config/ipConfig';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '../../contexts/ThemeContext';
import styles from './HomeScreen.styles';

const HomeScreen = ({navigation}) => {
  const {theme, isDarkMode, toggleTheme} = useTheme();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const {userDetails, updateUserDetails} = useUser();
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState(''); // State to hold formatted date
  const [doctorDetails, setDoctorDetails] = useState([]); // State to hold formatted date
  const [visible, setVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Hyderabad');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Get the token from AsyncStorage (or another secure location)
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          Alert.alert('Authentication Error', 'No token found.');
          return;
        }

        // Include the token in the Authorization header
        const response = await axios.get(
          `http://${ipAddress}:5000/api/v1/doctors/locations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLocations(response.data);
        const savedLocation = await AsyncStorage.getItem('selectedLocation');
        if (savedLocation) {
          setSelectedLocation(savedLocation);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        Alert.alert('Error', 'Could not load locations.');
      }
    };

    fetchLocations();
  }, []);

  const doctorsSpecializations = [
    {
      id: '1',
      name: 'Cardiologist',
      image: require('../../assets/images/Cardiologist.png'),
      description:
        'A cardiologist specializes in diagnosing and treating heart conditions. They handle diseases related to the heart and blood vessels.',
      conditions:
        'Heart disease, hypertension, arrhythmias, heart attack, coronary artery disease, heart failure, high cholesterol, stroke.',
    },
    {
      id: '2',
      name: 'Dermatologist',
      image: require('../../assets/images/Dermatologist.png'),
      description:
        'A dermatologist is a doctor who specializes in the diagnosis and treatment of skin disorders, hair, and nail problems.',
      conditions:
        'Acne, eczema, psoriasis, rosacea, skin cancer, rashes, dandruff, fungal infections, nail disorders.',
    },
    {
      id: '3',
      name: 'Pediatrician',
      image: require('../../assets/images/Pediatrician.png'),
      description:
        'A pediatrician specializes in the care of infants, children, and adolescents. They manage physical, behavioral, and developmental concerns.',
      conditions:
        'Common cold, asthma, ADHD, childhood obesity, developmental delays, allergies, immunizations, infections.',
    },
    {
      id: '4',
      name: 'Orthopedic',
      image: require('../../assets/images/Orthopedic.png'),
      description:
        'An orthopedic surgeon treats injuries and disorders of the musculoskeletal system, including bones, joints, muscles, and ligaments.',
      conditions:
        'Fractures, arthritis, back pain, osteoporosis, sports injuries, joint replacement, tendonitis, scoliosis, carpal tunnel syndrome.',
    },
    {
      id: '5',
      name: 'Neurologist',
      image: require('../../assets/images/Neurologist.png'),
      description:
        'A neurologist diagnoses and treats disorders of the brain, spinal cord, nerves, and muscles, including conditions related to the nervous system.',
      conditions:
        "Migraine, epilepsy, Parkinson's disease, multiple sclerosis, Alzheimer's disease, stroke, nerve disorders, neuropathy.",
    },
    {
      id: '6',
      name: 'Oncologist',
      image: require('../../assets/images/Oncologist.png'),
      description:
        'An oncologist specializes in the diagnosis and treatment of cancer. They provide chemotherapy, radiation therapy, and manage the care of cancer patients.',
      conditions:
        'Breast cancer, lung cancer, prostate cancer, leukemia, lymphoma, colon cancer, skin cancer, brain cancer, cancer metastasis.',
    },
    {
      id: '7',
      name: 'Gastroenterologist',
      image: require('../../assets/images/Gastroenterologist.png'),
      description:
        'A gastroenterologist treats disorders related to the digestive system, including the stomach, intestines, liver, and pancreas.',
      conditions:
        "Acid reflux, irritable bowel syndrome (IBS), Crohn's disease, ulcerative colitis, celiac disease, hepatitis, gallstones, pancreatitis.",
    },
    {
      id: '8',
      name: 'Psychiatrist',
      image: require('../../assets/images/Psychiatrist.png'),
      description:
        'A psychiatrist is a medical doctor who specializes in diagnosing and treating mental health disorders, including emotional, behavioral, and cognitive issues.',
      conditions:
        'Depression, anxiety, schizophrenia, bipolar disorder, OCD, PTSD, eating disorders, ADHD, substance abuse, insomnia.',
    },
    {
      id: '9',
      name: 'Ophthalmologist',
      image: require('../../assets/images/Ophthalmologist.png'),
      description:
        'An ophthalmologist is a medical doctor specializing in the diagnosis and treatment of eye diseases and vision care. They also perform eye surgeries.',
      conditions:
        'Glaucoma, cataracts, macular degeneration, diabetic retinopathy, eye infections, astigmatism, eye injuries, dry eyes.',
    },
    {
      id: '10',
      name: 'Endocrinologist',
      image: require('../../assets/images/Endocrinologist.png'),
      description:
        'An endocrinologist focuses on hormone-related diseases and conditions. They treat disorders of the endocrine glands such as thyroid, pancreas, and adrenal glands.',
      conditions:
        'Diabetes, hypothyroidism, hyperthyroidism, adrenal disorders, polycystic ovary syndrome (PCOS), osteoporosis, metabolic syndrome.',
    },
  ];

  const renderItem = ({item}) => (
    <View style={[styles.itemContainer, {backgroundColor: theme.background}]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SpecializationDetail', {item: item})
        }>
        <Image source={item.image} style={styles.image1} />
        <Text style={[styles.itemText, {color: theme.text}]}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  console.log('hii', doctorDetails);
  const renderDoctorCard = ({item}) => (
    <View style={[styles.doctorCard, {backgroundColor: theme.background}]}>
      <Image
        source={{uri: 'https://picsum.photos/200/300'}}
        style={styles.image}
        resizeMode="cover"
      />
      <View>
        <Text style={[styles.doctorName, {color: theme.text}]}>
          {item.fullName}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.doctorSpecialty, {color: theme.text}]}>
          {item.specializations[0]?.specializationName || 'No Specialization'}
        </Text>
        <Text style={[styles.doctorSpecialty, {color: theme.text}]}>
          {' '}
          ⭐{item.rating}{' '}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.primary}]}
        onPress={() =>
          navigation.navigate('DoctorDetail', {
            doctor: item,
            locationId: item.locationId._id,
          })
        }>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, []),
  );
  const handleBackPress = () => {
    Alert.alert('Exit App', 'Do you want to exit?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Exit', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Fetch user details using the token
          const userResponse = await fetch(
            `http://${ipAddress}:5000/api/v1/auth/user`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );
          if (userResponse.status === 429) {
            Alert.alert('Error', 'Too many requests. Please try again later.');
            return;
          }
          if (userResponse.status === 401) {
            Alert.alert('Session Expired', 'Please log in again.');
            await AsyncStorage.removeItem('token');
            navigation.navigate('Login');
            return;
          }
          console.log(userResponse);
          const userData = await userResponse.json();

          if (userResponse.ok) {
            // Decode and format the dateOfBirth
            const dateOfBirth = new Date(userData.dateOfBirth); // Convert to Date object
            const formattedDate = dateOfBirth.toLocaleDateString(); // Format the date

            const tempDetails = {
              ...userData,
              dateOfBirth: formattedDate, // Store formatted date as string
            };

            // Update the user details in context
            updateUserDetails(tempDetails);
            // Set the formatted date for rendering
            setFormattedDateOfBirth(formattedDate);
            if (tempDetails && userData.fullName && userData.email) {
              setVisible(true);
            } else {
              Alert.alert('Error', 'User data is incomplete or not available.');
            }
          } else {
            Alert.alert('Error', 'Failed to fetch user details.');
          }
        } else {
          Alert.alert('Error', 'No token found. Please log in again.');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        Alert.alert('Error', 'An error occurred while fetching user data.');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        // Get the token from AsyncStorage (or another secure location)
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Authentication Error', 'No token found.');
          return;
        }
        // Make the GET request to fetch doctor details with the token in the Authorization header
        const response = await axios.get(`http://${ipAddress}:5000/api/v1/doctors`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setDoctorDetails(response.data); // Assuming data is an array of doctor details
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        Alert.alert('Error', 'Could not load doctor details.');
      }
    };
    fetchDoctorDetails();
  }, []);

  const handleLocationChange = async itemValue => {
    setSelectedLocation(itemValue);
    // Save selected location to AsyncStorage
    await AsyncStorage.setItem('selectedLocation', itemValue);
  };
  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.locationContainer}>
        <View>
          <Icon name="map-marker" size={30} color={theme.primary} />
        </View>
        <View>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={handleLocationChange}
            style={[ styles.picker, {backgroundColor: theme.card, color: theme.text},
            ]}>
            <Picker.Item label="Select a location" value="" />
            {locations.map(location => (
              <Picker.Item
                key={location._id}
                label={location.cityName}
                value={location._id}
              />
            ))}
          </Picker>
        </View>
      </View>
      <Swiper
        autoplay={true}
        autoplayTimeout={4}
        style={styles.swiperContainer}
        dotColor={theme.border}
        activeDotColor={theme.primary}>
        <View style={styles.slider}>
          <Image
            source={{
              uri: 'https://thumbs.dreamstime.com/b/healthcare-concept-text-doctor-appointment-magnifying-glass-composition-tablets-photo-331928978.jpg',
            }}
            style={styles.banner}
          />
        </View>
        <View style={styles.slider}>
          <Image
            source={{
              uri: 'https://www.accuhealthlabs.com/wp-content/uploads/2021/01/800-X-502_02.jpg',
            }}
            style={styles.banner}
          />
        </View>
        <View style={styles.slider}>
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/09/87/05/18/360_F_987051862_a1Ura4TzPKFlpiSmwHwNGYlkbfkIHhwg.jpg',
            }}
            style={styles.banner}
          />
        </View>
        <View style={styles.slider}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-vector/20220520/ourmid/pngtree-personal-doctor-appointment-2d-vector-isolated-illustration-png-image_4660145.png',
            }}
            style={styles.banner}
          />
        </View>
      </Swiper>
      <View style={styles.heading}>
        <Text style={[styles.headText, {color: theme.text}]}>Top Doctors</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Find Doctors')}>
          <Text style={[styles.subText, {color: theme.primary}]}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={doctorDetails}
        renderItem={renderDoctorCard}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.doctorList}
      />
      {/* <TouchableOpacity style={styles.appointmentButton} onPress={() => navigation.navigate('My-Appointments')}>
                <Text style={styles.appointmentButtonText}>View My Appointments</Text>
            </TouchableOpacity> */}
      <Text style={[styles.headText, {color: theme.text}]}>
        We specialize in these fields
      </Text>
      <FlatList
        data={doctorsSpecializations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        // numColumns={2}
        style={styles.grid}
      />
      <View style={styles.footerCard}>
        <Text style={[styles.subText2, {color: theme.text}]}>
          Our community of doctors and patients drive us to create technologies
          for better and affordable healthcare
        </Text>
        {/* <Text style={styles.subtitle}>We are committed to providing high-quality, affordable, and accessible healthcare services.</Text> */}
        {/* <Text style={styles.subtitle}>We are a team of experienced doctors and healthcare professionals</Text> */}
        {/* <Text style={styles.subtitle}>dedicated to providing the best healthcare services to our patients.</Text> */}
        <View>
          <View style={styles.aboutContainer}>
            <View style={styles.aboutContainer1}>
              <Iconi name="person" size={30} color="#1fb1bd" />
              <Text style={[styles.subText, {color: theme.text}]}>
                Our Users
              </Text>
              <Text style={[styles.text, {color: theme.text}]}>30 Crores</Text>
            </View>
            <View style={styles.aboutContainer1}>
              <Iconi name="bag-add" size={30} color="#1fb1bd" />
              <Text style={[styles.subText, {color: theme.text}]}>
                Our Doctors
              </Text>
              <Text style={[styles.text, {color: theme.text}]}>1 Lakh</Text>
            </View>
          </View>
          <View style={styles.aboutContainer}>
            <View style={styles.aboutContainer1}>
              <Iconi name="add-circle" size={30} color="#1fb1bd" />
              <Text style={[styles.subText, {color: theme.text}]}>
                Hospitals
              </Text>
              <Text style={[styles.text, {color: theme.text}]}>20,000</Text>
            </View>
            <View style={styles.aboutContainer1}>
              <Iconi name="chatbox-ellipses" size={30} color="#1fb1bd" />
              <Text style={[styles.subText, {color: theme.text}]}>
                Patient Stories
              </Text>
              <Text style={[styles.text, {color: theme.text}]}>40 Lakh</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.subText1}>
            <Image
              source={require('../../assets/icons/logo.png')}
              style={styles.logo}
            />
            <Text style={[styles.headText, {color: theme.text}]}>
              BookMyDoc
            </Text>
          </View>
          <Text style={[styles.subText2, {color: theme.text}]}>
            Our vision is to help mankind live healthier, longer lives by making
            quality healthcare accessible, affordable and convenient
          </Text>
          <View style={styles.subText1}>
            <Text style={[styles.subText, {color: theme.text}]}>Made with</Text>
            <Iconi name="heart" size={30} color={theme.primary} />
            <Text style={[styles.subText, {color: theme.text}]}>
              in Savisettipalli
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.fab, {backgroundColor: theme.primary}]}
        onPress={toggleTheme}>
        <Icons name="brightness-6" size={30} color={theme.text} />
      </TouchableOpacity>
    </ScrollView>
  );
};


export default HomeScreen;
