import { StyleSheet } from "react-native";
import * as AppStyles from "../appStyles";

export const styles = StyleSheet.create({
  recreationAndChefRecipeContainer: {
    backgroundColor: "white",
  },
  recipesByChefs: {
    flex: 1,
    flexDirection: "column",
  },
  recipesByParticularChef: {
    width: "100%",
    backgroundColor: "white",
    //marginTop: '1%',
    //paddingHorizontal: '3%',
  },
  recreateRecipeBox: {
    paddingVertical: "5%",
    paddingHorizontal: 20,
  },

  recreateRecipeTouchable: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: "4%",
    backgroundColor: "#dff1ee",
    width: "100%",
    borderRadius: 14,
  },
  chefPicBox: {
    paddingHorizontal: "3%",
  },
  chefMainPic: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  btnHeadingTxt: {
    color: "#61BAAC",
    fontSize: 11,

    lineHeight: 13,
  },
  btnSubHeadingTxt: {
    color: "#61BAAC",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 20,
  },
  btnBox: {
    position: "absolute",
    right: "5%",
    width: "30%",
  },
  mainBtn: {
    padding: "8%",
    alignItems: "center",
    backgroundColor: "#61BAAC",
    borderRadius: 6,
  },
  btnTxt: {
    color: "white",
    fontSize: 13,
  },

  chefNameAndRatingBox: {
    flexDirection: "row",
    marginBottom: "3%",
  },
  chefNameAndPicBox: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  chefPicBoxHeader: {
    paddingHorizontal: "7%",
  },
  chefNameTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },

  mainFoodPic: {
    width: "100%",
    height: 275,
    borderRadius: 12,
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
    borderRadius: 15,
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

  centeredView: {
    flex: 1,
  },
  modalTop: {
    backgroundColor: "black",
    opacity: 0.6,
    backgroundColor: "black",
  },
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 0,
    flexDirection: "column-reverse",
  },
  modalViewContent: {
    borderRadius: 25,
    borderWidth: 0,
    padding: 25,
    width: "100%",
    //flex:1,
    backgroundColor: AppStyles.appBackgroundColor,
  },

  timeAndRatingTxtBox: {
    paddingVertical: "3%",
  },
  content_smallprint: {
    color: "#999999",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
  ratingAndTimeBox: {
    flexDirection: "row",
  },
  timeAndClockIconBox: {
    flexDirection: "row",
    width: "30%",
  },
  clockIconBox: {
    marginTop: "2%",
    marginRight: "1%",
  },

  mainClockIcon: {
    width: 16,
    height: 16,
  },

  onlyCrownIconBox: {
    flexDirection: "row",
    alignItems: "center",
    //marginLeft: 10,
  },
  mainCrownIcon: {
    width: 12,
    height: 12,
    marginHorizontal: 3,
  },
  recipeDetailBox: {
    paddingVertical: "4%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E6E6E6",
  },

  publishAndCatagoriesTxt: {
    color: "#999999",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
  },

  mainReasonsBox: {
    paddingVertical: "4%",
    flexDirection: "row",
  },
  mainReasonsTxtBox: {
    justifyContent: "center",
    marginLeft: "3%",
  },

  mainReasonsTxt: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },
  reportcheckBoxContainer: {
    flexDirection: "row",
  },
  inappropriateContentTxtBox: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: "4%",
  },

  mainTabBox: {
    flex: 1,
    flexDirection: "row",
  },
  IngredientsTab: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
    borderBottomColor: "#000000",
    borderBottomWidth: 2,
  },
  InstructionsTab: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
  },
  IngredientsTabTxt: {
    //fontFamily: AppStyles.FONT_FAMILY,
    fontSize: 15,
    color: "black",
    fontWeight: "600",
  },
  InstructionsTabTxt: {
    //fontFamily: AppStyles.FONT_FAMILY,
    fontSize: 15,
    color: "#999999",
  },

  ingredientsBox: {
    padding: "4%",
  },
  servingSizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: "7%",
  },

  chooseServingSizeBox: {
    justifyContent: "center",
  },
  servingSizeTxt: {
    fontSize: 14,
    fontWeight: "600",
  },

  servingSizeNumberBox: {
    flexDirection: "row",

    flex: 1,
    justifyContent: "flex-end",
  },
  mainServingNumberBox: {
    paddingHorizontal: "10%",
  },
  servingNumberTxt: {
    fontSize: 15,
    fontWeight: "600",
  },
  dishRecipeContainer: {
    marginTop: "3%",
  },
  dishNameBox: {
    paddingVertical: "7%",
  },
  mainDishNameTxt: {
    fontSize: 15,
    fontWeight: "600",
  },
  mainIngredientsBox: {
    paddingVertical: "2%",
    borderBottomColor: "#E6E6E6",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  ingredientsContainer: {
    justifyContent: "center",
    flex: 5,
  },

  allIngredientsTxt: {
    fontSize: 14,
    fontWeight: "600",
  },
  quantityTxt: {
    fontSize: 14,
    fontWeight: "700",
  },

  checkBoxContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },

  mainTabBox: {
    //flex: 1,
    flexDirection: "row",
    marginTop: "3%",
  },
  usersTab: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
  },
  recipesTab: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: "3%",
  },
  recipesTabTxt: {
    //  fontFamily: AppStyles.FONT_FAMILY,
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  usersTabTxt: {
    // fontFamily: AppStyles.FONT_FAMILY,
    fontSize: 15,
    color: "#999999",
    fontWeight: "bold",
  },

  ingredientsBox: {
    padding: "4%",
  },

  dishRecipeContainer: {
    marginTop: "3%",
  },
  dishNameBox: {
    paddingVertical: "2%",
  },
  mainDishNameTxt: {
    fontSize: 20,
    fontWeight: "700",
  },
  recipeStepsContainer: {
    flexDirection: "column",
  },
  mainStepBox: {
    flexDirection: "column",
    marginVertical: 5,
  },
  numberAndContentContainer: {
    flexDirection: "row",
  },
  circularContainer: {
    paddingRight: "4%",
  },
  mainCircularBox: {
    width: 30,
    height: 30,
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  numberInCircularBox: {
    color: "white",
  },

  recipeDetailBox: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#E6E6E6",
    flexShrink: 1,
  },
  content_smallprint: {
    color: "#4C4C4C",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
  recipeImagesContainer: {
    flexDirection: "row",
    //marginBottom: 30,
  },
  mainImageBox: {
    marginRight: "5%",
    marginTop: "7%",
    width: 120,
    height: 123,
  },
  stepRelatedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
