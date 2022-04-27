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
import { customApiService } from "../../../store/recipe/services";
import Icon from "react-native-vector-icons/FontAwesome";
import CBRecipeItem from "../../../components/RecipeItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { doPostGroceriesListItem } from "../../../store/groceries/actions";
import RoundCheckbox from "rn-round-checkbox";
import Moment from "moment";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import ActionSheet from "react-native-actions-sheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-simple-toast";

const GOLDEN_CROWN = require("../../../assets/icons/iconCrown.png");
const GRAY_CROWN = require("../../../assets/icons/iconCrownGray.png");

const TAB_INGREDIENTS = "ingredients";
const TAB_INSTRUCTIONS = "instructions";

const actionSheetRef = createRef();

const RecipeDetailScreen = ({ route, navigation }) => {
  Moment.locale("en");
  const dispatch = useDispatch();
  const recipeDetail = route.params.recipeData.recipeDetail;
  console.log("recipeDetail==>", recipeDetail);
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);

  const [checked, setChecked] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_INGREDIENTS);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceSize, setServingSize] = useState(1);
  const [selectedIngredients, setSelectIngredients] = useState([]);

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
      navigation.navigate("ShareScreen");
      // const result = await Share.share({
      //   message: recipeDetail.recipeTitle + " #ChefMate \n" + recipeDetail.url,
      //   title: recipeDetail.recipeTitle,
      //   url: recipeDetail.url,
      // });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {}
  };

  //action sheet
  const onCloseActionSheet = () => {
    actionSheetRef.current?.hide();
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
              style={[styles.chefMainPicInStarBox, { height: 26, width: 30 }]}
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
          {/* <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          />
          <TouchableOpacity
            onPress={() =>
              checkUserAndNavigate("RecreateUploadOptionsScreen", {
                recipeDetail: recipeDetail,
              })
            }
          >
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Copy Recipe
            </Text>
          </TouchableOpacity> */}
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
              style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
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
                    style={[styles.publishAndCatagoriesTxt, { fontSize: 13 }]}
                  >
                    Categories:{" "}
                    {recipeDetail.category.map((item, index) => {
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
                    <View style={styles.servingSizeContainer}>
                      <View style={styles.chooseServingSizeBox}>
                        <Text style={styles.servingSizeTxt}>
                          CHOOSE SERVING SIZE
                        </Text>
                      </View>
                      <View style={styles.servingSizeNumberBox}>
                        <View style={styles.lessServingNumberBox}>
                          <TouchableOpacity
                            style={{
                              borderWidth: 1,
                              borderRadius: 8,
                              padding: 5,
                              height: 26,
                              width: 26,
                            }}
                            onPress={() => decreaseServingSize()}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                lineHeight: 18,
                                fontSize: 22,
                              }}
                            >
                              -
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.mainServingNumberBox}>
                          <Text style={styles.servingNumberTxt}>10</Text>
                        </View>
                        <View style={styles.moreServingNumberBox}>
                          <TouchableOpacity
                            style={{
                              borderWidth: 1,
                              borderRadius: 8,
                              padding: 5,
                              height: 26,
                              width: 26,
                            }}
                            onPress={() => increaseServingSize()}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                lineHeight: 18,
                                fontSize: 22,
                              }}
                            >
                              +
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
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
                                      <View style={styles.ingredientsContainer}>
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
                                      <View style={[styles.checkBoxContainer]}>
                                        <View
                                          style={styles.lessServingNumberBox}
                                        >
                                          <RoundCheckbox
                                            size={22}
                                            backgroundColor={
                                              AppStyles.headerBackgroundColor
                                            }
                                            checked={
                                              typeof item.isChecked !=
                                                "undefined" && item.isChecked
                                                ? true
                                                : false
                                            }
                                            onValueChange={() => {
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
                    {recipeDetail.sections.map((instructionSetData, index) => {
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
                                            style={styles.circularContainer}
                                          >
                                            <View
                                              style={styles.mainCircularBox}
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
                                          <View style={styles.recipeDetailBox}>
                                            <Text
                                              style={[
                                                styles.content_smallprint,
                                              ]}
                                            >
                                              {instructionStep.description}
                                            </Text>
                                          </View>
                                        </View>

                                        {instructionStep.image && (
                                          <View
                                            style={styles.recipeImagesContainer}
                                          >
                                            <View style={styles.mainImageBox}>
                                              <Image
                                                source={{
                                                  url: instructionStep.image,
                                                }}
                                                style={[
                                                  styles.stepRelatedImage,
                                                ]}
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
                    })}
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

            <ReportRecipeOption
              recipeDetail={recipeDetail}
            ></ReportRecipeOption>
            <View style={{ height: 50 }}></View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RecipeDetailScreen;

const BookmarkOption = ({ recipeDetail }) => {
  const token = useSelector((state) => {
    return state.authReducer.token;
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [userBookmarkGroups, setUserBookmarkGroups] = React.useState([]);
  const user = useSelector((state) => state.authReducer.user);
  const navigation = useNavigation();

  const retrieveUserBookmarkGroups = async () => {
    if (token != null) {
      setIsLoading(true);
      try {
        let data = await customApiService.doGetUserBookmarkGroups({
          userId: user?.id,
        });
        console.log("doGetUserBookmarkGroups==>", data);
        setUserBookmarkGroups(data.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("ERROR==>", error.response);
      }

      /*       then(resp => {
        setUserBookmarkGroups(resp.results);
      }).catch(e => {
        alert("Unable to retrieve your groups");
      }).finally(() => {
        setIsLoading(false);
      }) */
    }
  };

  const performBookmarkRecipe = () => {
    if (
      selectedGroup > 0 &&
      recipeDetail != null &&
      recipeDetail.recipeId > 0
    ) {
      customApiService
        .doAddBookmark({
          userId: user == null ? 1 : user.id,
          recipeId: recipeDetail.recipeId,
          groupId: selectedGroup,
        })
        .then((resp) => {
          setModalVisible(false);
        })
        .catch((e) => {
          console.log("Error==>", e.response);
          if (e?.response?.status === 400) {
            Alert.alert("Alert!", "Recipe is already bookmarked.");
          } else {
            Alert.alert(
              "Alert!",
              "Unable to process your request " +
                JSON.stringify(e.response.data)
            );
          }
        });
    }
  };

  React.useEffect(() => {
    if (modalVisible) {
      retrieveUserBookmarkGroups();
    }
  }, [modalVisible]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (!token) {
            navigation.navigate("GuestScreenSet", {
              screen: "LoginOptionScreen",
            });
          } else {
            setModalVisible(!modalVisible);
          }
        }}
      >
        <Image
          source={require("../../../assets/icons/iconCookbookActive.png")}
          style={[
            styles.chefMainPicInStarBox,
            { height: 26, width: 30, marginRight: 15 },
          ]}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalTop}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setModalVisible(!modalVisible)}
            ></TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <View style={styles.modalViewContent}>
              <View style={{ paddingHorizontal: 0, paddingTop: 10 }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon
                    name="times-circle"
                    size={30}
                    backgroundColor={"white"}
                    color={AppStyles.COLOR_GRAY_3}
                  ></Icon>
                </TouchableOpacity>
                <Text
                  style={[AppStyles.styles.content_h1, { textAlign: "left" }]}
                >
                  Bookmark recipe
                </Text>
                <Text
                  style={[
                    AppStyles.styles.content_h2_bold,
                    { textAlign: "left", marginTop: 20 },
                  ]}
                >
                  Select group
                </Text>
                {isLoading ? (
                  <ActivityIndicator
                    color={AppStyles.headerBackgroundColor}
                    size="small"
                  ></ActivityIndicator>
                ) : (
                  <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                    {userBookmarkGroups.map((group, index) => {
                      console.log("group", group);
                      return (
                        <View key={index}>
                          {selectedGroup === group.id ? (
                            <TouchableOpacity
                              style={[
                                AppStyles.styles.buttonBookmarkGroup,
                                {
                                  alignSelf: "flex-start",
                                  borderColor: AppStyles.headerBackgroundColor,
                                },
                              ]}
                              onPress={() => setSelectedGroup(group.id)}
                            >
                              <Text
                                style={[
                                  AppStyles.styles.buttonBookmarkGroupText,
                                  { color: AppStyles.headerBackgroundColor },
                                ]}
                              >
                                {group.name} ({group.total_recipes})
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={[
                                AppStyles.styles.buttonBookmarkGroup,
                                { alignSelf: "flex-start" },
                              ]}
                              onPress={() => setSelectedGroup(group.id)}
                            >
                              <Text
                                style={AppStyles.styles.buttonBookmarkGroupText}
                              >
                                {group.name} ({group.total_recipes})
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[AppStyles.styles.buttonPrimary, { marginTop: 30 }]}
                onPress={() => performBookmarkRecipe()}
              >
                <Text style={AppStyles.styles.buttonPrimaryText}>
                  Save Recipe
                </Text>
              </TouchableOpacity>
              <AddBookmarkGroupOption onGroupAdd={retrieveUserBookmarkGroups} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const AddBookmarkGroupOption = ({ onGroupAdd }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newGroupName, setNewGroupName] = React.useState(null);
  const user = useSelector((state) => state.authReducer.user);
  const [isLoading, setIsLoading] = React.useState(false);

  const processBookmarkGroupCreation = () => {
    setIsLoading(true);
    customApiService
      .doCreateBookmarkGroup({ name: newGroupName, userId: user.userId })
      .then((resp) => {
        onGroupAdd();
        setModalVisible(false);
      })
      .catch((e) => {
        alert("Unable to create group, please try again. " + e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text
          style={[
            AppStyles.styles.content_p_bold,
            {
              color: AppStyles.COLOR_GRAY_2,
              textAlign: "center",
              marginTop: 30,
              textDecorationLine: "underline",
            },
          ]}
        >
          + Create new group
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalTop, { flex: 1 }]}></View>
          <View
            style={[
              styles.modalView,
              { paddingHorizontal: 20, flexDirection: "column" },
            ]}
          >
            <View
              style={{
                backgroundColor: AppStyles.appBackgroundColor,
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}
            >
              <Text
                style={[
                  AppStyles.styles.content_h1,
                  { textAlign: "left", paddingTop: 20, paddingHorizontal: 20 },
                ]}
              >
                New Group
              </Text>
            </View>
            <View style={{ backgroundColor: AppStyles.appBackgroundColor }}>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  marginTop: 20,
                  paddingHorizontal: 20,
                }}
              >
                <TextInput
                  style={{
                    height: 55,
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                  value={newGroupName}
                  onChangeText={(value) => setNewGroupName(value)}
                ></TextInput>
              </View>
            </View>
            <View
              style={{
                backgroundColor: AppStyles.appBackgroundColor,
                height: 20,
              }}
            >
              {isLoading ? (
                <ActivityIndicator
                  color={AppStyles.headerBackgroundColor}
                  size="small"
                />
              ) : null}
            </View>
            <View
              style={{
                backgroundColor: AppStyles.appBackgroundColor,
                flexDirection: "row",
                borderTopWidth: 0,
                borderTopColor: AppStyles.COLOR_GRAY_5,
                paddingVertical: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  flex: 1,
                  height: 60,
                  justifyContent: "center",
                  backgroundColor: AppStyles.appBackgroundColor,
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderColor: AppStyles.COLOR_GRAY_5,
                  borderBottomStartRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => processBookmarkGroupCreation()}
                style={{
                  flex: 1,
                  height: 60,
                  justifyContent: "center",
                  backgroundColor: AppStyles.appBackgroundColor,
                  borderTopWidth: 1,
                  borderLeftWidth: 0,
                  borderColor: AppStyles.COLOR_GRAY_5,
                  borderBottomEndRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center" }}>Create group</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.modalTop, {}]}></View>
        </View>
      </Modal>
    </>
  );
};

const ReportRecipeOption = ({ recipeDetail }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const [reason, setReason] = React.useState(null);
  const [reasonType, setReasonType] = React.useState(null);

  const performReportRecipe = () => {
    setIsLoading(true);
    console.log(user.id, recipeDetail.recipeId);
    customApiService
      .doReportRecipe({
        user: user == null ? 0 : user.id,
        recipe: recipeDetail.recipeId,
        reason: reason,
      })
      .then((resp) => {
        Toast.show("Successfully reported the recipe", Toast.LONG);

        setModalVisible(false);
      })
      .catch((e) => {
        alert(
          "Unable to process your request " + JSON.stringify(e.response.data)
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getReasonTypeTextColor = (expectedReasonType) => {
    return expectedReasonType === reasonType ? "black" : AppStyles.COLOR_GRAY_2;
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: "#F3F3F3",
          flexDirection: "row",
          borderRadius: 14,
          padding: 15,
        }}
      >
        <View style={{ justifyContent: "center", marginRight: 15 }}>
          <Image
            source={require("../../../assets/icons/iconFlag.png")}
            style={[styles.mainClockIcon]}
          />
        </View>
        <View style={{}}>
          <Text
            style={[AppStyles.styles.content_smallprint, { color: "black" }]}
          >
            Is there something inappropriate?
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text
              style={[
                AppStyles.styles.content_smallprint,
                {
                  color: AppStyles.COLOR_GRAY_2,
                  textAlign: "left",
                  textDecorationLine: "underline",
                },
              ]}
            >
              Report this recipe
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalTop}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setModalVisible(!modalVisible)}
            ></TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <View style={styles.modalViewContent}>
              <View style={{ paddingHorizontal: 0, paddingTop: 10 }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon
                    name="times-circle"
                    size={30}
                    backgroundColor={"white"}
                    color={AppStyles.COLOR_GRAY_3}
                  ></Icon>
                </TouchableOpacity>
                <View>
                  <View style={{ width: "70%", marginBottom: 10 }}>
                    <Text
                      style={[
                        AppStyles.styles.content_h1,
                        { textAlign: "left" },
                      ]}
                    >
                      Please select a reason for reporting this recipe
                    </Text>
                  </View>
                </View>

                <View style={{}}>
                  <View style={{}}>
                    <View style={styles.allReasonsContainer1}>
                      <View style={styles.mainReasonsBox}>
                        <View style={styles.reportcheckBoxContainer}>
                          <View style={styles.servingCheckBox}>
                            <RoundCheckbox
                              backgroundColor={AppStyles.headerBackgroundColor}
                              checked={
                                reasonType === "Posting inappropriate content"
                              }
                              size={24}
                              onValueChange={(newValue) => {
                                setReason("Posting inappropriate content");
                                setReasonType("Posting inappropriate content");
                              }}
                            />
                          </View>
                        </View>
                        <View style={styles.mainReasonsTxtBox}>
                          <Text
                            style={[
                              AppStyles.styles.content_semi,
                              {
                                color: getReasonTypeTextColor(
                                  "Posting inappropriate content"
                                ),
                              },
                            ]}
                          >
                            Posting inappropriate content
                          </Text>
                        </View>
                      </View>
                      <View style={styles.mainReasonsBox}>
                        <View style={styles.reportcheckBoxContainer}>
                          <View style={styles.servingCheckBox}>
                            <RoundCheckbox
                              backgroundColor={AppStyles.headerBackgroundColor}
                              checked={
                                reasonType ===
                                "Intelectual property infringement"
                              }
                              size={24}
                              onValueChange={(newValue) => {
                                setReason("Intelectual property infringement");
                                setReasonType(
                                  "Intelectual property infringement"
                                );
                              }}
                            />
                          </View>
                        </View>
                        <View style={styles.mainReasonsTxtBox}>
                          <Text
                            style={[
                              AppStyles.styles.content_semi,
                              {
                                color: getReasonTypeTextColor(
                                  "Intelectual property infringement"
                                ),
                              },
                            ]}
                          >
                            Intelectual property infringement
                          </Text>
                        </View>
                      </View>
                      <View style={styles.mainReasonsBox}>
                        <View style={styles.reportcheckBoxContainer}>
                          <View style={styles.servingCheckBox}>
                            <RoundCheckbox
                              backgroundColor={AppStyles.headerBackgroundColor}
                              checked={reasonType === "Other"}
                              size={24}
                              onValueChange={(newValue) => {
                                setReasonType("Other");
                              }}
                            />
                          </View>
                        </View>
                        <View style={styles.mainReasonsTxtBox}>
                          <Text
                            style={[
                              AppStyles.styles.content_semi,
                              { color: getReasonTypeTextColor("Other") },
                            ]}
                          >
                            Other
                          </Text>
                        </View>
                      </View>
                    </View>
                    {reasonType === "Other" ? (
                      <>
                        <View style={styles.inappropriateContentTxtBox}>
                          <Text style={styles.mainInappropriateContentTxt}>
                            Please provide a reason.
                          </Text>
                        </View>
                        <View style={{ marginTop: 10, width: "100%" }}>
                          <TextInput
                            multiline={true}
                            style={{
                              backgroundColor: "white",
                              height: 80,
                              borderRadius: 14,
                              padding: 10,
                            }}
                            onChangeText={(value) => setReason(value)}
                          ></TextInput>
                        </View>
                      </>
                    ) : null}
                  </View>
                </View>
              </View>
              {isLoading ? (
                <ActivityIndicator
                  color={AppStyles.headerBackgroundColor}
                  size="small"
                ></ActivityIndicator>
              ) : null}

              <TouchableOpacity
                style={[AppStyles.styles.buttonPrimary, { marginTop: 30 }]}
                onPress={() => performReportRecipe()}
              >
                <Text style={AppStyles.styles.buttonPrimaryText}>
                  Confirm and send
                </Text>
              </TouchableOpacity>
              <View style={{ height: 20 }}></View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

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
