import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import { customApiService } from "../../../store/recipe/services";
import { useSelector } from "react-redux";
import CBRecipeItem from "../../../components/RecipeItem";
import IIcon from "react-native-vector-icons/Ionicons";
import * as recipeUtil from "../../../utils/recipeUtil";

const CookbookRecipiesScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipesList, setRecipesList] = useState([]);
  const user = useSelector((state) => state.authReducer.user);
  const [cookbookGroupId, setCookbookGroupId] = useState(route.params.group.id);
  const [cookbookGroupName, setCookbookGroupName] = useState(
    route.params.group.name
  );
  const handleFilterChange = (data) => {
    console.log("data", data);
    setCookbookGroupId(data.id);
    setCookbookGroupName(data.name);
  };

  const retrieveRecipes = async () => {
    setIsLoading(true);
    try {
      console.log("cookbookGroupId", cookbookGroupId);
      const recipeFeed = await customApiService.doGetCookbookRecipes({
        groupId: cookbookGroupId,
      });
      let recipes = [];
      recipeFeed.results.map((item) => (recipes = [...recipes, item.recipe]));
      console.log("recipes", recipes);

      const updatedRecipesList = recipeUtil.prepareRecipeList(recipes);
      console.log("updatedRecipesList", updatedRecipesList);
      setRecipesList(updatedRecipesList);
    } catch (e) {
      Alert.alert("Unable to load feed " + e);
      //setRecipesList(recipeMockData);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveRecipes();
  }, [cookbookGroupId]);

  useEffect(() => {
    retrieveRecipes();
    console.log("cookbookGroupId", cookbookGroupId);
  }, []);

  const renderRecipeItem = (props) => {
    return <CBRecipeItem recipeDetail={props.item} />;
  };

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <CBHeader
          title="Cookbook"
          navigation={navigation}
          rightComponent={
            <FilterOption
              filterChangeCallback={handleFilterChange}
              selectedGroupId={cookbookGroupId}
            />
          }
        />
        <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
          {isLoading ? (
            <ActivityIndicator
              color={AppStyles.headerBackgroundColor}
              size="small"
            />
          ) : (
            <>
              {recipesList.length === 0 ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text style={AppStyles.styles.content_h1}>
                    You favorite list is empty.
                  </Text>
                  <Text
                    style={[
                      AppStyles.styles.content_semi,
                      {
                        textAlign: "center",
                        marginHorizontal: 20,
                        marginTop: 15,
                      },
                    ]}
                  >
                    Pleas add / bookmark recipe and those recipes will be lited
                    in favorite / bookmark feed.
                  </Text>
                </View>
              ) : (
                <>
                  <Text
                    style={[AppStyles.styles.content_h1, { marginBottom: 10 }]}
                  >
                    {cookbookGroupName}
                  </Text>
                  <FlatList
                    data={recipesList}
                    renderItem={(item) => renderRecipeItem(item)}
                    keyExtractor={(item) => item.recipeId}
                  ></FlatList>
                </>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};

export default CookbookRecipiesScreen;

const FilterOption = ({ filterChangeCallback, selectedGroupIdProp }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState({});
  const [selectedGroupId, setSelectedGroupId] = React.useState(
    selectedGroupIdProp
  );
  const [userBookmarkGroups, setUserBookmarkGroups] = React.useState([]);
  const user = useSelector((state) => state.authReducer.user);

  const retrieveUserBookmarkGroups = () => {
    setIsLoading(true);
    customApiService
      .doGetUserBookmarkGroups({ userId: user?.id })
      .then((resp) => {
        setUserBookmarkGroups(resp.results);
      })
      .catch((e) => {
        alert("Unable to retrieve your groups");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const performFilterChange = () => {
    filterChangeCallback(selectedGroup);
    setModalVisible(false);
  };

  React.useEffect(() => {
    if (modalVisible) {
      retrieveUserBookmarkGroups();
    }
  }, [modalVisible]);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Image
          source={require("../../../assets/icons/iconFilter.png")}
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
        onRequestClose={() => {}}
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
                  <IIcon
                    name="ios-close-circle-sharp"
                    size={24}
                    backgroundColor={"white"}
                    color={AppStyles.COLOR_GRAY_3}
                  />
                </TouchableOpacity>
                <Text
                  style={[AppStyles.styles.content_h1, { textAlign: "left" }]}
                >
                  Filter recipes
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
                    {userBookmarkGroups.map((group) => {
                      return (
                        <>
                          {selectedGroupId === group.id ? (
                            <TouchableOpacity
                              style={[
                                AppStyles.styles.buttonBookmarkGroup,
                                {
                                  alignSelf: "flex-start",
                                  borderColor: AppStyles.headerBackgroundColor,
                                },
                              ]}
                              onPress={() => {
                                setSelectedGroupId(group.id);
                                setSelectedGroup(group);
                              }}
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
                              onPress={() => {
                                setSelectedGroupId(group.id);
                                setSelectedGroup(group);
                              }}
                            >
                              <Text
                                style={AppStyles.styles.buttonBookmarkGroupText}
                              >
                                {group.name} ({group.total_recipes})
                              </Text>
                            </TouchableOpacity>
                          )}
                        </>
                      );
                    })}
                  </View>
                )}
              </View>

              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => performFilterChange()}
                >
                  <Text style={AppStyles.styles.buttonPrimaryText}>
                    Confirm
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginTop: 20, marginBottom: 20 }}
                  onPress={() => {
                    setSelectedGroup({});
                    setSelectedGroupId(null);
                  }}
                >
                  <Text
                    style={{
                      ...AppStyles.styles.content_p_bold,
                      color: AppStyles.COLOR_GRAY_2,
                      textAlign: "center",
                      textDecorationLine: "underline",
                    }}
                  >
                    Reset filter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  rateRecipeContainer: {
    backgroundColor: "#F8F8F8",
    paddingTop: "10%",
    paddingHorizontal: "8%",
  },

  rateRecipeheadingBox: {
    alignItems: "center",
    marginTop: "5%",
  },
  rateRecipeheadingText: {
    fontSize: 19,
    fontStyle: "normal",
    color: "black",
    fontWeight: "bold",
  },

  ratingStarBox: {
    flexDirection: "row",
    //alignSelf: 'stretch',
    justifyContent: "flex-start",
    paddingVertical: "7%",
  },
  starIconBox: {
    paddingRight: 30,
  },

  starMainIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },
  rateRecipeSubText: {
    fontSize: 15,
    color: "#4C4C4C",
    paddingVertical: "4%",
    alignItems: "center",
    textAlign: "center",
  },
  mainForm: {
    alignItems: "center",
    marginTop: "3%",
    paddingVertical: 10,
  },

  commentBox: {
    marginTop: "3%",
    backgroundColor: "white",
    paddingVertical: "3%",
    paddingBottom: "18%",
    width: "100%",
    borderRadius: 14,
  },
  commentBoxText: {
    alignSelf: "flex-start",
    width: "100%",
    height: "150%",
    marginTop: "3%",
  },
  publishMainBtn: {
    alignItems: "center",
    paddingVertical: "3%",
    backgroundColor: "#61BAAC",
    width: "100%",
    borderRadius: 14,
  },
  publishBtnTxt: {
    alignItems: "center",
    color: "white",
    fontSize: 17,
  },

  publishBtnBox: {
    alignItems: "center",
    marginTop: "50%",
  },

  nextBtnBox: {
    width: 10,
    height: 10,
    position: "absolute",
    top: 5,
    marginLeft: 200,
    marginTop: 10,
  },
  nextMainBtn: {
    width: 12,
    height: 12,
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalTop: {
    backgroundColor: "black",
    flex: 1,
    opacity: 0.6,
    backgroundColor: "black",
  },
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 0,
  },
  modalViewContent: {
    borderRadius: 25,
    borderWidth: 0,
    padding: 25,
    width: "100%",
    flex: 1,
    backgroundColor: AppStyles.appBackgroundColor,
  },

  onlyCrownIconBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "3%",
  },
  mainCrownIcon: {
    width: 28,
    height: 28,
    marginHorizontal: 3,
  },
  confirmBtn: {
    height: 50,
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 20,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    width: "100%",
    borderRadius: 14,
    justifyContent: "center",
    // paddingVertical: "3%",
    backgroundColor: "#61BAAC",
    flexDirection: "row",
  },
});
