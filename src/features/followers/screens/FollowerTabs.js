import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Following from "./Following";
import Followers from "./Followers";

import Animated from "react-native-reanimated";

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: "row" }}>
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

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
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
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              borderBottomColor: !isFocused ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)",
              borderBottomWidth: 1.5,
            }}
          >
            <Animated.Text
              style={{
                opacity,
                textAlign: "center",
                height: 34,
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
const FollowerTabs = ({ params, selectedTab }) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName={selectedTab == 1 ? "Followers" : "Following"}
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        scrollEnabled: false,
      }}
    >
      <Tab.Screen
        initialParams={{ params: params }}
        options={{ tabBarLabel: "Followers" }}
        name="Followers"
        component={Followers}
      />
      <Tab.Screen
        initialParams={{ params: params }}
        options={{ tabBarLabel: "Following" }}
        name="Following"
        component={Following}
      />
    </Tab.Navigator>
  );
};

export default FollowerTabs;
