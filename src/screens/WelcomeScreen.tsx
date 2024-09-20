import { StyleSheet, Text, View ,Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  return (
    <>
    <View style={styles.container}>
        <Image
            source={{uri:'https://img.freepik.com/premium-photo/portrait-happy-women-doctor_1030147-9772.jpg?w=740'}} // Update this path to your image
            style={styles.logo}
            />
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
                <Text style={styles.joinButtonText}>SignUp</Text>
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
