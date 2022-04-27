import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditUsernameScreen from './screens/editUsernameScreen';
import EditPhoneScreen from './screens/editPhoneScreen';
import EditFoodCategoryScreen from './screens/editFoodCategoryScreen';
import EditMeasurementSystemScreen from './screens/editMeasurementSystemScreen';
import SyncContactOptionScreen from './screens/syncContactOptionScreen';
import AccountCreationGreetingScreen from './screens/accountCreationGreetingScreen';
import HomeScreenSet from '../home/homeScreenSet';

const ProfileStack = createStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: "#61BAAC" },
  headerTintColor: '#fff',
};

const ProfileScreenSet = ({ navigation }) => {
  return (
    <ProfileStack.Navigator /*screenOptions={screenOptions}*/ headerMode="none" initialRouteName="EditUsernameScreen">
      <ProfileStack.Screen name="EditUsernameScreen" component={EditUsernameScreen} />
      <ProfileStack.Screen name="EditPhoneScreen" component={EditPhoneScreen} />
      <ProfileStack.Screen name="EditFoodCategoryScreen" component={EditFoodCategoryScreen} /> 
      <ProfileStack.Screen name="EditMeasurementSystemScreen" component={EditMeasurementSystemScreen} />
      <ProfileStack.Screen name="SyncContactOptionScreen" component={SyncContactOptionScreen} />
      <ProfileStack.Screen name="AccountCreationGreetingScreen" component={AccountCreationGreetingScreen} />
    
      <ProfileStack.Screen name="HomeScreenSet" component={HomeScreenSet} />
    </ProfileStack.Navigator>
  );
};

export default ProfileScreenSet;
