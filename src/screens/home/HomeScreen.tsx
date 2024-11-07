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
import {FlatList} from 'react-native-gesture-handler';
import Iconi from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import ipAddress from '../../../config/ipConfig';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
const HomeScreen = ({navigation}) => {
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
        const response = await axios.get(
          `http://${ipAddress}:5000/api/v1/doctors/locations`,
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
      image: require('../../assets/Cardiologist.png'),
      description: 'A cardiologist specializes in diagnosing and treating heart conditions. They handle diseases related to the heart and blood vessels.',
      conditions: 'Heart disease, hypertension, arrhythmias, heart attack, coronary artery disease, heart failure, high cholesterol, stroke.',
    },
    {
      id: '2',
      name: 'Dermatologist',
      image: require('../../assets/Dermatologist.png'),
      description: 'A dermatologist is a doctor who specializes in the diagnosis and treatment of skin disorders, hair, and nail problems.',
      conditions: 'Acne, eczema, psoriasis, rosacea, skin cancer, rashes, dandruff, fungal infections, nail disorders.',
    },
    {
      id: '3',
      name: 'Pediatrician',
      image: require('../../assets/Pediatrician.png'),
      description: 'A pediatrician specializes in the care of infants, children, and adolescents. They manage physical, behavioral, and developmental concerns.',
      conditions: 'Common cold, asthma, ADHD, childhood obesity, developmental delays, allergies, immunizations, infections.',
    },
    {
      id: '4',
      name: 'Orthopedic',
      image: require('../../assets/Orthopedic.png'),
      description: 'An orthopedic surgeon treats injuries and disorders of the musculoskeletal system, including bones, joints, muscles, and ligaments.',
      conditions: 'Fractures, arthritis, back pain, osteoporosis, sports injuries, joint replacement, tendonitis, scoliosis, carpal tunnel syndrome.',
    },
    {
      id: '5',
      name: 'Neurologist',
      image: require('../../assets/Neurologist.png'),
      description: 'A neurologist diagnoses and treats disorders of the brain, spinal cord, nerves, and muscles, including conditions related to the nervous system.',
      conditions: 'Migraine, epilepsy, Parkinson\'s disease, multiple sclerosis, Alzheimer\'s disease, stroke, nerve disorders, neuropathy.',
    },
    {
      id: '6',
      name: 'Oncologist',
      image: require('../../assets/Oncologist.png'),
      description: 'An oncologist specializes in the diagnosis and treatment of cancer. They provide chemotherapy, radiation therapy, and manage the care of cancer patients.',
      conditions: 'Breast cancer, lung cancer, prostate cancer, leukemia, lymphoma, colon cancer, skin cancer, brain cancer, cancer metastasis.',
    },
    {
      id: '7',
      name: 'Gastroenterologist',
      image: require('../../assets/Gastroenterologist.png'),
      description: 'A gastroenterologist treats disorders related to the digestive system, including the stomach, intestines, liver, and pancreas.',
      conditions: 'Acid reflux, irritable bowel syndrome (IBS), Crohn\'s disease, ulcerative colitis, celiac disease, hepatitis, gallstones, pancreatitis.',
    },
    {
      id: '8',
      name: 'Psychiatrist',
      image: require('../../assets/Psychiatrist.png'),
      description: 'A psychiatrist is a medical doctor who specializes in diagnosing and treating mental health disorders, including emotional, behavioral, and cognitive issues.',
      conditions: 'Depression, anxiety, schizophrenia, bipolar disorder, OCD, PTSD, eating disorders, ADHD, substance abuse, insomnia.',
    },
    {
      id: '9',
      name: 'Ophthalmologist',
      image: require('../../assets/Ophthalmologist.png'),
      description: 'An ophthalmologist is a medical doctor specializing in the diagnosis and treatment of eye diseases and vision care. They also perform eye surgeries.',
      conditions: 'Glaucoma, cataracts, macular degeneration, diabetic retinopathy, eye infections, astigmatism, eye injuries, dry eyes.',
    },
    {
      id: '10',
      name: 'Endocrinologist',
      image: require('../../assets/Endocrinologist.png'),
      description: 'An endocrinologist focuses on hormone-related diseases and conditions. They treat disorders of the endocrine glands such as thyroid, pancreas, and adrenal glands.',
      conditions: 'Diabetes, hypothyroidism, hyperthyroidism, adrenal disorders, polycystic ovary syndrome (PCOS), osteoporosis, metabolic syndrome.',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SpecializationDetail', {item: item})}
      >
        <Image source={item.image} style={styles.image1} />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

console.log('hii', doctorDetails);
  const renderDoctorCard = ({item}) => (
    <View style={styles.doctorCard}>
      <Image
        source={{uri: 'https://picsum.photos/200/300'}}
        style={styles.image}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.doctorName}>{item.fullName}</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.doctorSpecialty}>
          {item.specializations[0]?.specializationName || 'No Specialization'}
        </Text>
        <Text style={styles.doctorSpecialty}> ⭐{item.rating} </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DoctorDetail', { doctor: item , locationId: item.locationId._id})}
        >
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
    fetch(`http://${ipAddress}:5000/api/v1/doctors`) // Adjust the endpoint as necessary
      .then(response => response.json())
      .then(data => {
        setDoctorDetails(data); // Assuming data is an array of location objects
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        Alert.alert('Error', 'Could not load locations.');
      });
  }, []);
  const handleLocationChange = async itemValue => {
    setSelectedLocation(itemValue);
    // Save selected location to AsyncStorage
    await AsyncStorage.setItem('selectedLocation', itemValue);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.locationContainer}>
        <View>
          <Icon name="map-marker" size={30} color="#007bff" />
        </View>
        <View>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={handleLocationChange}
            style={styles.picker}>
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
        dotColor="#ccc"
        activeDotColor="red">
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
        <Text style={styles.headText}>Top Doctors</Text>
        <TouchableOpacity
        // style={styles.button}
        onPress={() => navigation.navigate('Find Doctors')}
        >
        <Text style={styles.subText}>See All</Text>
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
      <Text style={styles.headText}>We specialize in these fields</Text>
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
        <Text style={styles.subText2}>
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
              <Text style={styles.subText}>Our Users</Text>
              <Text style={styles.text}>30 Crores</Text>
            </View>
            <View style={styles.aboutContainer1}>
              <Iconi name="bag-add" size={30} color="#1fb1bd" />
              <Text style={styles.subText}>Our Doctors</Text>
              <Text style={styles.text}>1 Lakh</Text>
            </View>
          </View>
          <View style={styles.aboutContainer}>
            <View style={styles.aboutContainer1}>
              <Iconi name="add-circle" size={30} color="#1fb1bd" />
              <Text style={styles.subText}>Hospitals</Text>
              <Text style={styles.text}>20,000</Text>
            </View>
            <View style={styles.aboutContainer1}>
              <Iconi name="chatbox-ellipses" size={30} color="#1fb1bd" />
              <Text style={styles.subText}>Patient Stories</Text>
              <Text style={styles.text}>40 Lakh</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.subText1}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.headText}>&nbsp;BookMyDoc</Text>
          </View>
          <Text style={styles.subText2}>
            Our vision is to help mankind live healthier, longer lives by making
            quality healthcare accessible, affordable and convenient
          </Text>
          <View style={styles.subText1}>
            <Text style={styles.subText}>Made with</Text>
            <Iconi name="heart" size={30} color="#1fb1bd" />
            <Text style={styles.subText}>in Savisettipalli</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  swiperContainer: {
    height: 250,
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#f7f9fc',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  slider: {
    flex: 1,
    borderRadius: 20,
  },
  grid: {
    flex: 0,
    flexDirection: 'row',
    // padding: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  image1: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 30,
    width: 30,
  },
  text: {
    fontSize: 20,
    color: '#7D8CA3',
    marginBottom: 20,
  },

  footerCard: {
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: '#',
  },
  aboutContainer: {
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  aboutContainer1: {
    width: '53%',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E3A47',
  },
  subText: {
    fontSize: 16,
    color: 'black',
  },
  subText2: {
    fontSize: 24,
    color: 'black',
  },
  subText1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2E3A47',
  },
  subtitle: {
    fontSize: 17,
    color: '#7D8CA3',
    marginBottom: 20,
  },
  doctorList: {},
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  doctorCard: {
    marginBottom: 20,
    height: 240,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    elevation: 3,
    width: 155,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E3A47',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#7D8CA3',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  appointmentButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  appointmentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
