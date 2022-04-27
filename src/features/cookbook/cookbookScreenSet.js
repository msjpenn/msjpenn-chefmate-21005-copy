import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CookbookScreen from './screens/cookbookScreen';
import CookbookRecipiesScreen from './screens/cookbookRecipiesScreen';

const CookbookStack = createStackNavigator();

const CookbookScreenSet = ({ navigation }) => {
  return (
    <CookbookStack.Navigator headerMode="none" initialRouteName="CookbookScreen">
      <CookbookStack.Screen name="CookbookScreen" component={CookbookScreen} />
      <CookbookStack.Screen name="CookbookRecipesScreen" component={CookbookRecipiesScreen} />

    </CookbookStack.Navigator>
  );
};

export default CookbookScreenSet;
