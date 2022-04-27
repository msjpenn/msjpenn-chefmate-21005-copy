import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import MyFeeds from "./MyFeeds";
import FollowingFeeds from "./FollowingFeeds";
import TrendingFeeds from "./TrendingFeeds";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Animated from "react-native-reanimated";
import { useSelector } from "react-redux";

function MyTabBar({ state, descriptors, navigation, position }) {
  const token = useSelector((state) => state.authReducer.token);

  return (
    <View style={{ flexDirection: "row", paddingBottom: 5 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          console.log("pressed", route.name);

          if (!token && route.name === "MyFeeds") {
            navigation.navigate("GuestScreenSet", {
              screen: "LoginOptionScreen",
            });
            console.log("no token");
            return;
          }

          if (!token && route.name === "FollowingFeeds") {
            navigation.navigate("GuestScreenSet", {
              screen: "LoginOptionScreen",
            });
            console.log("no token");
            return;
          }

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          console.log("pressed", route.name);
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            key={`${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 50,
              borderBottomColor: !isFocused ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)",
              borderBottomWidth: 1.5,
              textAlignVertical: "center",
              justifyContent: "center",
            }}
          >
            <Animated.Text
              style={{
                opacity,
                textAlign: "center",
                textAlignVertical: "center",
                textAlignVertical: "center",
                fontSize: 16,
                fontFamily: "Nunito",
                fontWeight: "bold",
              }}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const FeedTabs = ({ params }) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName={"TrendingFeeds"}
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        scrollEnabled: false,
      }}
    >
      <Tab.Screen
        initialParams={{ params: params }}
        options={{ tabBarLabel: "Trending" }}
        name="TrendingFeeds"
        component={TrendingFeeds}
      />
      <Tab.Screen
        initialParams={{ params: params }}
        options={{ tabBarLabel: "Following" }}
        name="FollowingFeeds"
        component={FollowingFeeds}
      />
      <Tab.Screen
        initialParams={{ params: params }}
        name="MyFeeds"
        component={MyFeeds}
        options={{
          tabBarLabel: "You",
        }}
      />
    </Tab.Navigator>
  );
};

export default FeedTabs;
