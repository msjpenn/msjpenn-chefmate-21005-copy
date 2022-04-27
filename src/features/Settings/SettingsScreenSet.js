import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingScreen from "./screens/SettingScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import EditProfileScreen from "./screens/EditProfileScreen";

import ProfileScreenSet from "../profile/profileScreenSet";
import ChangePassword from "./screens/ChangePassword";
import AboutScreen from "./screens/AboutScreen";
import TermConditionScreen from "./screens/TermsConditionsScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import CopyrightScreen from "./screens/CopyrightScreen";
import SupportScreen from "./screens/SupportScreen";

const SettingStack = createStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: "#61BAAC" },
  headerTintColor: "#fff",
};

const SettingsScreenSet = () => {
  return (
    <SettingStack.Navigator headerMode="none" initialRouteName="SettingScreen">
      <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
      <SettingStack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <SettingStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <SettingStack.Screen
        name="ProfileScreenSet"
        component={ProfileScreenSet}
      />
      <SettingStack.Screen name="ChangePassword" component={ChangePassword} />
      <SettingStack.Screen name="AboutScreen" component={AboutScreen} />
      <SettingStack.Screen
        name="TermConditionScreen"
        component={TermConditionScreen}
      />
      <SettingStack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <SettingStack.Screen name="CopyrightScreen" component={CopyrightScreen} />
      <SettingStack.Screen name="SupportScreen" component={SupportScreen} />
      {/* <SettingStack.Screen name="SupportScreen" component={SupportScreen} /> */}
    </SettingStack.Navigator>
  );
};

export default SettingsScreenSet;
