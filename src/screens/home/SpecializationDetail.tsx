import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const SpecializationDetail = ({ navigation ,route }) => {
  const { item } = route.params; // Get specialization data from navigation

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailContainer}>
        {/* Specialization Image */}
        <Image source={item.image} style={styles.specializationImage} />

        {/* Specialization Name */}
        <Text style={styles.specializationName}>{item.name}</Text>

        {/* Specialization Description */}
        <Text style={styles.specializationDescription}>
          {item.description || 'This is a detailed description of the specialization. More information about the specialization can be added here.'}
        </Text>

        {/* Common Conditions Treated */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Common Conditions Treated:</Text>
          <Text style={styles.sectionContent}>
            {item.conditions || 'Conditions related to this specialization include heart disease, high blood pressure, stroke, etc.'}
          </Text>
        </View>

        {/* Benefits of Seeing a Specialist */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Benefits of Seeing a Specialist:</Text>
          <Text style={styles.sectionContent}>
            Seeing a specialist in this field can provide you with personalized care, advanced treatment options, and expertise in managing conditions related to this area of health.
          </Text>
        </View>
        <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Book-Appointment')}>
        <Text style={styles.linkText}>Book Appointment Now
        </Text>
        <Icon name="arrow-forward-outline" size={24} color="#000000" />

      </TouchableOpacity>
        {/* Frequently Asked Questions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions:</Text>
          <Text style={styles.faqQuestion}>Q: How do I know if I need to see a {item.name}?</Text>
          <Text style={styles.faqAnswer}>A: If you're experiencing symptoms related to {item.name}, such as [list of symptoms], it's best to consult with a specialist.</Text>

          <Text style={styles.faqQuestion}>Q: What should I expect during my first visit?</Text>
          <Text style={styles.faqAnswer}>A: Your first visit may involve a comprehensive evaluation, including [list of possible tests or procedures].</Text>
        </View>

        {/* Related Procedures or Treatments */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Related Procedures/Treatments:</Text>
          <Text style={styles.sectionContent}>
            Some common procedures in this field include [list of related treatments or procedures].
          </Text>
        </View>

        {/* Testimonials/Success Stories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Patient Testimonials:</Text>
          <Text style={styles.sectionContent}>
            "Thanks to the expert care of a {item.name}, I am now living a healthier and more active life!" — Patient X
          </Text>
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
  detailContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  specializationImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  specializationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3A47',
    marginBottom: 10,
  },
  link: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  backText: {
    fontSize: 24,
    color: '#fff',
},
  specializationDescription: {
    fontSize: 16,
    color: '#7D8CA3',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3A47',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#7D8CA3',
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E3A47',
    marginTop: 10,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#7D8CA3',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});

export default SpecializationDetail;
