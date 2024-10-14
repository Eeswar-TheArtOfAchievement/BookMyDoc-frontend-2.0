import { StyleSheet, Text, View ,Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get('window');
import Swiper from'react-native-swiper';
const WelcomeScreen = ({navigation}) => {
  return (
    <>
    {/* <View style={styles.container}>
        <Image
            source={{uri:'https://img.freepik.com/premium-photo/portrait-happy-women-doctor_1030147-9772.jpg?w=740'}} // Update this path to your image
            style={styles.logo}
            />
    </View> */}
    <View style={styles.container}>
            <Swiper autoplay={true} autoplayTimeout={4}
            dotColor="#ccc" activeDotColor="red"
            >
              <View style={styles.slider}>
                <Image source={{uri:'https://img.freepik.com/premium-photo/portrait-happy-women-doctor_1030147-9772.jpg?w=740'}} style={styles.logo} />
              </View>
              <View style={styles.slider}>
                <Image source={{uri:'https://img.freepik.com/free-photo/portrait-doctor_144627-39387.jpg?w=740&t=st=1728302653~exp=1728303253~hmac=2d77046e5551c409eed96c0226503143fa94c10fcfc462516d89a8ea19e2b3b2'}} style={styles.logo} />
              </View>
              <View style={styles.slider}>
                <Image source={{uri:'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=740&t=st=1728304642~exp=1728305242~hmac=3a67bdf6d8fc892d105c190109c214196abf3e0a84e6973c00ad31a64f6b0d69'}} style={styles.logo} />
              </View>
              <View style={styles.slider}>
                <Image source={{uri:'https://img.freepik.com/free-photo/portrait-smiling-young-female-nurse-sitting-sofa_23-2147861652.jpg?w=740&t=st=1728304715~exp=1728305315~hmac=d8ac852819df96e62f57746b5ce502d38d8840c80504ca20e69985d770b08ba1'}} style={styles.logo} />
              </View>
            </Swiper>
          </View>
        <View style={styles.container2}>
            <Text style={styles.headText}>Find Healthcare Providers</Text>
            <Text style={styles.text}>Search for  doctors,book appointments & view history. Stay healthy! </Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.agreeButton} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.joinButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.agreeButton} onPress={()=>navigation.navigate('SignUp')}>
                <Text style={styles.joinButtonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    logo: {
        width: width * 1, // Responsive width
        height: height * 1, // Responsive height
        resizeMode: 'cover', // Adjust to fit the image
    },
    container2:{
        borderTopRightRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for the overlay
    },
    slider:{
        flex:1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for the overlay

    },
    headText:{
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        paddingHorizontal:10,
    },
    text:{
        fontSize: 20,
        fontWeight:'condensedBold',
        paddingHorizontal:15,
    },
    buttonContainer:{
        flexDirection:'row',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for the overlay
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        justifyContent:'space-around',
    },
    agreeButton: {
        width:'40%',
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
});
