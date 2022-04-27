import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import { customApiService } from "../../../store/recipe/services";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const CookbookScreen = ({ navigation }) => {
  const [userBookmarkGroups, setUserBookmarkGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  useFocusEffect(
    useCallback(() => {
      retrieveUserBookmarkGroups();
    }, [])
  );

  const CookbookGroupItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CookbookRecipesScreen", { group: item });
          }}
          style={{
            flexDirection: "row",
            marginLeft: 30,
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri:
                  "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
              }}
              style={{
                height: 36,
                width: 36,
                borderWidth: 0,
                borderRadius: 12,
              }}
            ></Image>
            <Image
              source={{
                uri:
                  "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
              }}
              style={{
                height: 40,
                width: 40,
                borderWidth: 3,
                borderColor: "white",
                borderRadius: 12,
                left: -30,
              }}
            ></Image>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "800",
              fontFamily: AppStyles.FONT_FAMILY,
              left: -10,
            }}
          >
            {item.name} ({item.total_recipes})
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <CBHeader title="Cookbook" navigation={navigation} />
        <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
          {isLoading ? (
            <ActivityIndicator
              color={AppStyles.headerBackgroundColor}
              size="small"
            />
          ) : (
            <>
              {userBookmarkGroups.length == 0 ? (
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
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: AppStyles.COLOR_GRAY_5,
                    marginTop: 20,
                  }}
                >
                  <FlatList
                    data={userBookmarkGroups}
                    renderItem={CookbookGroupItem}
                    ItemSeparatorComponent={() => {
                      return (
                        <View
                          style={{
                            backgroundColor: AppStyles.COLOR_GRAY_5,
                            height: 1,
                            opacity: 0.5,
                          }}
                        ></View>
                      );
                    }}
                  ></FlatList>
                </View>
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

export default CookbookScreen;

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
    alignSelf: "stretch",
    justifyContent: "center",
    paddingVertical: "7%",
  },
  starIconBox: {
    paddingLeft: "5%",
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
});
