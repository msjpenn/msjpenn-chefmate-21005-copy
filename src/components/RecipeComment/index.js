import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as AppStyles from "../appStyles";
import CBAvatar from "../Avatar";
import * as recipeUtil from "../../utils/recipeUtil";
import moment from "moment";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const CBRecipeComment = ({ commentData, style, deleteComment }) => {
  console.log("commentdata", commentData);
  const user = useSelector((state) => state.authReducer.user);

  const isOwner = commentData?.user?.id == user?.id;
  // console.log(user.id);

  return (
    <View style={[{ flexDirection: "row" }, style]}>
      <View style={styles.chefPicBoxHeader}>
        <CBAvatar
          imageSource={{
            uri:
              commentData.user?.users_demo != null
                ? commentData.user?.users_demo.image
                : null,
          }}
          size={30}
          label={""}
        ></CBAvatar>
      </View>
      <View style={[styles.userCommentAndDateContainer]}>
        <View style={[styles.userNameBox]}>
          <Text style={[AppStyles.styles.content_p_bold]}>
            {commentData.user?.name ||
              commentData?.user?.email?.match(/^([^@]*)@/)[1]}
          </Text>
        </View>
        <View style={styles.mainDateTxtBox}>
          <Text
            style={[AppStyles.styles.content_smallprint, { textAlign: "left" }]}
          >
            {moment(commentData.created_at).format("LLL")}
          </Text>
        </View>
        <View style={styles.commentBox}>
          <Text
            style={[
              AppStyles.styles.content_semi,
              { color: AppStyles.COLOR_GRAY_2 },
            ]}
          >
            {commentData.body}
          </Text>
          <TouchableOpacity
            onPress={() => deleteComment(commentData)}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            {isOwner && (
              <FontAwesomeIcon name="trash-o" color="#FF0000" size={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default CBRecipeComment;

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
    paddingHorizontal: 10,
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
    alignItems: "center",
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
    paddingHorizontal: "7%",
  },
  commentsBox: {
    paddingHorizontal: "7%",
  },

  commentsTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
  commentorMainPic: {
    width: 18,
    height: 18,
    borderRadius: 18,
    marginLeft: -8,
    borderWidth: 1,
    borderColor: "white",
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
    fontSize: 12,
    color: "#999999",
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
    marginLeft: "10%",
  },
});
