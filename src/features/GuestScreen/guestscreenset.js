import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text } from "react-native";

import * as AppStyles from "../../components/appStyles";
import LoginOptionsScreen from "./screens/loginOptionsScreen";
import EmailRegistrationScreen from "./screens/emailRegistrationScreen";
import EmailLoginScreen from "./screens/emailLoginScreen";
import ProfileScreenSet from "../profile/profileScreenSet";
import TermsScreen from "./screens/termsScreen";
import ForgotPasswordScreen from "./screens/forgotPasswordScreen";
import AddRecipeSet from "../RecipeCreationScreen/recipeCreationNavigatorSet";
import HomeScreenSet from "../home/homeScreenSet";
import FeedScreenSet from "../feed/feedScreenSet";
import SendEmailSuccessScreen from "./screens/sendEmailSuccessScreen";

const GuestStack = createStackNavigator();

const GuestScreenSet = ({ navigation }) => {
  return (
    <GuestStack.Navigator
      headerMode="none"
      initialRouteName="LoginOptionsScreen"
    >
      <GuestStack.Screen
        name="LoginOptionsScreen"
        component={LoginOptionsScreen}
      />
      <GuestStack.Screen name="EmailLoginScreen" component={EmailLoginScreen} />
      <GuestStack.Screen
        name="EmailRegistrationScreen"
        component={EmailRegistrationScreen}
      />
      <GuestStack.Screen name="TermsScreen" component={TermsScreen} />
      <GuestStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <GuestStack.Screen
        name="SendEmailSuccessScreen"
        component={SendEmailSuccessScreen}
      />

      <GuestStack.Screen name="ProfileScreenSet" component={ProfileScreenSet} />
      <GuestStack.Screen name="AddRecipeSet" component={AddRecipeSet} />

      <GuestStack.Screen name="HomeScreenSet" component={HomeScreenSet} />
      <GuestStack.Screen name="FeedScreenSet" component={FeedScreenSet} />
    </GuestStack.Navigator>
  );
};

export default GuestScreenSet;
