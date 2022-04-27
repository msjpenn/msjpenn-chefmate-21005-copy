import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FriendProfileScreen from './screens/FriendProfileScreen';


const FriendProfileStack = createStackNavigator();

const screenOptions = {
    headerStyle: { backgroundColor: "#61BAAC" },
    headerTintColor: '#fff',
  };

const FriendProfileScreenSet = ()=>{
    return <FriendProfileStack.Navigator headerMode="none" initialRouteName="FriendProfileScreen">
        <FriendProfileStack.Screen name = "FriendProfileScreen" component={FriendProfileScreen}/>
    </FriendProfileStack.Navigator>
}

export default FriendProfileScreenSet;