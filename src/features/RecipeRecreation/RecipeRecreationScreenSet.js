import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecreateUploadOptionsScreen from "./screens/recreateUploadOptionsScreen";
import RecreateUploadResultScreen from "./screens/recreateUploadResultScreen";
import RecreateAddRatingScreen from "./screens/recreateAddRatingScreen";
import RecreateSuccessScreen from "./screens/recreateSuccessScreen";
import RecreactionAddIngredientSectionScreen from "./screens/recreactionAddIngredientSection";
import RecreationAddInstructionsSection from "./screens/recreationAddInstructionsSection";
import RecreateConfirmationScreen from "./screens/recreateConfirmation";

import RecreateFinalStepOne from "./screens/recreateFinalStepOne";
import RecreateFinalStepTwo from "./screens/recreateFinalStepTwo";
import RecreateWithoutEditScreen from "./screens/recreateWithoutEditScreen";
import * as AppStyles from "../../config/appStyles";
import { Alert, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { doneRecipe } from "../../store/recipeCreation/actions";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

const RecipeRecreationStack = createStackNavigator();

const CancelBtn = ({ onCancel }) => {
  return (
    <TouchableOpacity onPress={onCancel}>
      <Text
        style={{
          color: "#fff",
          marginRight: 10,
          fontFamily: "Nunito",
          fontSize: 14,
        }}
      >
        CANCEL
      </Text>
    </TouchableOpacity>
  );
};

const HeaderLeft = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ paddingLeft: 10 }}
    >
      <MCIcon size={24} name="keyboard-backspace" color="white" />
    </TouchableOpacity>
  );
};

const RecipeRecreationScreenSet = ({ navigation }) => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const onCancel = () => {
    Alert.alert("Cancel Adding Recipe", "Changes you made may not be saved.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(doneRecipe(""));
          //nav.navigate("FeedScreen");
          nav.reset({ index: 0, routes: [{ name: "Home" }] });
        },
      },
    ]);
  };

  const handleBack = () => {
    nav.goBack();
  };

  return (
    <RecipeRecreationStack.Navigator
      headerMode="float"
      initialRouteName="RecreateUploadOptionsScreen"
    >
      <RecipeRecreationStack.Screen
        name="RecreateUploadOptionsScreen"
        component={RecreateUploadOptionsScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Recreate Recipe",
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        })}
      />
      <RecipeRecreationStack.Screen
        name="RecreateConfirmationScreen"
        component={RecreateConfirmationScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Recreate Recipe",
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        })}
      />
      <RecipeRecreationStack.Screen
        name="RecreateUploadResultScreen"
        component={RecreateUploadResultScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Recreate Recipe",
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        })}
      />
      <RecipeRecreationStack.Screen
        name="RecreactionAddIngredientSectionScreen"
        component={RecreactionAddIngredientSectionScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Recreate Recipe",
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        })}
      />
      <RecipeRecreationStack.Screen
        name="RecreationAddInstructionsSection"
        component={RecreationAddInstructionsSection}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Recreate Recipe",
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        })}
      />

      <RecipeRecreationStack.Screen
        name="RecreateFinalStepOne"
        component={RecreateFinalStepOne}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Recreate Recipe",
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        })}
      />

      <RecipeRecreationStack.Screen
        name="RecreateFinalStepTwo"
        component={RecreateFinalStepTwo}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{
          title: "Recreate Recipe",
          headerLeft: () => {},
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        }}
      />
      <RecipeRecreationStack.Screen
        name="RecreateAddRatingScreen"
        component={RecreateAddRatingScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{
          title: "Recreate Recipe",
          headerLeft: () => {},
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        }}
      />
      <RecipeRecreationStack.Screen
        name="RecreateSuccessScreen"
        component={RecreateSuccessScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{ headerShown: false }}
      />

      <RecipeRecreationStack.Screen
        name="RecreateWithoutEditScreen"
        component={RecreateWithoutEditScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{
          title: "Recreate Recipe",
          headerLeft: () => {},
          headerRight: () => <CancelBtn onCancel={onCancel} />,
          headerStyle: {
            backgroundColor: AppStyles.headerBackgroundColor,
            borderBottomColor: AppStyles.headerBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "center" },
          shadowColor: "transparent",
        }}
      />
    </RecipeRecreationStack.Navigator>
  );
};

export default RecipeRecreationScreenSet;
