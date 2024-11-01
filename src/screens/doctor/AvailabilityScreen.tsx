import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { useDoctor } from '../../contexts/UserProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';

const AvailabilityScreen = () => {
    const { doctorDetails, updateDoctorDetails } = useDoctor();
    const [availability, setAvailability] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startDate = tomorrow;
    const endDate = new Date(tomorrow);

    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };
    // Sample availability data structure
    const availabilityData = [
        {
            doctorId: doctorDetails.id,
            availabilityDate: new Date('2024-10-31'), // Example date
            shifts: [
                {
                    shift: 'Morning',
                    timeSlots: [
                        { startTime: '08:00 AM', endTime: '08:30 AM', status: 'Available' },
                        { startTime: '08:30 AM', endTime: '09:00 AM', status: 'Available' },
                        { startTime: '09:00 AM', endTime: '09:30 AM', status: 'Unavailable' },
                        { startTime: '09:30 AM', endTime: '10:00 AM', status: 'Available' },
                    ],
                },
                {
                    shift: 'Afternoon',
                    timeSlots: [
                        { startTime: '01:00 PM', endTime: '01:30 PM', status: 'Available' },
                        { startTime: '01:30 PM', endTime: '02:00 PM', status: 'Available' },
                        { startTime: '02:00 PM', endTime: '02:30 PM', status: 'Unavailable' },
                        { startTime: '02:30 PM', endTime: '03:00 PM', status: 'Available' },
                    ],
                },
            ],
        },
    ];

    const toggleTimeSlotStatus = (shiftIndex, timeSlotIndex) => {
        const updatedAvailability = [...availability];
        const timeSlot = updatedAvailability[shiftIndex].timeSlots[timeSlotIndex];

        // Toggle the status
        timeSlot.status = timeSlot.status === 'Available' ? 'Unavailable' : 'Available';
        setAvailability(updatedAvailability);
    };

    const saveChanges = async () => {
        await updateDoctorDetails({ ...doctorDetails, availability });
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);
        setSelectedDate(currentDate);

        // Update availability based on selected date
        const filteredAvailability = availabilityData.filter(item => 
            item.availabilityDate.toDateString() === currentDate.toDateString()
        );

        setAvailability(filteredAvailability.length > 0 ? filteredAvailability : availabilityData);
    };

    const renderTimeSlot = ({ item, shiftIndex, timeSlotIndex }) => (
        <TouchableOpacity onPress={() => toggleTimeSlotStatus(shiftIndex, timeSlotIndex)} style={styles.timeSlotContainer}>
            <Text style={styles.timeText}>{`${item.startTime} - ${item.endTime}`}</Text>
            <Text style={styles.statusText}>{item.status}</Text>
        </TouchableOpacity>
    );

    const renderShift = ({ item, index }) => (
        <View style={styles.shiftContainer} key={`shift-${index}`}>
            <Text style={styles.shiftText}>{item.shift}</Text>
            <FlatList
                data={item.timeSlots}
                renderItem={(timeSlotProps) => renderTimeSlot({ ...timeSlotProps, shiftIndex: index })}
                keyExtractor={(timeSlot) => `${timeSlot.startTime}-${timeSlot.endTime}`}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Availability for {doctorDetails.fullName}</Text>
            
            <Button title="Select Date" onPress={() => setShowDatePicker(true)} />

            {showDatePicker && (
               <HorizontalDatepicker
               mode="gregorian"
               startDate={startDate}
               endDate={endDate}
               initialSelectedDate={startDate}
               onSelectedDateChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
               selectedItemWidth={150}
               unselectedItemWidth={38}
               itemHeight={38}
               itemRadius={20}
               // selectedItemTextStyle={styles.selectedItemTextStyle}
               // unselectedItemTextStyle={styles.selectedItemTextStyle}
               selectedItemBackgroundColor="#222831"
               unselectedItemBackgroundColor="#ececec"
               flatListContainerStyle={styles.flatListContainerStyle}
           />
            )}

            {availability.length > 0 && (
                <FlatList
                    data={availability}
                    renderItem={renderShift}
                    keyExtractor={(shift) => shift.shift}
                />
            )}

            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    shiftContainer: {
        marginBottom: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    shiftText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    timeSlotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    timeText: {
        fontSize: 16,
    },
    statusText: {
        fontSize: 16,
        color: 'green', // Change to red for unavailable
    },
    saveButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AvailabilityScreen;
