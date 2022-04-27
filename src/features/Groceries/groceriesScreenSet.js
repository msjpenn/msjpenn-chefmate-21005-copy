import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GroceryList from './screen/GroceriesList';
import GroceriesItemDetail from "./screen/GroceriesItemDetail";

const GroceryStack = createStackNavigator();

const screenOptions = {
    headerStyle: { backgroundColor: "#61BAAC" },
    headerTintColor: '#fff',
  };

const GroceriesScreenSet = ()=>{
    return <GroceryStack.Navigator headerMode="none" initialRouteName="GroceryList">
        <GroceryStack.Screen name = "GroceryList" component={GroceryList}/>
        <GroceryStack.Screen name = "GroceriesItemDetail" component={GroceriesItemDetail}/>
    </GroceryStack.Navigator>
}

export default GroceriesScreenSet;