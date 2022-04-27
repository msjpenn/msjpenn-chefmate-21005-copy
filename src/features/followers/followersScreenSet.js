import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FollowerListScreen from "./screens/FollowerListScreen";

const FollowerStack = createStackNavigator();

const screenOptions = {
    headerStyle: { backgroundColor: "#61BAAC" },
    headerTintColor: '#fff',
  };

const FollowerScreenSet = ()=>{
    return <FollowerStack.Navigator headerMode="none" initialRouteName="FollowerListScreen">
        <FollowerStack.Screen name = "FollowerListScreen" component={FollowerListScreen}/>
    </FollowerStack.Navigator>
}

export default FollowerScreenSet;