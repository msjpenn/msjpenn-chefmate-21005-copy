import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./feed/screens/feedScreen";
import GuestScreenSet from "./GuestScreen/guestscreenset";
import NotificationScreenSet from "./notification/NotificationScreenSet";
import SearchScreen from "./feed/screens/searchScreen";
import UserProfileScreen from "./feed/screens/userProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as AppStyles from "../components/appStyles";
import AddRecipeSet from "./RecipeCreationScreen/recipeCreationNavigatorSet";
import CookbookScreenSet from "./cookbook/cookbookScreenSet";
import { useNavigation } from "@react-navigation/native";
import ShareScreen from "./feed/screens/shareScreen";
import GroceriesScreenSet from "./Groceries/groceriesScreenSet";
import SettingsScreenSet from "./Settings/SettingsScreenSet";
import RecipeRecreationScreenSet from "./RecipeRecreation/RecipeRecreationScreenSet";
import EditRecipeScreenSet from "./EditRecipeScreen/EditRecipeScreenSet";
import RecipeDetailScreenSet from "./RecipeDetail/recipeDetailScreenSet";
import FriendProfileScreenSet from "../features/friendProfile/friendProfileSet";
import FollowerScreenSet from "./followers/followersScreenSet";
import BookmarkIcon from "../assets/svg/BookmarkIcon.svg";
import CookbookIcon from "../assets/svg/CookbookIcon.svg";

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();

const FeedStack = createStackNavigator();
const FeedScreenSetGuest = ({ navigation }) => {
  return (
    <FeedStack.Navigator headerMode="none" initialRouteName="FeedScreen">
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />

      <FeedStack.Screen name="SearchScreen" component={SearchScreen} />
      <FeedStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </FeedStack.Navigator>
  );
};

const TabBarButtonWithGuestCheck = (props) => {
  const token = useSelector((state) => state.authReducer.token);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      {...props}
      onPress={() => {
        token == null
          ? navigation.navigate("GuestScreenSet", {
              screen: "LoginOptionScreen",
            })
          : props.onPress();
      }}
      containerStyle={{ flex: 1 }}
    />
  );
};

const TabbedScreenSet = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: AppStyles.COLOR_GRAY_3,
        style: {
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: AppStyles.appBackgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        labelStyle: {
          fontSize: 12,
          fontFamily: AppStyles.FONT_FAMILY,
          flexDirection: "row",
          justifyContent: "space-evenly",
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreenSetGuest}
        options={{
          //tabBarButton: TabBarButtonWithGuestCheck,
          tabBarIcon: ({ focused, size, color }) => {
            let iconSource;
            if (focused) {
              iconSource = require("../assets/icons/iconFeedActive.png");
            } else {
              iconSource = require("../assets/icons/iconFeedInactive.png");
            }
            return <Image source={iconSource} style={styles.tabIcon} />;
          },
        }}
      />

      <Tab.Screen
        name="Cookbook"
        component={CookbookScreenSet}
        options={{
          tabBarButton: TabBarButtonWithGuestCheck,
          tabBarIcon: ({ focused, size, color }) => {
            return focused ? (
              <BookmarkIcon height={30} width={80} />
            ) : (
              <CookbookIcon height={30} width={80} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add recipe"
        component={AddRecipeSet}
        // component={AddRecipeRedirect}
        options={{
          tabBarButton: TabBarButtonWithGuestCheck,
          tabBarVisible: false,
          tabBarIcon: ({ focused, size, color }) => {
            let iconSource;
            if (focused) {
              iconSource = require("../assets/icons/iconAddRecipeActive.png");
            } else {
              iconSource = require("../assets/icons/iconAddRecipeInactive.png");
            }
            return (
              <>
                {Platform.OS === "ios" ? (
                  <View style={{ position: "relative" }}>
                    <View
                      style={{
                        height: focused ? 0 : 75,
                        width: 75,
                        justifyContent: "center",
                        padding: 25,
                        shadowColor: "gray",
                        shadowRadius: 20,
                        shadowOffset: { width: 0, height: -10 },
                        shadowRadius: 5,
                        shadowOpacity: 0.2,
                        backgroundColor: AppStyles.appBackgroundColor,
                        borderWidth: 0,
                        borderRadius: 75,
                        borderTopLeftRadius: 75,
                        borderTopRightRadius: 75,
                      }}
                    >
                      <Image
                        source={iconSource}
                        style={{ height: size, width: size, top: 0 }}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      position: "relative",
                      width: 80,
                      height: focused ? 0 : 80,
                      top: 0,
                    }}
                  >
                    <ImageBackground
                      source={require("../assets/icons/addRecipeCircle.png")}
                      style={{
                        width: 80,
                        height: 80,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={iconSource}
                        style={{ height: size, width: size }}
                      />
                    </ImageBackground>
                  </View>
                )}
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="GroceriesScreenSet"
        component={GroceriesScreenSet}
        options={{
          tabBarButton: TabBarButtonWithGuestCheck,
          tabBarIcon: ({ focused, size, color }) => {
            let iconSource;
            if (focused) {
              iconSource = require("../assets/icons/iconGroceriesActive.png");
            } else {
              iconSource = require("../assets/icons/iconGroceriesInactive.png");
            }
            return (
              <Image
                source={iconSource}
                style={{ height: size, width: size }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreenSet}
        options={{
          tabBarButton: TabBarButtonWithGuestCheck,
          tabBarIcon: ({ focused, size, color }) => {
            let iconSource;
            if (focused) {
              iconSource = require("../assets/icons/iconSettingsActive.png");
            } else {
              iconSource = require("../assets/icons/iconSettingsInactive.png");
            }
            return (
              <Image
                source={iconSource}
                style={{ height: size, width: size }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AppScreenSet = ({ navigation }) => {
  return (
    <>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Home" component={TabbedScreenSet} />
        <AppStack.Screen name="GuestScreenSet" component={GuestScreenSet} />
        <AppStack.Screen
          name="NotificationScreenSet"
          component={NotificationScreenSet}
        />
        <AppStack.Screen
          name="RecipeRecreationScreenSet"
          component={RecipeRecreationScreenSet}
        />
        <AppStack.Screen
          name="RecipeDetailScreenSet"
          component={RecipeDetailScreenSet}
        />
        <AppStack.Screen
          name="EditRecipeScreenSet"
          component={EditRecipeScreenSet}
        />
        <AppStack.Screen
          name="FriendProfileScreenSet"
          component={FriendProfileScreenSet}
        />
        <AppStack.Screen
          name="FollowerScreenSet"
          component={FollowerScreenSet}
        />
      </AppStack.Navigator>
    </>
  );
};

export default AppScreenSet;

const styles = StyleSheet.create({
  tabIcon: {
    height: 30,
    width: 30,
  },
});
