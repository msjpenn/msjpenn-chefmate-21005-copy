import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";

import defaultUser from "../../assets/images/default-avatar.png";
import { Avatar } from "react-native-paper";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import * as AppStyles from "../appStyles";
import { customApiService } from "../../store/profile/services";
import { ActivityIndicator, Colors } from "react-native-paper";

const FollowingListItem = ({ data, navigation, getFollowingList }) => {
  const user = useSelector((state) => state.authReducer.user);

  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  // console.log("FolloweeeeeeeListItem", data);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setIsLoading(true);
      let result = await customApiService.doGetFriendProfile(
        data?.following_user?.id
      );
      setUserProfile(result);
      setIsLoading(false);

      console.log("Following getProfile", result);
    } catch (error) {
      setIsLoading(false);

      console.log("error=>", error);
    }
  }

  const followUser = async () => {
    try {
      console.log("userProfile", userProfile);
      let data = {
        user: user?.id,
        following_user: userProfile?.id,
      };
      let result = await customApiService.doPostFollowUnfollowRequest(data);
      let resultProfile = await customApiService.doGetFriendProfile(
        userProfile?.id
      );
      setUserProfile(resultProfile);
    } catch (error) {
      console.error("following error user", error);
    }
  };

  const unFollowUser = async () => {
    try {
      let payload = {
        id: userProfile?.following_id,
      };
      let result = await customApiService.unfollowRequest(payload);
      getFollowingList();
    } catch (error) {
      console.error("unfollow error user", error);
    }
  };

  return (
    <>
      {isLoading && !userProfile && (
        <ActivityIndicator animating={true} color="#61BAAC" />
      )}
      {!isLoading && userProfile && (
        <View style={styles.mainContainer}>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={50}
              source={
                data?.following_user?.users_demo?.image
                  ? {
                      uri: data?.following_user?.users_demo?.image,
                    }
                  : defaultUser
              }
              style={{ marginVertical: 10 }}
            />
            <Text style={{ marginLeft: 10 }}>
              {data?.following_user?.username}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user?.id !== userProfile?.id ? (
              <View>
                {userProfile?.is_following ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: AppStyles.headerBackgroundColor,
                      borderRadius: 14,
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                    }}
                    onPress={unFollowUser}
                  >
                    <Text style={{ color: "#fff" }}>Following</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E5E5E5",
                      borderWidth: 1,
                      borderColor: AppStyles.headerBackgroundColor,
                      borderRadius: 14,
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                    }}
                    onPress={followUser}
                  >
                    <Text style={{ color: AppStyles.headerBackgroundColor }}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View />
            )}
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: AppStyles.headerBackgroundColor,
                borderRadius: 14,
                paddingHorizontal: 12,
                paddingVertical: 7,
              }}
              onPress={() => setShowAlert(true)}
            >
              <Text style={{ color: "#fff" }}>Following</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  userDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    overflow: "hidden",
  },
});

export default FollowingListItem;
