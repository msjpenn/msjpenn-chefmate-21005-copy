import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Alert,
  ActivityIndicator,
  Share,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import { customApiService } from "../../../store/recipe/services";
import Icon from "react-native-vector-icons/FontAwesome";
import CBRecipeItem from "../../../components/RecipeItem";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RoundCheckbox from "rn-round-checkbox";
import CBHeader from "../../../components/Header";
import CBRecipeComment from "../../../components/RecipeComment";
import CBAvatar from "../../../components/Avatar";
import Toast from "react-native-simple-toast";
import defaultUser from "../../../assets/images/default-avatar.png";

const CommentsListScreen = ({ route, navigation }) => {
  // const comments = route.params.comments;
  console.log(route);

  const [comments, setComments] = React.useState(route.params.comments);
  const [recipeId] = React.useState(route.params.recipeId);
  const [comment, setComment] = React.useState(null);

  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);

  const postComment = async () => {
    if (token == null) {
      nav.navigate("GuestScreenSet", {
        screen: "LoginOptionScreen",
      });
    } else if (comment != null && comment != "") {
      let data = {
        commentText: comment,
        userId: user == null ? 1 : user.id,
        recipeId: recipeId,
      };
      console.log(data);
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
        setComment(null);
        console.log(result);
        console.log(newComment);
        Toast.show("Comment Added Successfully.", Toast.LONG);
      } catch (error) {
        console.log("comment error==>", error);
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

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <CBHeader title="Comments" navigation={navigation} />
        <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
          <ScrollView>
            {comments.map((value) => {
              return (
                <>
                  <CBRecipeComment
                    commentData={value}
                    deleteComment={deleteComment}
                  ></CBRecipeComment>
                  <View style={{ height: 10 }}></View>
                </>
              );
            })}
          </ScrollView>

          <KeyboardAvoidingView behavior="position" enabled>
            <View
              style={{
                backgroundColor: "#F5F5F5",
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -10 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
              }}
            >
              <View style={[styles.mainRecipeContentBox, {}]}>
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
                      value={comment}
                      placeholder="Write a comment.."
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
              <View style={[styles.viewAllCommentBox, { marginBottom: 10 }]}>
                <Text style={styles.viewAllCommentTxt}>
                  Keep comments respectful and please follow our community
                  guidelines.
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={{ height: 30 }}></View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CommentsListScreen;

const styles = StyleSheet.create({
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
