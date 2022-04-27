import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import { customApiService } from "../../../store/recipe/services";
import CBRecipeItem from "../../../components/RecipeItem/index";
import CBHeader from "../../../components/Header";
import CBAvatar from "../../../components/Avatar";
import Icon from "react-native-vector-icons/FontAwesome";
import * as recipeUtil from "../../../utils/recipeUtil";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const TAB_RECIPES = "recipes";
const TAB_USERS = "users";

const SearchScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [recipesList, setRecipesList] = React.useState([]);
  const [usersList, setUsersList] = React.useState([]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      const searchResult = await customApiService.doSearch(searchText);
      console.log("Got:" + JSON.stringify(searchResult));
      if (searchResult.overall_total == 0) {
        Alert.alert("No data found with matching keyword.");
      } else {
        const recipesResultCount = searchResult.results.Recipe.length;
        const usersResultCount = searchResult.results.User.length;

        setRecipesList(searchResult.results.Recipe);
        setUsersList(searchResult.results.User);
        console.log("searchResult.results.User", searchResult.results.User);
        const updatedRecipesList = recipeUtil.prepareRecipeList(
          searchResult.results.Recipe
        );

        setRecipesList(updatedRecipesList);
        if (activeTab == null) {
          if (recipesResultCount > 0) {
            setActiveTab(TAB_RECIPES);
          } else if (usersResultCount > 0) {
            setActiveTab(TAB_USERS);
          }
        }
      }
    } catch (e) {
      Alert.alert("Unable to load results " + e.message);
    }
    setIsLoading(false);
  };

  const renderRecipeItem = (props) => {
    return <CBRecipeItem recipeDetail={props.item} />;
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          height: hp(50),
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {searchText.length > 0 && <Text>Nothing found</Text>}

        {searchText.length == 0 && (
          <>
            <Text>Please type something to search</Text>
          </>
        )}
      </View>
    );
  };

  const renderUserItem = (props) => {
    const user = props.item;
    const userDem = user.users_demo;
    return (
      <View style={[styles.userNameAndPic1, { marginHorizontal: 20 }]}>
        <TouchableOpacity
          style={styles.userNameAndPicTouchable}
          onPress={() => {
            navigation.navigate("FriendProfileScreenSet", {
              screen: "FriendProfileScreen",
              params: { userData: user },
            });
          }}
        >
          <CBAvatar
            imageSource={userDem != null ? userDem.image : null}
            label={user.email}
            size={30}
          ></CBAvatar>
          <View style={styles.userNameTxtBox}>
            <Text style={AppStyles.styles.content_p_bold}>{user.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <View>
          <CBHeader title="Search" navigation={navigation} />
        </View>
        <View
          style={[
            AppStyles.styles.scrollHolderForHeaderScreen,
            { flex: 1, paddingTop: 10 },
          ]}
        >
          <View style={styles.mainScreenContainer1}>
            <View style={[styles.mainForm, { paddingHorizontal: 15 }]}>
              <View
                style={[
                  styles.searchBox,
                  { flexDirection: "row", justifyContent: "center" },
                ]}
              >
                <TextInput
                  style={{ height: 50, width: "100%", paddingEnd: 40 }}
                  onChangeText={(value) => setSearchText(value)}
                />
                <TouchableOpacity
                  style={styles.mainSearchIcon}
                  onPress={() => performSearch()}
                >
                  <Icon
                    name="search"
                    size={25}
                    color={AppStyles.COLOR_GRAY_3}
                  ></Icon>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.mainTabBox]}>
              {activeTab === TAB_RECIPES ? (
                <TouchableOpacity
                  style={[styles.recipesTab, { borderBottomWidth: 1 }]}
                >
                  <Text style={[AppStyles.styles.content_h2_bold]}>
                    Recipes
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.recipesTab]}
                  onPress={() => setActiveTab(TAB_RECIPES)}
                >
                  <Text
                    style={[
                      AppStyles.styles.content_h2_bold,
                      { color: AppStyles.COLOR_GRAY_2 },
                    ]}
                  >
                    Recipes
                  </Text>
                </TouchableOpacity>
              )}
              {activeTab === TAB_USERS ? (
                <TouchableOpacity
                  style={[styles.usersTab, { borderBottomWidth: 1 }]}
                >
                  <Text style={[AppStyles.styles.content_h2_bold]}>Users</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.usersTab]}
                  onPress={() => setActiveTab(TAB_USERS)}
                >
                  <Text
                    style={[
                      AppStyles.styles.content_h2_bold,
                      { color: AppStyles.COLOR_GRAY_2 },
                    ]}
                  >
                    Users
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
            {activeTab === TAB_RECIPES ? (
              <FlatList
                data={recipesList}
                renderItem={(item) => renderRecipeItem(item)}
                keyExtractor={(item) => item.recipeId}
                extraData={isLoading === false}
                ListEmptyComponent={renderEmpty}
              />
            ) : null}
            {activeTab === TAB_USERS ? (
              <FlatList
                data={usersList}
                renderItem={(item) => renderUserItem(item)}
                keyExtractor={(item) => item.id}
                extraData={isLoading === false}
                ListEmptyComponent={renderEmpty}
              />
            ) : null}
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  followChefsContainer: {
    backgroundColor: AppStyles.appBackgroundColor,
    paddingTop: "5%",
    paddingHorizontal: 0,
  },
  mainForm: {
    marginTop: "3%",
  },
  searchBox: {
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
  },
  searchBoxText: {
    alignItems: "center",
    width: "100%",
  },

  mainSearchIcon: {
    position: "absolute",
    right: "5%",
    width: 25,
    height: 25,
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

  usersContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    marginTop: "8%",
  },

  userNameTxtBox: {
    width: "90%",
    justifyContent: "center",
    paddingLeft: 10,
  },

  userNameAndPic: {
    borderBottomColor: "#999999",
    borderBottomWidth: 0.5,
  },

  userNameAndPicTouchable: {
    flexDirection: "row",
    paddingVertical: 13,
  },
  userNameTxt: {
    alignItems: "center",
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  userMainPic: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});
