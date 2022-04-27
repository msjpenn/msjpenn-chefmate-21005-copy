import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/homeScreen';

const HomeStack = createStackNavigator();

const HomeScreenSet = ({ navigation }) => {
  return (
    <HomeStack.Navigator headerMode="none" initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />

    </HomeStack.Navigator>
  );
};

export default HomeScreenSet;
