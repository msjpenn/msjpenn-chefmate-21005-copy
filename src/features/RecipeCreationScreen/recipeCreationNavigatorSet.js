import React from "react";
import { Text, TouchableOpacity, Alert, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AddRecipeHomeScreen from "./screens/addRecipeHomeScreen";
import * as AppStyles from "../../config/appStyles";
import ChooseAddRecipeOptionsStep from "./screens/chooseAddRecipeOptionsStep";
import AddTitleScreen from "./screens/addTitleScreen";
import AddByURLScreen from "./screens/addByURLScreen";
import AddByURLPreviewScreen from "./screens/addByURLPreviewScreen";
import FinalStepOne from "./screens/finalStepOne";
import FinalStepTwo from "./screens/finalStepTwo";
import FinalStepThree from "./screens/finalStepThree";
import AddByPictureHomeScreen from "./screens/addByPictureHomeScreen";
import AddByPhotoScreenTwo from "./screens/addByPhotoScreenTwo";
import AddRecipeManuallyDescription from "./screens/addRecipeManuallyDescription";
import PhotoScreen from "./screens/photoScreen";
import RecordTitle from "./screens/recordTitleScreen";
import AddIngredientSection from "./screens/addIngredientSection";
import AddInstructionsSection from "./screens/addInstructionsSection";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { doneRecipe } from "../../store/recipeCreation/actions";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

const RecipeCreationStack = createStackNavigator();

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

const RecipeCreationNavigatorSet = ({ navigation }) => {
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

  return (
    //   AddRecipeHomeScreen was initial
    <RecipeCreationStack.Navigator
      headerMode="float"
      initialRouteName="AddRecipeHomeScreen"
    >
      {/* RecordTitle */}
      <RecipeCreationStack.Screen
        name="RecordTitle"
        component={RecordTitle}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
      {/* PhotoScreen */}
      <RecipeCreationStack.Screen
        name="PhotoScreen"
        component={PhotoScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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

      {/* AddRecipeManuallyDescription */}
      <RecipeCreationStack.Screen
        name="AddRecipeManuallyDescription"
        component={AddRecipeManuallyDescription}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
      <RecipeCreationStack.Screen
        name="AddRecipeHomeScreen"
        component={AddRecipeHomeScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
        })}
        initialParams={{ from: "home" }}
      />
      <RecipeCreationStack.Screen
        name="ChooseAddRecipeOptionsStep"
        component={ChooseAddRecipeOptionsStep}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
      <RecipeCreationStack.Screen
        name="AddTitleScreen"
        component={AddTitleScreen}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
      <RecipeCreationStack.Screen
        name="AddByURLScreen"
        component={AddByURLScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
      {/* add by url preview screen */}
      <RecipeCreationStack.Screen
        name="AddByURLPreviewScreen"
        component={AddByURLPreviewScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
      {/* final step one */}
      <RecipeCreationStack.Screen
        name="FinalStepOne"
        component={FinalStepOne}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
      {/* final step two */}
      <RecipeCreationStack.Screen
        name="FinalStepTwo"
        component={FinalStepTwo}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{
          title: "Add Recipe",
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
      {/* final step three */}
      <RecipeCreationStack.Screen
        name="FinalStepThree"
        component={FinalStepThree}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{ headerShown: false }}
      />
      {/* AddByPictureHomeScreen */}
      <RecipeCreationStack.Screen
        name="AddByPictureHomeScreen"
        component={AddByPictureHomeScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
      {/* AddByPhotoScreenTwo */}
      <RecipeCreationStack.Screen
        name="AddByPhotoScreenTwo"
        component={AddByPhotoScreenTwo}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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

      <RecipeCreationStack.Screen
        name="AddIngredientSection"
        component={AddIngredientSection}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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

      <RecipeCreationStack.Screen
        name="AddInstructionsSection"
        component={AddInstructionsSection}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Add Recipe",
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
    </RecipeCreationStack.Navigator>
  );
};

export default RecipeCreationNavigatorSet;
