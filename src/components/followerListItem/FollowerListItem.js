import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import defaultUser from "../../assets/images/default-avatar.png";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import * as AppStyles from "../../components/appStyles";
import AwesomeAlert from "react-native-awesome-alerts";
import { customApiService } from "../../store/profile/services";
import { ActivityIndicator, Colors } from "react-native-paper";

const FollowerListItem = ({ data, navigation, getFollowerList }) => {
  const user = useSelector((state) => state.authReducer.user);

  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    setIsLoading(true);

    try {
      let result = await customApiService.doGetFriendProfile(data?.user?.id);
      setUserProfile(result);
      setIsLoading(false);
      getFollowerList();
      console.log("FollowerListItem getProfile", result);
    } catch (error) {
      console.log("error=>", error);
      setIsLoading(false);
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
      getFollowerList();
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
      let resultProfile = await customApiService.doGetFriendProfile(
        userProfile?.id
      );
      setUserProfile(resultProfile);
    } catch (error) {
      console.error("unfollow error user", error);
    }
  };

  return (
    <>
      {isLoading && <ActivityIndicator animating={true} color="#61BAAC" />}
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
                data?.user?.users_demo?.image
                  ? {
                      uri: data?.user?.users_demo?.image,
                    }
                  : defaultUser
              }
              style={{ marginVertical: 10 }}
            />

            <Text style={{ marginLeft: 10 }}>{data?.user?.username}</Text>
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

export default FollowerListItem;
