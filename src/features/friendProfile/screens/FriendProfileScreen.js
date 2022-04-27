import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { customApiService } from "../../../store/profile/services";
import CBRecipeItem from "../../../components/RecipeItem/index";
import * as recipeUtil from "../../../utils/recipeUtil";
import AwesomeAlert from "react-native-awesome-alerts";
import defaultUser from "../../../assets/images/default-avatar.png";
import { Avatar } from "react-native-paper";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

const FriendProfileScreen = ({ navigation, route }) => {
  const userDetails =
    route?.params?.recipeDetail?.user || route?.params?.userData;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const [recipesList, setRecipesList] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const [showAlert, setShowAlert] = useState(false);

  const prepareInputParams = () => {
    console.log("Preparing query for user: " + JSON.stringify(user));
    if (user != null) {
      return { userId: userDetails?.id };
    } else {
      return {};
    }
  };

  useEffect(() => {
    async function getProfile() {
      try {
        let result = await customApiService.doGetFriendProfile(userDetails?.id);
        const recipeFeed = await customApiService.doGetRecipeFeed(
          prepareInputParams()
        );
        setUserProfile(result);

        const updatedRecipesList = recipeUtil.prepareRecipeList(
          recipeFeed.results
        );
        setRecipesList(updatedRecipesList);
      } catch (error) {
        console.log("error=>", error);
      }
    }

    getProfile();
  }, []);

  const followUser = async () => {
    try {
      console.log("userProfile", userDetails?.id);
      let data = {
        user: user?.id,
        following_user: userDetails?.id,
      };
      let result = await customApiService.doPostFollowUnfollowRequest(data);
      let resultProfile = await customApiService.doGetFriendProfile(
        userDetails?.id
      );
      setUserProfile(resultProfile);
    } catch (error) {}
  };

  const unFollowUser = async () => {
    try {
      let payload = {
        id: userProfile?.following_id,
      };
      let result = await customApiService.unfollowRequest(payload);
      let resultProfile = await customApiService.doGetFriendProfile(
        userDetails?.id
      );
      setUserProfile(resultProfile);
    } catch (error) {
      console.error("unfollow error user", error);
    }
  };

  const navigateToFollower = (tab) => {
    navigation.navigate("FollowerScreenSet", {
      screen: "FollowerListScreen",
      params: { id: userDetails?.id, tab: tab },
    });
  };

  const renderRecipeItem = (props, detailAction) => {
    return <CBRecipeItem recipeDetail={props.item} />;
  };

  return (
    <>
      <SafeAreaView
        style={[
          AppStyles.styles.safeAreaContentStyle,
          { backgroundColor: "#E5E5E5" },
        ]}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            height: 50,
          }}
        >
          <View style={styles.container}>
            <View style={styles.leftContainer}>
              <MCIcon
                size={30}
                name="keyboard-backspace"
                onPress={() => navigation.goBack()}
                color="black"
              />
            </View>

            <Text
              style={[
                styles.centerContainer,
                { color: AppStyles.COLOR_GRAY_1 },
              ]}
            >
              {userProfile?.name || userProfile?.email?.match(/^([^@]*)@/)[1]}
            </Text>

            <View style={styles.rightContainer}></View>
          </View>
        </View>
        <View style={{ alignSelf: "center", justifyContent: "center" }}>
          <Avatar.Image
            size={50}
            source={
              userProfile?.user_image
                ? { uri: userProfile?.user_image }
                : defaultUser
            }
            style={{ marginVertical: 10 }}
          />
        </View>

        <View style={styles.followerDetailsContainer}>
          <View style={styles.followerDetailsInnerContainer}>
            <SDText>Recipes</SDText>
            <MText>{userProfile?.recipe_count}</MText>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.followerDetailsInnerContainer, styles.saprator]}
            onPress={() => {
              navigateToFollower(1);
            }}
          >
            <SDText>Followers</SDText>
            <MText>{userProfile?.followers}</MText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigateToFollower(2);
            }}
            style={styles.followerDetailsInnerContainer}
          >
            <SDText>Following</SDText>
            <MText>{userProfile?.following}</MText>
          </TouchableOpacity>
        </View>
        {userDetails?.id !== user?.id && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userProfile?.is_following ? (
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
        )}

        <ScrollView horizontal={false}>
          <View
            style={[
              AppStyles.styles.scrollHolderForHeaderScreen,
              { flex: 1, marginTop: 10, paddingTop: 15, paddingHorizontal: 10 },
            ]}
          >
            <FlatList
              data={recipesList}
              renderItem={(item) =>
                renderRecipeItem(item, () => {
                  navigation.navigate("RecipeDetailScreen");
                })
              }
              keyExtractor={(item) => item.recipeId.toString()}
            ></FlatList>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={`Unfollow ${userProfile?.name}`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        contentContainerStyle={{ borderRadius: 12 }}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Unfollow"
        confirmButtonColor={AppStyles.headerBackgroundColor}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          setShowAlert(false);
          unFollowUser();
        }}
      />
    </>
  );
};

export default FriendProfileScreen;

const styles = StyleSheet.create({
  topRecipeName: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  roundContainer: {
    width: "90%",
    height: 65,
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 2,
    padding: 10,
  },
  checkBoxContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkBoxMainContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: AppStyles.COLOR_GRAY_5,
    paddingVertical: 15,
    marginVertical: 5,
  },
  saprator: {
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 30,
  },
  followBtnContainer: {
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  followerDetailsContainer: {
    alignSelf: "center",
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginVertical: 10,
  },
  followerDetailsInnerContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputHint: {
    flex: 1,
  },
  input: {
    flex: 1,
    width: "100%",
  },
  moreIcon: {
    marginHorizontal: 10,
  },
  profileImg: {
    width: 50,
    height: 50,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  leftContainer: {
    justifyContent: "flex-start",
    minWidth: 40,
  },
  centerContainer: {
    ...AppStyles.styles.content_h2_bold,
    justifyContent: "space-around",
    color: "white",
  },
  rightContainer: {
    justifyContent: "flex-end",
    minWidth: 40,
  },
  rightContainerText: {
    ...AppStyles.styles.content_p_bold,
    color: "white",
  },
});

const SDText = styled.Text`
  /* SmallPrint */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;

  color: ${AppStyles.COLOR_GRAY_2};
`;

const MText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 22px;
  /* identical to box height, or 110% */

  text-align: center;

  /* Black */

  color: #000000;
`;

const InputText = styled.TextInput`
  /* PlaceholderInput */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.3px;

  /* Black */

  color: #000000;
`;

const ListText = styled.Text`
  /* Content P SEMI */

  font-family: Nunito;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  display: flex;
  align-items: flex-end;

  /* Tussle black */

  color: #000000;
`;
const CheckBox = styled.Image`
  margin-left: 50%;
`;
