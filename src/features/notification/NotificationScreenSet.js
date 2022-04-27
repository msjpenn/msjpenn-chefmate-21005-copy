import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationScreen from "./screens/NotificationScreen";
import * as AppStyles from "../../config/appStyles";
import { View } from "react-native";

const NotificationStack = createStackNavigator();

const NotificationScreenSet = ({ navigation }) => {
  return (
    <NotificationStack.Navigator
      headerMode="float"
      initialRouteName="NotificationScreen"
    >
      <NotificationStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}
        options={{
          title: "Notifications",
          headerRight: () => <View />,
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
    </NotificationStack.Navigator>
  );
};

export default NotificationScreenSet;
