import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Define your theme colors
const lightTheme = {
  primary: '#1878F1',
  background: '#FFFFFF',
  card: '#F5F5F5',
  text: '#000000',
  border: '#E0E0E0',
  notification: '#FF3B30',
  white :"white",
};

const darkTheme = {
  primary: '#2196F3',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  border: '#2C2C2C',
  notification: '#FF453A',
};

// Create context with default value
const ThemeContext = createContext({
  theme: lightTheme,
  isDarkMode: false,
  toggleTheme: () => {},
});

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  // Load saved theme preference on initial render
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme);
          setIsDarkMode(parsedTheme.isDarkMode);
          setTheme(parsedTheme.isDarkMode ? darkTheme : lightTheme);
        } else {
          const isDark = deviceColorScheme === 'dark';
          setIsDarkMode(isDark);
          setTheme(isDark ? darkTheme : lightTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from AsyncStorage', error);
      }
    };

    loadTheme();
  }, [deviceColorScheme]);

  // Toggle the theme and save to AsyncStorage
  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setTheme(newMode ? darkTheme : lightTheme);

    // Save the theme preference to AsyncStorage
    try {
      await AsyncStorage.setItem('theme', JSON.stringify({ isDarkMode: newMode }));
    } catch (error) {
      console.error('Failed to save theme to AsyncStorage', error);
    }
  };

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
