import React, { createRef, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Share,
  TextInput,
  Alert,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import CBRecipeItem from "../../../components/RecipeItem";
import { useSelector } from "react-redux";

import Moment from "moment";

import { recipeApiService } from "./../../../store/recipeCreation/services";

const app = ({ route, navigation }) => {
  Moment.locale("en");
  const { total_hours_to_make, serving_size } = route.params;

  const recipeState = useSelector((state) => state.recipeCreationReducer);

  const authUser = useSelector((state) => state.authReducer);
  const titleState = useSelector((state) => state.recipeCreationReducer?.title);
  const recipe = useSelector((state) => state.recipeCreationReducer);
  const section = useSelector((state) => state.recipeCreationReducer?.section);
  const [isLoading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(recipe.title);
  const [time] = React.useState(
    total_hours_to_make ? `${total_hours_to_make}` : null
  );
  const [size] = React.useState(serving_size ? `${serving_size}` : null);

  React.useEffect(() => {
    console.log("Preview hours and size", total_hours_to_make, serving_size);
  }, []);

  const updateSectionInstructionIngredient = async () => {
    try {
      for (let sectionItem = 0; sectionItem < section.length; sectionItem++) {
        const secResponse = await recipeApiService.doUpdateRecipeSection({
          name: section[sectionItem]?.name,
          id: section[sectionItem]?.id,
        });

        if (section[sectionItem]?.ingredients.length > 0) {
          for (
            let ingredientItem = 0;
            ingredientItem < section[sectionItem]?.ingredients.length;
            ingredientItem++
          ) {
            const ingredientsResponse = await recipeApiService.doUpdateIngredients(
              {
                id: section[sectionItem]?.ingredients[ingredientItem]?.id,
                name: section[sectionItem]?.ingredients[ingredientItem]?.name,
                amount:
                  section[sectionItem]?.ingredients[ingredientItem]?.amount,
                unit: section[sectionItem]?.ingredients[ingredientItem]?.unit,
              }
            );
          }
        }

        if (section[sectionItem]?.instructions.length > 0) {
          for (
            let instructionItem = 0;
            instructionItem < section[sectionItem]?.instructions.length;
            instructionItem++
          ) {
            const instructionsResponse = await recipeApiService.doUpdateInstructions(
              {
                id: section[sectionItem]?.instructions[instructionItem]?.id,
                image:
                  section[sectionItem]?.instructions[instructionItem]?.image
                    ?.base64,
                description:
                  section[sectionItem]?.instructions[instructionItem]
                    ?.description,
              }
            );
          }
        }
      }
    } catch (error) {
      Toast.show("Something went wrong while updating this recipe", Toast.LONG);
      console.log(error);
    }
  };

  const updateSectionInstructionIngredientNew = async () => {
    try {
      for (let sectionItem = 0; sectionItem < section.length; sectionItem++) {
        /**
         * Check if section has id which means we can edit
         * if does not have an id it mean it does not exist
         * have on we add that section using recipeId
         */

        if (section[sectionItem]?.id) {
          const secResponse = await recipeApiService.doUpdateRecipeSection({
            name: section[sectionItem]?.name,

            id: section[sectionItem]?.id,
          });

          //Add section ingredients

          if (section[sectionItem]?.ingredients.length > 0) {
            for (
              let ingredientItem = 0;
              ingredientItem < section[sectionItem]?.ingredients.length;
              ingredientItem++
            ) {
              //if ingredients exist - update
              if (section[sectionItem]?.ingredients[ingredientItem]?.id) {
                const ingredientsPutResponse = await recipeApiService.doUpdateIngredients(
                  {
                    id: section[sectionItem]?.ingredients[ingredientItem]?.id,
                    name:
                      section[sectionItem]?.ingredients[ingredientItem]?.name,
                    amount:
                      section[sectionItem]?.ingredients[ingredientItem]?.amount,
                    unit:
                      section[sectionItem]?.ingredients[ingredientItem]?.unit,
                  }
                );
              } else {
                const ingredientsPostResponse = await recipeApiService.doPostIngredients(
                  [
                    {
                      section: section[sectionItem]?.id,
                      name:
                        section[sectionItem]?.ingredients[ingredientItem]?.name,
                      amount:
                        section[sectionItem]?.ingredients[ingredientItem]
                          ?.amount,
                      unit:
                        section[sectionItem]?.ingredients[ingredientItem]?.unit,
                    },
                  ]
                );
              }
            }
          }

          //Add section instructions

          if (section[sectionItem]?.instructions.length > 0) {
            for (
              let instructionItem = 0;
              instructionItem < section[sectionItem]?.instructions.length;
              instructionItem++
            ) {
              if (section[sectionItem]?.instructions[instructionItem]?.id) {
                const instructionsResponse = await recipeApiService.doUpdateInstructions(
                  {
                    id: section[sectionItem]?.instructions[instructionItem]?.id,
                    image:
                      section[sectionItem]?.instructions[instructionItem]?.image
                        ?.base64,
                    description:
                      section[sectionItem]?.instructions[instructionItem]
                        ?.description,
                  }
                );
              } else {
                const instructionsResponse = await recipeApiService.doPostInstructions(
                  [
                    {
                      section: section[sectionItem]?.id,
                      image:
                        section[sectionItem]?.instructions[instructionItem]
                          ?.image?.base64,
                      description:
                        section[sectionItem]?.instructions[instructionItem]
                          ?.description,
                    },
                  ]
                );
              }
            }
          }
        } else {
          //add new section

          const sectionRes = await recipeApiService.doPostRecipeSection({
            name: section[sectionItem]?.name,
          });

          //Add section ingredients

          if (section[sectionItem]?.ingredients.length > 0) {
            for (
              let ingredientItem = 0;
              ingredientItem < section[sectionItem]?.ingredients.length;
              ingredientItem++
            ) {
              const ingredientsResponse = await recipeApiService.doPostIngredients(
                [
                  {
                    section: sectionRes.id,
                    name:
                      section[sectionItem]?.ingredients[ingredientItem]?.name,
                    amount:
                      section[sectionItem]?.ingredients[ingredientItem]?.amount,
                    unit:
                      section[sectionItem]?.ingredients[ingredientItem]?.unit,
                  },
                ]
              );
            }
          }

          //Add section instructions

          if (section[sectionItem]?.instructions.length > 0) {
            for (
              let instructionItem = 0;
              instructionItem < section[sectionItem]?.instructions.length;
              instructionItem++
            ) {
              const instructionsResponse = await recipeApiService.doPostInstructions(
                [
                  {
                    section: sectionRes.id,
                    image:
                      section[sectionItem]?.instructions[instructionItem]?.image
                        ?.base64,
                    description:
                      section[sectionItem]?.instructions[instructionItem]
                        ?.description,
                  },
                ]
              );
            }
          }
        }
      }

      navigation.navigate("EditCompleteScreen");
      setLoading(false);
    } catch (error) {
      Toast.show("Something went wrong while updating this recipe", Toast.LONG);
      setLoading(false);

      console.log(error);
    }
  };

  const updateRecipe = async () => {
    console.log(typeof time, typeof size);
    let prepTime = parseInt(time);
    if (typeof prepTime !== "number") {
      Toast.show("Time should be a number", Toast.LONG);
      return;
    }

    if (!title) {
      Toast.show("Recipe title is required!", Toast.LONG);
      return;
    }

    if (!size) {
      Toast.show("Serving size is required!", Toast.LONG);
      return;
    }

    if (!time) {
      Toast.show("Time to prepare is required!", Toast.LONG);
      return;
    }

    const data = {
      title: recipe.title,
      description: recipe.description,
      is_draft: false,
      total_hours_to_make: time,
      serving_size: size,
      user: authUser.user?.id,
      id: recipe.recipeIdUpdate,
    };

    if (recipe.image?.base64) {
      data["picture"] = recipe.image?.base64;
    }
    const res = await recipeApiService.doUpdateRecipe(data);
  };

  const handlePreview = () => {
    navigation.navigate("EditPreviewScreen");
  };

  React.useEffect(() => {
    if (titleState) setTitle(titleState);
  }, [titleState]);

  const onPublish = async () => {
    setLoading(true);
    updateRecipe();
    updateSectionInstructionIngredientNew();
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
          borderBottomWidth: 1,
          borderBottomColor: AppStyles.COLOR_GRAY_4,
        }}
      >
        <View style={{ flex: 1 }}>
          <Icon
            size={20}
            name="long-arrow-left"
            onPress={() => navigation.pop()}
            color="black"
          ></Icon>
        </View>
      </View>

      <ScrollView style={styles.recreationAndChefRecipeContainer}>
        <View style={styles.recipesByChefs}>
          <View style={styles.recipesByParticularChef}>
            <CBRecipeItem
              recipeDetail={recipeState.recipeDetails}
              skipTouchableOnImage={true}
              hideSummaryOnImage={true}
            ></CBRecipeItem>
            {/* <RecipePreviewItem
              recipeDetail={recipeState.recipeDetails}
              skipTouchableOnImage={true}
              hideSummaryOnImage={true}
            ></RecipePreviewItem> */}
            <View
              style={[
                styles.mainRecipeContentBox,
                { paddingVertical: 5, paddingHorizontal: 20 },
              ]}
            >
              <View style={styles.recipeNameBox}>
                <Text
                  style={[
                    AppStyles.styles.content_h1_bold,
                    { textAlign: "left", width: "70%" },
                  ]}
                >
                  {recipeState.title}
                </Text>
              </View>
              <View style={styles.timeAndRatingBox}>
                <View style={[styles.timeAndRatingTxtBox]}>
                  <Text
                    style={[
                      styles.content_smallprint,
                      { color: AppStyles.COLOR_GRAY_2, fontSize: 13 },
                    ]}
                  >
                    Preparation time
                  </Text>
                </View>

                <View style={styles.ratingAndTimeBox}>
                  {recipeState?.recipeDetails?.total_hours_to_make != null && (
                    <View style={styles.timeAndClockIconBox}>
                      <View style={styles.clockIconBox}>
                        <Image
                          source={require("../../../assets/icons/iconClockBlack.png")}
                          style={[styles.mainClockIcon]}
                        />
                      </View>
                      <View style={styles.mainTimeTxtBox}>
                        <Text
                          style={[
                            AppStyles.styles.content_p_bold,
                            {
                              color: "black",
                              fontWeight: "bold",
                              marginLeft: 10,
                            },
                          ]}
                        >
                          {total_hours_to_make}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.recipeDetailBox}>
                <Text
                  style={[
                    AppStyles.styles.content_semi,
                    { color: AppStyles.COLOR_GRAY_2 },
                  ]}
                >
                  {recipeState.description}
                </Text>
              </View>
              <View
                style={[
                  styles.publishAndCatagoriesBox,
                  { paddingVertical: "4%" },
                ]}
              >
                <View style={styles.publishBox}>
                  <Text style={styles.publishAndCatagoriesTxt}>
                    Published:{" "}
                    {Moment(recipeState.created_at).format("DD/MM/YYYY")}
                  </Text>
                </View>
                <View style={styles.CatagoryBox}>
                  <Text
                    style={[styles.publishAndCatagoriesTxt, { fontSize: 13 }]}
                  >
                    Categories:{" "}
                    {recipeState?.category.map((item, index) => {
                      if (index + 1 == recipeState?.category.length) {
                        return <Text key={index}>{item.name}</Text>;
                      } else {
                        return <Text key={index}>{`${item.name}, `}</Text>;
                      }
                    })}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 1, padding: 35 }}>
              <TouchableOpacity
                style={AppStyles.styles.buttonPrimary}
                onPress={onPublish}
              >
                <Text style={AppStyles.styles.buttonPrimaryText}>
                  OK, Publish
                </Text>
              </TouchableOpacity>
            </View>
            {isLoading && (
              <View style={AppStyles.styles.activityIndicatorContainer}>
                <ActivityIndicator
                  size={"large"}
                  color={AppStyles.headerBackgroundColor}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default app;

const styles = StyleSheet.create({
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
    fontWeight: "900",
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
    paddingVertical: "7%",
  },
  mainDishNameTxt: {
    fontSize: 15,
    fontWeight: "600",
  },
  recipeStepsContainer: {
    flexDirection: "column",
  },
  mainStepBox: {
    flexDirection: "column",
    marginVertical: 10,
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
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
