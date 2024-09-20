import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const DisclosureScreen = ({navigation}) => {
  return (
    <>
    <View style={styles.greenContainer}>
      <View >
        <Text style={styles.headerText}>Prominent Disclosure & User Content</Text>
      </View>
      <View>
        <Text>
          BookMyDoc app needs certain permissions to provide health services like connecting you with our expert doctors, providing lab/diagnostic services, and providing you with medicine delivery.
          Below Permissions help us to serve you better
        </Text>
      </View>
    </View>
    <View style={styles.hr} />
    <ScrollView>
      <View  style={styles.container}>
        <Text style={styles.headerText}>Location</Text>
        <Text style={styles.text}>It is recommended that pou set your location sharing 'Always' as it will help us to show you location specific data like availability of medicines, Lab tests, Connect you to doctors available in your region. You can change this anytime later. </Text>
        <Text style={styles.headerText}>Camera</Text>
        <View  style={styles.numberList}>
          <Text>1.</Text>
        <Text style={styles.paddingRight}>To allow you to take a photo of prescriptions & directly upload it to the app.</Text>
        </View>
        <View style={styles.numberList}>
          <Text>2.</Text>
        <Text style={styles.paddingRight}>To do Audio and Video Consultation with our expert doctors.</Text>
        </View>
        <View style={styles.numberList}>
          <Text>3.</Text>
        <Text style={[styles.text,styles.paddingRight]}>To upload required documents while booking lab tests, medicines.</Text>
        </View>
        <Text style={styles.headerText}>Images/Photos/Media/Files</Text>
        <View  style={styles.numberList}>
          <Text>1.</Text>
          <Text style={styles.paddingRight}>Images/Photos/Files permission is needed to upload medical prescriptions when the user is availing BookMyDoc Services.</Text>
          </View>
        <View style={styles.numberList}>
          <Text>2.</Text>
          <Text style={[styles.text,styles.paddingRight]}>To Download & Store the Medical Prescriptions, Lab Reports, Doctor Appointment Letters when the user is availing BookMyDoc services.</Text>
          </View>
        <Text style={styles.headerText}>Storage</Text>
        <Text style={styles.text}>To show/access your vaccination files uploaded by you/lab test records/prescriptions in your phone.</Text>
        <Text style={styles.headerText}>SMS</Text>
        <Text style={styles.text}>To support automatic OTP confirmation, so that you don't have to enter the authentication code manually</Text>
        <Text style={styles.headerText}>Receive SMS</Text>
        <Text style={styles.text}>This helps us to send you reminders, order status booking reminders related SMS</Text>
        <Text style={styles.headerText}>Access Wifi State</Text>
        <Text style={styles.text}>This helps us to optimize your experience based on the Wifi's strength and signals, especially for optimizing vide consultations</Text>
        <Text style={styles.headerText}>Record Consultation</Text>
        <Text style={styles.text}>Required to record consultation in all forms of communication including but not limited to audio calls, video calls, and that history of doctor consultations</Text>
        <Text style={styles.headerText}>Phone, Microphone</Text>
        <Text style={styles.text}>To call our health expert and connect with our expert doctors Activity Recognition.</Text>
        <Text style={styles.headerText}>Activity Recognition</Text>
        <Text style={styles.text}>To help you track/view/access your fitness information like step count, sleep via wearable devices or using capability available in your mobile.</Text>
        <Text style={styles.headerText}>Nearby Bluetooth</Text>
        <Text style={styles.text}>To provide a seamless experience while the user is taking an online video consultation by redirecting audio to a Bluetooth headset if the user has already paired or auto-connected with their mobile.</Text>
        <Text style={styles.headerText}>Notifications</Text>
        <Text style={styles.text}>This will enable us to send you alerts about your order status, notify you about the doctor's response, and send video call notifications during an online consultation.</Text>
      </View>
    </ScrollView>
    <View style={styles.hr} />
    <View style={styles.terms}>
      <Text>You can change any of the above permissions anytime later. Please provide your acceptance to <Text style={styles.links} onPress={()=> navigation.navigate('TermsConditions')}>Terms and conditions</Text> and <Text style={styles.links} onPress={()=> navigation.navigate('PrivacyPolicy')}>Privacy Policy </Text> by clicking on 'I Agree'</Text>
    </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.agreeButton} onPress={()=>navigation.navigate('Welcome')}>
         <Text style={styles.joinButtonText}>I Agree</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  paddingRight:{
    paddingRight:20,
  },
  greenContainer:{
    margin:7,
    backgroundColor: '#CCE4CC',
    padding: 10,
    color:'#000',
    borderRadius:8,
  },
  headerText:{
    fontWeight:'bold',
  },
  hr: {
    height: 1,                // Height of the line
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Color of the line
  },
  terms:{
    paddingHorizontal:10,
  },
  container: {
    backgroundColor: '#f5f5f5',
    padding:13,
  },
  text:{
    marginBottom:10,
  },
  photoContainer: {
    flex: 1,
    width: '100%',
  },
  photo: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  agreeButton: {
    backgroundColor: '#1878F1',
    paddingVertical: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  numberList:{
    flexDirection:'row',
    },
  links:{
    color:'#1878F1',
    textDecorationLine:'underline',
  },
});

export default DisclosureScreen;
