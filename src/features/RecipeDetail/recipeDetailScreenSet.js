import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetailScreen from "./screens/recipeDetailScreen";
import CommentsListScreen from "./screens/commentsListScreen";
import ShareScreen from "./screens/shareScreen";
import * as AppStyles from "../../config/appStyles";
import { View } from "react-native";

const RecipeDetailStack = createStackNavigator();

const RecipeDetailScreenSet = ({ navigation }) => {
  return (
    <RecipeDetailStack.Navigator
      headerMode="float"
      initialRouteName="RecipeDetailScreen"
    >
      <RecipeDetailStack.Screen
        name="RecipeDetailScreen"
        component={RecipeDetailScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{ headerShown: false }}
      />
      <RecipeDetailStack.Screen
        name="CommentsListScreen"
        component={CommentsListScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{ headerShown: false }}
      />
      <RecipeDetailStack.Screen
        name="ShareScreen"
        component={ShareScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{ headerShown: false }}
      />
    </RecipeDetailStack.Navigator>
  );
};

export default RecipeDetailScreenSet;
