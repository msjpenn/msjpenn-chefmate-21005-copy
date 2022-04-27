import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as AppStyles from "../appStyles";
import CBAvatar from "../Avatar";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import CBRecipeComment from "../RecipeComment";
import { customApiService } from "../../store/recipe/services";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-simple-toast";
import defaultUser from "../../assets/images/default-avatar.png";
import defaultImage from "../../assets/images/default-image.jpg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CBRecipeItem = ({
  recipeDetail,
  hideChefDetail,
  skipTouchableOnImage,
  hideSummaryOnImage,
}) => {
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);
  const nav = useNavigation();
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState(recipeDetail?.comments);
  const [comment, setComment] = React.useState(null);
  const [liked, setLiked] = React.useState(recipeDetail.liked);
  const [totalMades, setTotalMades] = React.useState(0);
  const [mades, setMades] = React.useState([]);
  const [hasLiked, setHasLiked] = React.useState(false);
  const [numberOfLikes, setNumberOfLikes] = React.useState(
    recipeDetail.numberOfLikes
  );

  useEffect(() => {
    setHasLiked(recipeDetail.user_likes_this);
  }, []);

  const postComment = async () => {
    if (token == null) {
      nav.navigate("GuestScreenSet", {
        screen: "LoginOptionScreen",
      });
    } else if (comment != null && comment != "") {
      let data = {
        commentText: comment,
        userId: user == null ? 1 : user.id,
        recipeId: recipeDetail.recipeId,
      };
      try {
        let result = await customApiService.doPostComment(data);
        const newComment = {
          body: result.body,
          id: result.id,
          created_at: result.created_at,
          user: {
            name: user.name,
            id: user.id,
          },
          recipe: result.id,
        };

        setComments([...comments, newComment]);
        setComment("");
        console.log(result);
        console.log(newComment);
        Toast.show("Comment Added Successfully.", Toast.LONG);
      } catch (error) {
        console.log("comment error==>", error.response);
        Alert.alert("Error!", error);
      }
    }
  };

  const deleteComment = async (comment) => {
    console.log(comment);

    try {
      const commentObj = {
        id: comment?.id,
        user: comment?.user?.id,
        recipe: comment?.recipe,
      };
      console.log(commentObj);
      let result = await customApiService.doDeleteComment(commentObj);

      const newComments = comments.filter(
        (commentItem) => commentItem.id != commentObj?.id
      );

      setComments(newComments);

      Toast.show("Successfully deleted your comment", Toast.LONG);
    } catch (error) {
      Toast.show(
        "Something went wrong while deleting your comment",
        Toast.LONG
      );
    }
  };

  React.useEffect(() => {
    console.log("recipe details", recipeDetail);
    getMade(recipeDetail.id);
  }, []);

  const checkUserAndNavigate = (nextScreen, extraData) => {
    nav.navigate("RecipeDetailScreenSet", {
      screen: "RecipeDetailScreen",
      params: { recipeData: { recipeDetail } },
    });
  };

  const performLike = () => {
    console.log(user?.id);

    if (token == null) {
      nav.navigate("GuestScreenSet", {
        screen: "LoginOptionScreen",
      });
    } else {
      customApiService
        .doLikeRecipe({
          userId: user.id ? user.id : 0,
          recipeId: recipeDetail.recipeId,
        })
        .then((resp) => {
          setHasLiked(true);
          setNumberOfLikes(numberOfLikes + 1);
        })
        .catch((e) => {
          alert(
            "Unable to process your request " + JSON.stringify(e.response.data)
          );
        });
    }
  };

  const performUnLike = () => {
    if (token == null) {
      nav.navigate("GuestScreenSet", {
        screen: "LoginOptionScreen",
      });
    } else {
      customApiService
        .doUnLikeRecipe({
          userId: user == null ? 0 : user.id,
          recipeId: recipeDetail.recipeId,
        })
        .then((resp) => {
          setHasLiked(false);
          setNumberOfLikes(numberOfLikes - 1);
        })
        .catch((e) => {
          alert(
            "Unable to process your request " + JSON.stringify(e.response.data)
          );
        });
    }
  };

  async function getMade(id) {
    try {
      const res = await customApiService.doGetRecipeRecreation(id);
      setTotalMades(res.count);
      setMades(res.results);
      console.log("recipe recreationsss", res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View style={styles.recipesByChefs}>
        <View style={styles.recipesByParticularChef}>
          {hideChefDetail == null || hideChefDetail == false ? (
            <View
              style={[styles.chefNameAndRatingBox, { marginHorizontal: 10 }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.chefNameAndPicBox}
                onPress={() => {
                  if (token == null) {
                    nav.navigate("GuestScreenSet", {
                      screen: "LoginOptionScreen",
                    });
                  } else {
                    nav.navigate("FriendProfileScreenSet", {
                      screen: "FriendProfileScreen",
                      params: { recipeDetail: recipeDetail },
                    });
                  }
                }}
              >
                <View style={styles.chefPicBox}>
                  <CBAvatar
                    imageSource={
                      recipeDetail.chefImage
                        ? { uri: recipeDetail.chefImage }
                        : defaultUser
                    }
                    size={25}
                    label={recipeDetail.chefName}
                  ></CBAvatar>
                </View>
                <View style={styles.chefNameBox}>
                  <Text style={styles.chefNameTxt}>
                    {recipeDetail.chefName}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignSelf: "flex-end",
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesomeIcon name="star" size={20} color="#FBBC04" />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginHorizontal: 10,
                      color: "#FBBC04",
                    }}
                  >
                    {recipeDetail.chefRating}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
          <View>
            {skipTouchableOnImage == null || skipTouchableOnImage == false ? (
              <TouchableOpacity
                onPress={() => {
                  checkUserAndNavigate("RecipeDetailScreen", {
                    recipeData: { recipeDetail },
                  });
                  // nav.navigate("RecipeDetailScreenSet", {
                  //   screen: "RecipeDetailScreen",
                  //   recipeData: { recipeDetail },
                  // });
                }}
              >
                <ImageBackground
                  imageStyle={{ borderRadius: 12, height: 355 }}
                  source={
                    recipeDetail?.recipeImage
                      ? { uri: recipeDetail.recipeImage }
                      : defaultImage
                  }
                  style={[
                    styles.mainFoodPic,
                    { marginHorizontal: 10, width: Dimensions.width },
                  ]}
                >
                  {hideSummaryOnImage == null || hideSummaryOnImage == false ? (
                    <LinearGradient
                      colors={["transparent", "black"]}
                      style={{
                        marginTop: "20%",
                        height: "80%",
                        width: "100%",
                        borderRadius: 12,
                      }}
                    >
                      <View style={styles.imageOverlayContent}>
                        <View style={{ width: "70%" }}>
                          <Text style={[styles.mainRecepieTxt]}>
                            {recipeDetail.recipeTitle}
                          </Text>
                        </View>
                        <View style={styles.starIconAndNumber}>
                          {recipeDetail.total_hours_to_make != null && (
                            <View style={styles.ratingAndTimeBox}>
                              <View style={styles.timeAndClockIconBox}>
                                <View style={styles.clockIconBox}>
                                  <Image
                                    source={require("../../assets/icons/iconClock.png")}
                                    style={[styles.mainClockIcon]}
                                  />
                                </View>
                                <View style={styles.mainTimeTxtBox}>
                                  <Text
                                    style={[
                                      AppStyles.styles.content_p_bold,
                                      { color: "white" },
                                    ]}
                                  >
                                    {recipeDetail.total_hours_to_make}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    </LinearGradient>
                  ) : null}
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <View style={{ marginHorizontal: 10 }}>
                <Image
                  source={
                    recipeDetail?.recipeImage
                      ? { uri: recipeDetail.recipeImage }
                      : defaultImage
                  }
                  style={[styles.mainFoodPic, {}]}
                />
                {hideSummaryOnImage == null || hideSummaryOnImage == false ? (
                  <View style={styles.imageOverlayContent}>
                    <View style={styles.recepieNameBox}>
                      <Text style={[styles.mainRecepieTxt]}>
                        {recipeDetail.recipeTitle} {"\n"}
                        {recipeDetail.recipeSubTitle}
                      </Text>
                    </View>
                    <View style={styles.starIconAndNumber}>
                      <View style={styles.ratingAndTimeBox}>
                        <View style={styles.timeAndClockIconBox}>
                          <View style={styles.clockIconBox}>
                            <Image
                              source={require("../../assets/icons/iconClock.png")}
                              style={[styles.mainClockIcon]}
                            />
                          </View>
                          <View style={styles.mainTimeTxtBox}>
                            <Text
                              style={[
                                AppStyles.styles.content_p_bold,
                                { color: "white" },
                              ]}
                            >
                              {recipeDetail.recipeTime}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            )}

            <View style={styles.likesAndCommentsBox}>
              <View style={styles.commentsAndPicBox}>
                <View style={styles.commentsBox}>
                  <Text style={AppStyles.styles.content_p_bold}>
                    Made {totalMades}x
                  </Text>
                </View>
                <View style={styles.commentersPicBox}>
                  <Image
                    source={{
                      uri: mades[0]?.picture,
                    }}
                    style={[styles.commentorMainPic]}
                  />

                  <Image
                    source={{ uri: mades[1]?.picture }}
                    style={[styles.commentorMainPic]}
                  />
                  <Image
                    source={{ uri: mades[2]?.picture }}
                    style={[styles.commentorMainPic]}
                  />
                </View>
              </View>
              <View style={[styles.likesAndCommentsContainer]}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <View style={styles.iconsAndNumbersBox}>
                    <View style={styles.numberBox}>
                      <Text style={[styles.commentsTxt]}>{numberOfLikes}</Text>
                    </View>
                    <View style={styles.likeAndCommentMainIcon}>
                      {hasLiked && (
                        <FontAwesomeIcon
                          name="heart"
                          color="#fd1d1d"
                          size={24}
                          onPress={performUnLike}
                        />
                      )}
                      {!hasLiked && (
                        <FontAwesomeIcon
                          name="heart-o"
                          size={24}
                          onPress={performLike}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.iconsAndNumbersBox}>
                    <View style={styles.numberBox}>
                      <Text style={[styles.commentsTxt]}>
                        {comments.length}
                      </Text>
                    </View>
                    <View style={styles.likeAndCommentMainIcon}>
                      <TouchableOpacity
                        onPress={() => {
                          setShowComments(!showComments);
                        }}
                      >
                        <Image
                          source={require("../../assets/icons/iconComment.png")}
                          style={[
                            styles.chefMainPicInStarBox,
                            { height: 30, width: 30 },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {showComments ? (
              <KeyboardAwareScrollView>
                <View style={{ backgroundColor: AppStyles.appBackgroundColor }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        AppStyles.styles.content_h2_bold,
                        { marginTop: 15, marginLeft: 15 },
                      ]}
                    >
                      Comments ({comments.length}){" "}
                    </Text>
                    <View
                      style={{
                        alignItems: "flex-end",
                        flexDirection: "column",
                        flex: 1,
                        justifyContent: "flex-end",
                        paddingRight: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setShowComments(!setShowComments)}
                      >
                        <Icon
                          name="times"
                          size={20}
                          style={{ marginTop: 10, marginLeft: 10 }}
                        ></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.mainRecipeContentBox,
                      { flexDirection: "column" },
                    ]}
                  >
                    {comments != null && comments.length >= 1 ? (
                      <CBRecipeComment
                        commentData={comments[0]}
                        deleteComment={deleteComment}
                      />
                    ) : null}
                    {comments != null && comments.length >= 2 ? (
                      <CBRecipeComment
                        commentData={comments[1]}
                        deleteComment={deleteComment}
                        style={{ marginTop: 10 }}
                      />
                    ) : null}
                  </View>
                  {comments != null && comments.length > 2 ? (
                    <TouchableOpacity
                      style={styles.viewAllCommentBox}
                      onPress={() =>
                        nav.navigate("RecipeDetailScreenSet", {
                          screen: "CommentsListScreen",
                          params: {
                            comments: comments,
                            recipeId: recipeDetail.recipeId,
                          },
                        })
                      }
                    >
                      <Text
                        style={[
                          styles.viewAllCommentTxt,
                          {
                            textDecorationLine: "underline",
                            textDecorationColor: "#999999",
                          },
                        ]}
                      >
                        View all Comments
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  <View
                    style={[styles.mainRecipeContentBox, { marginTop: "9%" }]}
                  >
                    <View style={styles.chefPicBoxHeader}>
                      <CBAvatar
                        imageSource={
                          user?.user_image
                            ? {
                                uri: user?.user_image,
                              }
                            : defaultUser
                        }
                        size={25}
                        label={""}
                      ></CBAvatar>
                    </View>
                    <View style={styles.userCommentAndDateContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <TextInput
                          multiline={true}
                          style={[styles.inputStyle, { flex: 1 }]}
                          placeholder="Write a comment.."
                          value={comment}
                          onChangeText={(val) => setComment(val)}
                        ></TextInput>
                        <View
                          style={{
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity onPress={() => postComment()}>
                            <Text style={styles.postTxt}>POST</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[styles.viewAllCommentBox, { marginBottom: 20 }]}
                  >
                    <Text style={styles.viewAllCommentTxt}>
                      Keep comments respectful and please follow our community
                      guidelines.
                    </Text>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            ) : null}
          </View>
        </View>
      </View>
    </>
  );
};
export default CBRecipeItem;
// async function getMade(id) {
//   const recipe = await customApiService.doGetRecipeRecreation(id);

//   console.log("recipe recreation", recipe);
// }

const styles = StyleSheet.create({
  followChefsContainer: {
    backgroundColor: AppStyles.appBackgroundColor,
    paddingTop: "5%",
    paddingHorizontal: 0,
  },
  mainScreenContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 0,
  },
  mainTabBox: {
    flex: 1,
    flexDirection: "row",
  },
  contactsTab: {
    width: "33.3%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
    borderBottomColor: "#000000",
    borderBottomWidth: 2,
  },
  facebookTab: {
    width: "33.3%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#999999",
    borderBottomWidth: 0.5,
    paddingVertical: "3%",
  },
  contactTabTxt: {
    //fontFamily: AppStyles.FONT_FAMILY,
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },

  facebookTabTxt: {
    // fontFamily: AppStyles.FONT_FAMILY,
    fontSize: 15,
    color: "#999999",
  },
  recipesByChefs: {
    flex: 1,
    flexDirection: "column",
    //paddingHorizontal: 10,
  },
  recipesByParticularChef: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: "3%",
  },
  chefNameAndRatingBox: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: "3%",
  },
  chefNameAndPicBox: {
    width: "50%",
    flexDirection: "row",
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
  chefNameTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },

  mainFoodPic: {
    width: "100%",
    height: 355,
    borderRadius: 12,
  },
  imageOverlayContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "5%",
    position: "absolute",
    bottom: 1,
    width: "100%",
  },
  mainRecepieTxt: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    lineHeight: 22.5,
  },
  starIconAndNumber: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: "5%",
    alignItems: "center",
  },
  ratingAndTimeBox: {
    width: "100%",
    flexDirection: "row",
  },
  timeAndClockIconBox: {
    flexDirection: "row",
    marginLeft: 0,
    //flex: 1,
  },
  clockIconBox: {
    justifyContent: "center",
    marginRight: 5,
  },

  mainClockIcon: {
    width: 13,
    height: 13,
  },
  mainTimeTxtBox: {
    marginRight: "7%",
  },

  timeTxt: {
    ...AppStyles.styles.content_p_bold,
    fontSize: 12,
    color: "white",
  },
  onlyCrownIconBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "3%",
  },
  mainCrownIcon: {
    width: 13,
    height: 13,
    marginHorizontal: 3,
  },

  starAndNumberBox: {
    width: "50%",
    justifyContent: "flex-end",
    // alignItems: "center",
    flexDirection: "row",
  },
  chefMainPicInStarBox: {
    width: 15,
    height: 15,
    justifyContent: "center",
  },

  starAndNumberBox: {
    width: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  chefMainPicInStarBox: {
    width: 12,
    height: 12,
    justifyContent: "center",
  },

  numberBox: {
    paddingHorizontal: "7%",
  },

  ratingNumberTxt: {
    color: "#FBBC04",
    fontSize: 11,
  },

  likesAndCommentsBox: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: "5%",
  },

  commentsAndPicBox: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },

  likeAndCommentMainIcon: {
    paddingHorizontal: "5%",
  },
  commentsBox: {
    paddingHorizontal: "5%",
  },

  commentsTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  commentorMainPic: {
    width: 18,
    height: 18,
    borderRadius: 18,
    marginLeft: -8,
    // borderWidth: 1,
    // borderColor: "white",
  },

  commentersPicBox: {
    flexDirection: "row",
    marginLeft: "5%",
  },

  likesAndCommentsContainer: {
    flexDirection: "row",
    //width: '45%',
    position: "absolute",
    right: "2%",
    alignSelf: "center",
  },
  iconsAndNumbersBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "20%",
  },

  mainRecipeContentBox: {
    flexDirection: "row",
    borderRadius: 12,
    marginTop: "4%",
  },
  chefPicBoxHeader: {
    padding: "4%",
  },
  chefMainPic: {
    width: 22,
    height: 22,
    borderRadius: 15,
  },
  userCommentAndDateContainer: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 12,
    padding: "4%",
  },

  userName: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 18,
  },
  mainDateTxtBox: {
    paddingVertical: "2%",
  },

  dateOfComment: {
    lineHeight: 18,
    color: "#999999",
    fontWeight: "600",
    fontSize: 11,
  },

  mainCommentTxt: {
    color: "#999999",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
  inputStyle: {
    height: 40,
    lineHeight: 20,
    color: "#999999",
    fontSize: 14,
    //fontFamily: AppStyles.FONT_FAMILY
  },

  postTxt: {
    fontSize: 14,
    color: "#999999",
    fontWeight: "bold",
  },
  validationMessage: {
    color: "red",
    padding: "3%",
  },
  viewAllCommentBox: {
    marginTop: "4%",
  },
  viewAllCommentTxt: {
    color: "#999999",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
  },
});
