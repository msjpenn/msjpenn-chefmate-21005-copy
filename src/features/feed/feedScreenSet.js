import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./screens/feedScreen";
import RecipeDetailScreen from "./screens/recipeDetailScreen";
// import RecreateUploadOptionsScreen from './screens/recreateUploadOptionsScreen';
// import RecreateUploadResultScreen from './screens/recreateUploadResultScreen';
// import RecreateAddRatingScreen from './screens/recreateAddRatingScreen';
// import RecreateSuccessScreen from './screens/recreateSuccessScreen';
// import RecreateConfirmationScreen from './screens/recreateConfirmation';
import GuestScreenSet from "../GuestScreen/guestscreenset";
import SearchScreen from "./screens/searchScreen";
import ShareScreen from "./screens/shareScreen";
// import NotificationScreen from "../notification/NotificationScreenSet";
import UserProfileScreen from "./screens/userProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { View, Text, Image } from "react-native";
import * as AppStyles from "../../components/appStyles";
import AddRecipeSet from "../RecipeCreationScreen/recipeCreationNavigatorSet";
import CookbookScreenSet from "../cookbook/cookbookScreenSet";
import { customApiService } from "../../store/recipe/services";

const Tab = createBottomTabNavigator();

const FeedStack = createStackNavigator();
const FeedScreenSetGuest = ({ navigation }) => {
  return (
    <FeedStack.Navigator headerMode="none" initialRouteName="FeedScreen">
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
      <FeedStack.Screen
        name="RecipeDetailScreen"
        component={RecipeDetailScreen}
      />
      <FeedStack.Screen name="ShareScreen" component={ShareScreen} />
      {/* <FeedStack.Screen name="RecreateUploadOptionsScreen" component={RecreateUploadOptionsScreen} />
      <FeedStack.Screen name="RecreateUploadResultScreen" component={RecreateUploadResultScreen} />
      <FeedStack.Screen name="RecreateAddRatingScreen" component={RecreateAddRatingScreen} />
      <FeedStack.Screen name="RecreateConfirmationScreen" component={RecreateConfirmationScreen} />
      <FeedStack.Screen name="RecreateSuccessScreen" component={RecreateSuccessScreen} /> */}
      <FeedStack.Screen name="SearchScreen" component={SearchScreen} />
      <FeedStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
      {/* <FeedStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      /> */}
      <FeedStack.Screen name="GuestScreenSet" component={GuestScreenSet} />
    </FeedStack.Navigator>
  );
};

const GroceriesSet = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "cyan" }}
    >
      <Text>Groceries screen test</Text>
    </View>
  );
};

const SettingsSet = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "pink" }}
    >
      <Text>Settings screen</Text>
      <Text
        onPress={async () => {
          try {
            let results = await customApiService.doLogOut();
            console.log("results doLogOut==>", results);
          } catch (error) {
            console.log("error doLogOut==>", error.response);
          }
        }}
        style={{ fontSize: 15, color: "#000" }}
      >
        Log out
      </Text>
    </View>
  );
};

const FeedScreenSet = ({ navigation }) => {
  const token = useSelector((state) => state.authReducer.token);

  return (
    <>
      {token == null ? (
        <FeedScreenSetGuest />
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconSource;

              if (route.name === "Feed") {
                iconSource = focused
                  ? require("../../assets/icons/iconFeedActive.png")
                  : require("../../assets/icons/iconFeedInactive.png");
              } else if (route.name === "Cookbook") {
                iconSource = focused
                  ? require("../../assets/icons/iconCookbookActive.png")
                  : require("../../assets/icons/iconCookbookInactive.png");
              } else if (route.name === "Add recipe") {
                iconSource = focused
                  ? require("../../assets/icons/iconAddRecipeActive.png")
                  : require("../../assets/icons/iconAddRecipeInactive.png");
              }

              return <Image source={iconSource} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "black",
            inactiveTintColor: AppStyles.COLOR_GRAY_3,
            style: {},
            labelStyle: {
              fontSize: 12,
              fontFamily: AppStyles.FONT_FAMILY,
            },
          }}
        >
          <Tab.Screen name="Feed" component={FeedScreenSetGuest} />
          <Tab.Screen name="Cookbook" component={CookbookScreenSet} />
          <Tab.Screen name="Add recipe" component={AddRecipeSet} />
          <Tab.Screen name="Groceries" component={GroceriesSet} />
          <Tab.Screen name="Settings" component={SettingsSet} />
        </Tab.Navigator>
      )}
    </>
  );
};

export default FeedScreenSet;
