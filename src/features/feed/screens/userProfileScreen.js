import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import { customApiService } from "../../../store/recipe/services";
import { customApiService as profileService } from "../../../store/profile/services";
import Toast from "react-native-simple-toast";

import { useSelector } from "react-redux";
import CBRecipeItem from "../../../components/RecipeItem/index";
import Icon from "react-native-vector-icons/FontAwesome";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CBAvatar from "../../../components/Avatar";
import * as recipeUtil from "../../../utils/recipeUtil";

const UserProfileScreen = ({ navigation, route }) => {
  const user = route.params.userData;
  const token = useSelector((state) => state.authReducer.token);
  const currentLoggedInUser = useSelector((state) => state.authReducer.user);
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [recipesList, setRecipesList] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(1);

  console.log(JSON.stringify(user));

  const loadRecipiesOfUser = async () => {
    setIsLoading(true);
    try {
      const recipeFeed = await customApiService.doGetRecipesByUserId({
        userId: user.id,
      });
      const updatedRecipesList = recipeUtil.prepareRecipeList(
        recipeFeed.results
      );
      setRecipeData(updatedRecipesList);
    } catch (e) {
      console.log(e.response);
    } finally {
      setIsLoading(false);
    }
  };

  const prepareInputParams = () => {
    console.log("Preparing query for user: " + JSON.stringify(user));
    if (user != null) {
      return { userId: user.id, page: page };
    } else {
      return { page: page };
    }
  };

  const getRecipeFeed = async () => {
    try {
      const recipeFeed = await customApiService.doGetRecipeFeed(
        prepareInputParams()
      );

      const updatedRecipesList = recipeUtil.prepareRecipeList(
        recipeFeed.results
      );
      console.log("updatedRecipesList updatedRecipesList", updatedRecipesList);

      const thisUserRecipeList = updatedRecipesList.filter(
        (recipe) => recipe.user.id !== user.id
      );

      let data =
        page === 1
          ? thisUserRecipeList
          : [...recipesList, ...thisUserRecipeList];

      setRecipesList(data);
    } catch (e) {
      console.log(e);
      Toast.show("Unable to load feed", Toast.LONG);
    }
    setIsLoading(false);
  };

  const followUser = async () => {
    if (token == null) {
      navigation.navigate("GuestScreenSet", {
        screen: "LoginOptionScreen",
      });
    } else {
      try {
        const result = await profileService.doFollowUser({
          userId: currentLoggedInUser.id,
          userIdToFollow: user.id,
        });
        setIsFollowing(true);
      } catch (e) {
        console.log(e.response);
      }
    }
  };

  const renderRecipeItem = (props) => {
    return <CBRecipeItem recipeDetail={props.item} hideChefDetail={true} />;
  };

  React.useEffect(() => {
    getRecipeFeed();
    console.log("currentLoggedInUser", currentLoggedInUser);
  }, []);

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setPage(page + 1)}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More</Text>
          {isLoadingMore ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: AppStyles.appBackgroundColor,
        }}
      >
        <View style={{}}>
          <MCIcon
            size={30}
            name="keyboard-backspace"
            onPress={() => navigation.pop()}
            color="black"
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
        >
          <Text style={AppStyles.styles.content_h2_bold}>{user.name}</Text>
        </View>
        <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
          <Icon
            size={20}
            name="long-arrow-left"
            onPress={() => {}}
            color="transparent"
          ></Icon>
        </View>
      </View>
      <View
        style={[
          styles.chefFollowersBox,
          { backgroundColor: AppStyles.appBackgroundColor },
        ]}
      >
        <View style={styles.chefPicBox}>
          <CBAvatar
            imageSource={
              user?.users_demo?.image ? { uri: user.users_demo.image } : null
            }
            size={52}
            label="DUMMY"
          ></CBAvatar>
        </View>

        <View style={[styles.recipesAndFollowersBox]}>
          <View style={styles.recipeBox}>
            <View>
              <Text style={styles.recipeNameText}> Recipes </Text>
              <Text style={styles.recipeNumberText}>
                {" "}
                {recipesList.length}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.followersBox}>
            <View>
              <Text style={styles.followerNameText}>Followers</Text>
              <Text style={styles.followerNumberText}>
                {user?.following?.length}
              </Text>
            </View>
          </View>
          <View style={styles.followingBox}>
            <View>
              <Text style={styles.followingText}>Following </Text>
              <Text style={styles.followingNumberText}>
                {user.following.length}{" "}
              </Text>
            </View>
          </View>
        </View>
        {user.id == currentLoggedInUser.id ? (
          <View />
        ) : (
          <View style={styles.followbtnBox}>
            {isFollowing ? (
              <View style={styles.followBtn}>
                <Text style={styles.btnTxt}>Following</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.followBtn}
                onPress={() => followUser()}
              >
                <Text style={styles.btnTxt}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <View style={styles.recipeListContainer}>
        <FlatList
          data={recipesList}
          renderItem={(item) =>
            renderRecipeItem(item, () => {
              navigation.navigate("RecipeDetailScreen");
            })
          }
          keyExtractor={(item) => item.recipeId.toString()}
          refreshing={refreshing}
          onRefresh={() => {
            getRecipeFeed();
            setRefreshing(true);
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => setPage(page + 1)}
          ListFooterComponent={renderFooter}
        />
        <View style={{ marginTop: 400 }} />
      </View>
    </>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  followChefsContainer: {
    backgroundColor: "green",
    //paddingTop: '5%',
    //paddingHorizontal: '8%',
  },
  mainScreenContainer: {
    flex: 1,
    flexDirection: "column",
  },
  recipeListContainer: {
    // marginBottom: 300,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  chefFollowersBox: {
    flexDirection: "column",
    alignItems: "center",
  },

  chefPicBox: {
    paddingHorizontal: "7%",
  },

  chefMainPic: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  recipesAndFollowersBox: {
    flexDirection: "row",
    width: "75%",
    marginVertical: "5%",
    justifyContent: "center",
  },

  recipeBox: {
    alignItems: "center",
    flexDirection: "row",
    width: "30%",
    justifyContent: "center",
    paddingRight: "10%",
    position: "absolute",
    left: 0,
  },

  recipeNameText: {
    textAlign: "center",
    fontSize: 12,
    color: "#4C4C4C",
  },
  recipeNumberText: {
    textAlign: "center",
    fontSize: 20,
    //color: '#4C4C4C',
    fontWeight: "bold",
    paddingVertical: 5,
  },
  followersBox: {
    alignItems: "center",
    flexDirection: "row",
    //width: '30%',
    justifyContent: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: AppStyles.COLOR_GRAY_4,
    borderRightColor: AppStyles.COLOR_GRAY_4,
    paddingHorizontal: 30,
  },
  followerNameText: {
    textAlign: "center",
    fontSize: 12,
    color: "#4C4C4C",
  },

  followerNumberText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  followingBox: {
    alignItems: "center",
    flexDirection: "row",
    width: "30%",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    paddingLeft: "10%",
  },
  followingText: {
    textAlign: "center",
    fontSize: 12,
  },

  followingNumberText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
  },

  followbtnBox: {
    alignItems: "center",
    marginVertical: "5%",
    width: "35%",
  },
  followBtn: {
    alignItems: "center",
    paddingVertical: "3%",
    backgroundColor: "#61BAAC",
    width: "100%",
    borderRadius: 15,
  },
  btnTxt: {
    fontFamily: AppStyles.FONT_FAMILY,
    fontWeight: "900",
    alignItems: "center",
    color: "white",
    fontSize: 15,
    paddingVertical: 8,
  },
});
