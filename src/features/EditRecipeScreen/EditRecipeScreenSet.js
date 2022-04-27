import React from "react";
import EditTitleScreen from "./screens/editTitleScreen";
import EditDescriptionScreen from "./screens/editDescriptionScreen";

import EditFinalStepOneScreen from "./screens/editFinalStepOneScreen";
import EditPreviewScreen from "./screens/editPreviewScreen";
import EditCompleteScreen from "./screens/editCompleteScreen";
import EditIngredientSectionScreen from "./screens/editIngredientSectionScreen";
import EditInstructionsSectionScreen from "./screens/editInstructionsSectionScreen";
import { createStackNavigator } from "@react-navigation/stack";
import * as AppStyles from "../../config/appStyles";
import { Alert, Text, TouchableOpacity } from "react-native";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { doneRecipe } from "../../store/recipeCreation/actions";
import { useNavigation } from "@react-navigation/native";

const EditRecipeStack = createStackNavigator();

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
  const dispatch = useDispatch();
  const nav = useNavigation();

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
    <EditRecipeStack.Navigator
      headerMode="float"
      initialRouteName="EditTitleScreen"
    >
      <EditRecipeStack.Screen
        name="EditTitleScreen"
        component={EditTitleScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Edit Recipe",
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
      <EditRecipeStack.Screen
        name="EditDescriptionScreen"
        component={EditDescriptionScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Edit Recipe",
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
      <EditRecipeStack.Screen
        name="EditIngredientSectionScreen"
        component={EditIngredientSectionScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Edit Recipe",
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
      <EditRecipeStack.Screen
        name="EditInstructionsSectionScreen"
        component={EditInstructionsSectionScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Edit Recipe",
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
      <EditRecipeStack.Screen
        name="EditFinalStepOneScreen"
        component={EditFinalStepOneScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={({ route, navigation }) => ({
          title: "Edit Recipe",
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
      <EditRecipeStack.Screen
        name="EditPreviewScreen"
        component={EditPreviewScreen}
        options={{ headerShown: false }}
      />
      <EditRecipeStack.Screen
        name="EditCompleteScreen"
        component={EditCompleteScreen}
        options={{ headerShown: false }}
      />
    </EditRecipeStack.Navigator>
  );
};

export default RecipeRecreationScreenSet;
