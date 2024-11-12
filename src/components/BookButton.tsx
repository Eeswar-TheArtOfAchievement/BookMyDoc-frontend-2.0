import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BookButton = () => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  return (
    <TouchableOpacity
      style={[styles.button, pressed && styles.buttonPressed]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>Apply Now</Text>
      <View>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={[styles.icon, pressed && styles.iconPressed]}>
        <Path
          clipRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
          fillRule="evenodd"
        />
      </Svg>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(0, 107, 179)',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
    gap: 10,
    fontWeight: 'bold',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    fontSize: 15,
    elevation: 10, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonPressed: {
    transform: [{ scale: 1.05 }],
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  iconPressed: {
    transform: [{ translateX: 4 }],
  },
});

export default BookButton;
