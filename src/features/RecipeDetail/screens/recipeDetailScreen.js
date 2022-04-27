import React, { createRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as AppStyles from "../../../components/appStyles";
import { customApiService } from "../../../store/recipe/services";
import CBRecipeItem from "../../../components/RecipeItem";
import { useDispatch, useSelector } from "react-redux";
import { doPostGroceriesListItem } from "../../../store/groceries/actions";
import Moment from "moment";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import ActionSheet from "react-native-actions-sheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-simple-toast";
import FIcon from "react-native-vector-icons/FontAwesome";
import IIcon from "react-native-vector-icons/Ionicons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as recipeUtil from "../../../utils/recipeUtil";
import { ReportRecipeOption } from "../../../components/Report/ReportRecipeOption";
import { BookmarkOption } from "../../../components/Bookmark/BookmarkOption";

const TAB_INGREDIENTS = "ingredients";
const TAB_INSTRUCTIONS = "instructions";

const actionSheetRef = createRef();

const RecipeDetailScreen = ({ route, navigation }) => {
  Moment.locale("en");
  const dispatch = useDispatch();
  const [recipeDetail, setRecipeDetail] = useState({});
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);

  const id = route.params.recipeData.recipeDetail.id;

  const [activeTab, setActiveTab] = useState(TAB_INGREDIENTS);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceSize, setServingSize] = useState(1);
  const [selectedIngredients, setSelectIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      setIsLoading(true);
      const res = await customApiService.doGetRecipeDetails(id);
      console.log("fetchDetails", res);
      const prep = recipeUtil.updatedRecipeDetails(res);
      console.log("prepd", prep);
      setRecipeDetail(prep);
      setIsLoading(false);
    } catch (error) {
      Toast.show("Something went wrong please try again later", Toast.LONG);
      setIsLoading(false);
    }
  };
  console.log("route.params==>", route.params);

  console.log("recipeDetail==>", recipeDetail);

  const isRecipeOwner = recipeDetail?.user?.id === user?.id;

  const increaseServingSize = () => {
    const updatedIngredients = ingredients;
    updatedIngredients.servingSize = updatedIngredients.servingSize * 2;
    updatedIngredients.ingredientSet.map((ingredientSetData) => {
      ingredientSetData.items.map((item) => {
        item.quantity = item.quantity * 2;
      });
    });
    setIngredients(updatedIngredients);
    setServingSize(serviceSize * 2);
  };

  const selectIngredients = (index, item, sectionIndex) => {
    //setChecked(!checked);
    console.log(item);
    let ingredients = recipeDetail.sections[sectionIndex].ingredients;
    let ingredient = ingredients[index];
    if (
      typeof ingredient["isChecked"] != undefined &&
      ingredient["isChecked"]
    ) {
      ingredient["isChecked"] = false;
      let restIngredients = selectedIngredients.filter(
        (items) => items.id != item.id
      );
      setSelectIngredients([...restIngredients]);
    } else {
      ingredient["isChecked"] = true;
      setSelectIngredients([...selectedIngredients, item]);
    }

    console.log(ingredient);
    ingredients[index] = ingredient;
    recipeDetail.sections[sectionIndex].ingredients = [...ingredients];
  };

  const decreaseServingSize = () => {
    if (serviceSize > 1) {
      const updatedIngredients = ingredients;
      updatedIngredients.servingSize = updatedIngredients.servingSize / 2;
      updatedIngredients.ingredientSet.map((ingredientSetData) => {
        ingredientSetData.items.map((item) => {
          item.quantity = item.quantity / 2;
        });
      });
      setIngredients(updatedIngredients);
      setServingSize(serviceSize / 2);
    }
  };

  const addSelectedGrocery = () => {
    selectedIngredients.map((item) => {
      let payload = {};
      payload["name"] = item.name;
      payload["quantity"] = item.amount;
      payload["user"] = user?.id;
      dispatch(doPostGroceriesListItem(payload));
    });
  };

  const checkUserAndNavigate = (nextScreen, extraData) => {
    if (token == null) {
      navigation.navigate("GuestScreenSet", {
        screen: "LoginOptionScreen",
      });
    } else {
      navigation.navigate("RecipeRecreationScreenSet", {
        screen: nextScreen,
        params: extraData,
      });
    }
  };

  const checkUserAndNavigateToEdit = (nextScreen, extraData) => {
    if (token == null) {
      navigation.navigate("GuestScreenSet", {
        screen: "LoginOptionScreen",
      });
    } else {
      navigation.navigate("EditRecipeScreenSet", {
        screen: nextScreen,
        params: extraData,
      });
    }
  };

  const performShare = async () => {
    try {
      navigation.navigate("ShareScreen", {
        recipeDetail: recipeDetail,
      });
    } catch (error) {}
  };

  //action sheet
  const onCloseActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <>
      {!recipeDetail.title && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SafeAreaView></SafeAreaView>

          <ActivityIndicator size="small" color="#61BAAC" />
        </View>
      )}

      {recipeDetail.title && (
        <View>
          <SafeAreaView></SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: AppStyles.appBackgroundColor,
              borderBottomWidth: 1,
              borderBottomColor: AppStyles.COLOR_GRAY_4,
            }}
          >
            <View style={{ flex: 1 }}>
              <MCIcon
                size={30}
                name="keyboard-backspace"
                onPress={() => navigation.pop()}
                color="black"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <BookmarkOption recipeDetail={recipeDetail} />
              <TouchableOpacity onPress={() => performShare()}>
                <Image
                  source={require("../../../assets/icons/iconShare.png")}
                  style={[
                    styles.chefMainPicInStarBox,
                    { height: 26, width: 30 },
                  ]}
                />
              </TouchableOpacity>
              {isRecipeOwner && (
                <TouchableOpacity
                  onPress={() => actionSheetRef.current?.setModalVisible()}
                >
                  <SimpleLineIcon
                    name="options-vertical"
                    color="#000"
                    size={20}
                    style={{ marginLeft: 10 }}
                    onPress={() => actionSheetRef.current?.setModalVisible()}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <ActionSheet
            ref={actionSheetRef}
            containerStyle={{
              width: wp("80"),
              backgroundColor: "transparent",
              bottom: hp("5"),
              elevation: 0,
            }}
            defaultOverlayOpacity={0.6}
          >
            <View
              style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20 }}
            >
              <TouchableOpacity
                onPress={() => {
                  onCloseActionSheet();
                  checkUserAndNavigateToEdit("EditTitleScreen", {
                    recipeDetail: recipeDetail,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  Edit Recipe
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                marginTop: 10,
                padding: 20,
              }}
            >
              <TouchableOpacity onPress={onCloseActionSheet}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>

          <ScrollView style={styles.recreationAndChefRecipeContainer}>
            <View style={styles.recipesByChefs}>
              <View style={styles.recipesByParticularChef}>
                <View style={styles.recreateRecipeBox}>
                  <TouchableOpacity
                    style={styles.recreateRecipeTouchable}
                    onPress={() =>
                      checkUserAndNavigate("RecreateUploadOptionsScreen", {
                        recipeDetail: recipeDetail,
                      })
                    }
                  >
                    <View style={styles.chefPicBox}>
                      <Image
                        source={require("../../../assets/icons/iconRecreate.png")}
                        style={[styles.chefMainPic]}
                      />
                    </View>
                    <View>
                      <Text style={styles.btnHeadingTxt}>Hungry ?</Text>
                      <Text style={styles.btnSubHeadingTxt}>
                        Lets recreate this recipe !
                      </Text>
                    </View>
                    <View style={styles.btnBox}>
                      <TouchableOpacity
                        style={styles.mainBtn}
                        onPress={() =>
                          checkUserAndNavigate("RecreateUploadOptionsScreen", {
                            recipeDetail: recipeDetail,
                          })
                        }
                      >
                        <Text style={styles.btnTxt}>Recreate</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
                <CBRecipeItem
                  recipeDetail={recipeDetail}
                  skipTouchableOnImage={true}
                  hideSummaryOnImage={true}
                ></CBRecipeItem>
                <View
                  style={[
                    styles.mainRecipeContentBox,
                    { paddingVertical: "4%", paddingHorizontal: 20 },
                  ]}
                >
                  <View style={styles.recipeNameBox}>
                    <Text
                      style={[
                        AppStyles.styles.content_h1_bold,
                        { textAlign: "left", width: "70%" },
                      ]}
                    >
                      {recipeDetail.recipeTitle}
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
                      {recipeDetail.total_hours_to_make != null && (
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
                                { color: "black", fontWeight: "bold" },
                              ]}
                            >
                              {" "}
                              {recipeDetail.total_hours_to_make}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={[
                        styles.content_smallprint,
                        { color: AppStyles.COLOR_GRAY_2, fontSize: 13 },
                      ]}
                    >
                      Serving size
                    </Text>

                    <View
                      style={{
                        marginVertical: 5,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <IIcon size={20} name="people-outline" />

                      <Text
                        style={[
                          AppStyles.styles.content_p_bold,
                          { color: "black", fontWeight: "bold" },
                        ]}
                      >
                        {"  "}
                        {recipeDetail?.serving_size}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.recipeDetailBox}>
                    <Text
                      style={[
                        AppStyles.styles.content_semi,
                        { color: AppStyles.COLOR_GRAY_2 },
                      ]}
                    >
                      {recipeDetail.description}
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
                        {Moment(recipeDetail.created_at).format("DD/MM/YYYY")}
                      </Text>
                    </View>
                    <View style={styles.CatagoryBox}>
                      <Text
                        style={[
                          styles.publishAndCatagoriesTxt,
                          { fontSize: 13 },
                        ]}
                      >
                        Categories:{" "}
                        {recipeDetail?.category?.map((item, index) => {
                          if (index + 1 == recipeDetail.category.length) {
                            return <Text key={index}>{item.name}</Text>;
                          } else {
                            return <Text key={index}>{`${item.name}, `}</Text>;
                          }
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
                {recipeDetail.sections.length > 0 && (
                  <View
                    style={{
                      backgroundColor: AppStyles.appBackgroundColor,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  >
                    <View style={[styles.mainTabBox]}>
                      {activeTab === TAB_INGREDIENTS ? (
                        <TouchableOpacity
                          style={[styles.recipesTab, { borderBottomWidth: 1 }]}
                        >
                          <Text style={[AppStyles.styles.content_h2_bold]}>
                            Ingredients
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[styles.recipesTab]}
                          onPress={() => setActiveTab(TAB_INGREDIENTS)}
                        >
                          <Text
                            style={[
                              AppStyles.styles.content_h2_bold,
                              { color: AppStyles.COLOR_GRAY_2 },
                            ]}
                          >
                            Ingredients
                          </Text>
                        </TouchableOpacity>
                      )}
                      {activeTab === TAB_INSTRUCTIONS ? (
                        <TouchableOpacity
                          style={[styles.usersTab, { borderBottomWidth: 1 }]}
                        >
                          <Text style={[AppStyles.styles.content_h2_bold]}>
                            Instructions
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[styles.usersTab]}
                          onPress={() => setActiveTab(TAB_INSTRUCTIONS)}
                        >
                          <Text
                            style={[
                              AppStyles.styles.content_h2_bold,
                              { color: AppStyles.COLOR_GRAY_2 },
                            ]}
                          >
                            Instructions
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {isLoading ? (
                      <ActivityIndicator
                        color={AppStyles.headerBackgroundColor}
                        size="small"
                      />
                    ) : null}
                    {activeTab === TAB_INGREDIENTS ? (
                      <View style={styles.ingredientsBox}>
                        {recipeDetail.sections.map(
                          (ingredientSetData, sectionIndex) => {
                            return (
                              <View key={sectionIndex}>
                                <View style={styles.dishRecipeContainer}>
                                  <View style={styles.dishNameBox}>
                                    <Text style={styles.mainDishNameTxt}>
                                      {ingredientSetData.name}
                                    </Text>
                                  </View>
                                  {ingredientSetData?.ingredients.map(
                                    (item, index) => {
                                      return (
                                        <View
                                          key={index}
                                          style={styles.mainIngredientsBox}
                                        >
                                          <View
                                            style={styles.ingredientsContainer}
                                          >
                                            <Text
                                              style={[
                                                styles.allIngredientsTxt,
                                                { color: item.color },
                                              ]}
                                            >
                                              {item.name}
                                              <Text style={styles.quantityTxt}>
                                                {" "}
                                                {item.amount} {item.unit}
                                              </Text>{" "}
                                            </Text>
                                          </View>
                                          <View
                                            style={[styles.checkBoxContainer]}
                                          >
                                            <View
                                              style={
                                                styles.lessServingNumberBox
                                              }
                                            >
                                              <FIcon
                                                name={
                                                  item.isChecked
                                                    ? "check-circle"
                                                    : "circle-o"
                                                }
                                                size={24}
                                                color="#61BAAC"
                                                style={{ marginRight: 10 }}
                                                onPress={() => {
                                                  selectIngredients(
                                                    index,
                                                    item,
                                                    sectionIndex
                                                  );
                                                }}
                                              />
                                            </View>
                                          </View>
                                        </View>
                                      );
                                    }
                                  )}
                                </View>
                              </View>
                            );
                          }
                        )}
                        <TouchableOpacity
                          style={[
                            AppStyles.styles.buttonSecondary,
                            {
                              marginHorizontal: "10%",
                              width: "80%",
                              marginTop: 20,
                            },
                          ]}
                          onPress={addSelectedGrocery}
                        >
                          <Text style={AppStyles.styles.buttonSecondaryText}>
                            Add selected to Grocery list
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.ingredientsBox}>
                        {recipeDetail.sections.map(
                          (instructionSetData, index) => {
                            return (
                              <View key={index}>
                                <View style={styles.dishRecipeContainer}>
                                  <View style={styles.dishNameBox}>
                                    <Text style={styles.mainDishNameTxt}>
                                      {instructionSetData.name}
                                    </Text>
                                  </View>

                                  <View style={styles.recipeStepsContainer}>
                                    {instructionSetData.instructions.map(
                                      (instructionStep, index) => {
                                        return (
                                          <View key={index}>
                                            <View style={styles.mainStepBox}>
                                              <View
                                                style={
                                                  styles.numberAndContentContainer
                                                }
                                              >
                                                <View
                                                  style={
                                                    styles.circularContainer
                                                  }
                                                >
                                                  <View
                                                    style={
                                                      styles.mainCircularBox
                                                    }
                                                  >
                                                    <Text
                                                      style={
                                                        styles.numberInCircularBox
                                                      }
                                                    >
                                                      {index + 1}
                                                    </Text>
                                                  </View>
                                                </View>
                                                <View
                                                  style={styles.recipeDetailBox}
                                                >
                                                  <Text
                                                    style={[
                                                      styles.content_smallprint,
                                                    ]}
                                                  >
                                                    {
                                                      instructionStep.description
                                                    }
                                                  </Text>
                                                </View>
                                              </View>

                                              {instructionStep.image && (
                                                <View
                                                  style={
                                                    styles.recipeImagesContainer
                                                  }
                                                >
                                                  <View
                                                    style={styles.mainImageBox}
                                                  >
                                                    <Image
                                                      source={{
                                                        uri:
                                                          instructionStep.image,
                                                      }}
                                                      style={{
                                                        height: 100,
                                                        width: 100,
                                                        borderRadius: 10,
                                                      }}
                                                    />
                                                  </View>
                                                </View>
                                              )}
                                            </View>
                                          </View>
                                        );
                                      }
                                    )}
                                  </View>
                                </View>
                              </View>
                            );
                          }
                        )}
                      </View>
                    )}
                  </View>
                )}
                <View style={styles.recreateRecipeBox}>
                  <TouchableOpacity
                    style={styles.recreateRecipeTouchable}
                    onPress={() =>
                      checkUserAndNavigate("RecreateUploadOptionsScreen", {
                        recipeDetail: recipeDetail,
                      })
                    }
                  >
                    <View style={styles.chefPicBox}>
                      <Image
                        source={require("../../../assets/icons/iconRecreate.png")}
                        style={[styles.chefMainPic]}
                      />
                    </View>
                    <View>
                      <Text style={styles.btnHeadingTxt}>Hungry ?</Text>
                      <Text style={styles.btnSubHeadingTxt}>
                        Lets recreate this recipe !
                      </Text>
                    </View>
                    <View style={styles.btnBox}>
                      <TouchableOpacity
                        style={styles.mainBtn}
                        onPress={() =>
                          checkUserAndNavigate("RecreateUploadOptionsScreen", {
                            recipeDetail: recipeDetail,
                          })
                        }
                      >
                        <Text style={styles.btnTxt}>Recreate</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ height: 40 }}></View>
                <ReportRecipeOption recipeDetail={recipeDetail} />
                <View style={{ height: 50 }}></View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default RecipeDetailScreen;

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
  serviceSize: {
    marginTop: 30,
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
