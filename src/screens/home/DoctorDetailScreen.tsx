// DoctorDetailScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from './CustomHeader';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Calendar} from 'react-native-calendars';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '../../contexts/UserProvider';
import ipAddress from '../../../config/ipConfig';


const DoctorDetailScreen = ({route, navigation}) => {
  const {doctor, locationId} = route.params; // Receive doctor and location from params

  const { userDetails , updateUserDetails } = useUser();
  const [problem, setProblem] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startDate = tomorrow;
  const endDate = new Date(tomorrow);
  endDate.setDate(endDate.getDate() + 30);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 27);
  const maxDateString = maxDate.toISOString().split('T')[0]; // 30 days from today

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Appointment booked successfully',
    });
  };

  const onDayPress = (day) => {
    if (day.dateString >= minDate && day.dateString <= maxDateString) {
        setSelectedDate(day.dateString);
    }
};
const markedDates = {
    [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
};
  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          title={doctor.fullName}
          imageUri={doctor.imageUri || 'https://picsum.photos/200/300'}
          location={doctor.locationId.cityName || 'Location not available'}
          hospital={doctor.locationId }
          onBackPress={() => navigation.goBack()} // Handle back press
        />
      ),
    });
  }, [navigation, doctor, locationId]);

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const fetchTimeSlots = async () => {
        try {
          const response = await axios.get(
            `http://${ipAddress}:5000/api/v1/appointments/timeslots`,
            {
              params: {
                date: selectedDate,
                doctorId: doctor._id,
              },
            },
          );
          setTimeSlots(response.data);
        } catch (error) {
          console.error('Error fetching time slots:', error);
          Alert.alert(
            'Error',
            'Could not load time slots. Please select another date.',
          );
        } finally {
          setLoading(false);
        }
      };
      fetchTimeSlots();
    }
  }, [selectedDate, doctor]);

  const handleSubmit = async () => {
    // setLoading(true);
    if (!selectedSlotId || !slotTime) {
      Alert.alert('Error', 'Please select a time slot.');
      return;
    }

    // Prepare the appointment data
    const appointmentData = {
        doctorId: doctor._id,
        date: selectedDate,
        slotTime: slotTime,
        slotId: selectedSlotId,
        problem: problem,
        symptoms: symptoms,
        userId: userDetails.id,
        locationId : locationId,
    };
    try {
        // Send the appointment data to your backend API
        const response1 = await axios.get(`http://${ipAddress}:5000/api/v1/appointments/check`, {
            params: {
                doctorId: doctor._id,
                date: selectedDate,
                slotId: selectedSlotId,
            },
        });

        if (response1.data.isAvailable === false) {
            Alert.alert('Error', 'The selected time slot is no longer available. Please choose another slot.');
            return;
        }
      const response = await axios.post(
        `http://${ipAddress}:5000/api/v1/appointments/book`,
        appointmentData,
      );
      if (response.status === 201) {
        showToast();
        navigation.navigate('My-Appointments'); // Navigate back after booking
      } else {
        Alert.alert('Error', 'Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert(
        'Error',
        'An error occurred while booking the appointment. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book At Your Convenience</Text>

      {/* <HorizontalDatepicker
                mode="gregorian"
                startDate={startDate}
                endDate={endDate}
                onSelectedDateChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
                selectedItemWidth={150}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={20}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            /> */}
      <TouchableOpacity
        onPress={handleShowCalendar}
        style={{
          flexDirection: 'row',
          margin: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: 20,
          height: 40,
          borderColor: '#00634B',
          borderWidth: 1,
          borderRadius: 6,
          paddingHorizontal: 15,
        }}>
        {showCalendar ? (
          <>
            <Text style={{color: '#00634B'}}>Hide Calendar   ({selectedDate})</Text>
            <MaterialIcons name="close" size={21} color="#00634B" />
          </>
        ) : (
          <>
            <Text style={{color: '#00634B'}}>Show Calendar</Text>
            <Fontisto name="date" size={20} color="#00634B" />
          </>
        )}
      </TouchableOpacity>

      {showCalendar ? (
        <View style={styles.calendarContainer}>
          <View style={styles.calendarWrapper}>
            <Calendar
              style={styles.calendar}
              current={selectedDate || minDate}
              minDate={minDate}
              maxDate={maxDateString}
              monthFormat={'yyyy MM'}
              hideArrows={false}
              disableAllTouchEventsForDisabledDays={true}
              enableSwipeMonths={true}
              markedDates={markedDates}
              onDayPress={onDayPress}
            />
          {/* <Text>Selected Date: {selectedDate}</Text> */}
          </View>
        </View>
      ) : null}

      <Text style={styles.timing}>Select Time Slot:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : timeSlots.length === 0 ? (
        <Text>No time slots available</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}>
          {timeSlots.map(item => (
            <Pressable
              key={item._id}
              onPress={() => {
                setSelectedSlotId(item._id);
                setSlotTime(item.startTime);
              }}
              style={{
                margin: 10,
                height: 50,
                borderRadius: 7,
                padding: 15,
                borderColor: selectedSlotId === item._id ? 'red' : 'gray',
                borderWidth: 0.7,
              }}>
              <Text>{item.startTime}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
 <TextInput
                style={styles.input}
                placeholder="Problem"
                value={problem}
                onChangeText={setProblem}
            />

            <TextInput
                style={styles.input}
                placeholder="Symptoms Identified"
                value={symptoms}
                onChangeText={setSymptoms}
            />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10,
    paddingHorizontal: 20,
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E3A47',
  },
  timing: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
  },
  flatListContainerStyle: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  scroll: {
    maxHeight: 100,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
},
calendarWrapper: {
    width: '100%',
    alignItems: 'center',
},
calendar: {
    width: 380,
    borderRadius: 10,
},
input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
},
});

export default DoctorDetailScreen;
