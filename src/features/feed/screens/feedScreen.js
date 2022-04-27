import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import * as AppStyles from "../../../components/appStyles";
import { useSelector } from "react-redux";
import FeedTabs from "./FeedTabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../../../assets/svg/logo.svg";
import SearchIcon from "../../../assets/svg/SearchIconHolder.svg";

const FeedScreen = ({ navigation }) => {
  const token = useSelector((state) => state.authReducer.token);
  const hasNewNotications = useSelector(
    (state) => state.notificationReducer.hasNewNotications
  );

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Logo width={100} height={40} />
        </View>
        <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              if (!token) {
                navigation.navigate("GuestScreenSet", {
                  screen: "LoginOptionScreen",
                });
              } else {
                navigation.navigate("NotificationScreenSet", {
                  screen: "NotificationScreen",
                });
              }
            }}
            style={{}}
          >
            {hasNewNotications ? (
              <View
                style={{
                  backgroundColor: AppStyles.appBackgroundColor,
                  width: 12,
                  height: 12,
                  borderRadius: 9,
                  position: "absolute",
                  top: 1,
                  right: 22,
                  zIndex: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 7,
                    width: 7,
                    backgroundColor: "red",
                    borderRadius: 7,
                  }}
                />
              </View>
            ) : (
              <View />
            )}

            <Icon
              name="bell-o"
              size={22}
              backgroundColor="#3b5998"
              style={[
                styles.chefMainPicInStarBox,
                {
                  height: 26,
                  width: 30,
                  marginRight: 15,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!token) {
                navigation.navigate("GuestScreenSet", {
                  screen: "LoginOptionScreen",
                });
              } else {
                navigation.navigate("SearchScreen");
              }
            }}
          >
            <Icon
              name="search"
              size={22}
              backgroundColor="#3b5998"
              style={[
                styles.chefMainPicInStarBox,
                { height: 26, width: 30, marginRight: 15 },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.followChefsContainer}>
        <FeedTabs />
      </View>
    </>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: AppStyles.appBackgroundColor,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.COLOR_GRAY_4,
  },
  followChefsContainer: {
    flex: 1,
  },

  chefMainPicInStarBox: {
    width: 12,
    height: 12,
    justifyContent: "center",
  },
});
