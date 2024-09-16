import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import StackNavigator from './navigation/StackNavigator';
const App = () => {
  return (
   <NavigationContainer>
    <StackNavigator />
    {/* <TabNavigator /> */}
   </NavigationContainer>

  );
};

export default App;

