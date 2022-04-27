import React, { createRef, useState, useEffect } from "react";
import { SafeAreaView, Modal, TextInput } from "react-native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as AppStyles from "../appStyles";
import { customApiService } from "../../store/recipe/services";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RoundCheckbox from "rn-round-checkbox";
import Moment from "moment";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import ActionSheet from "react-native-actions-sheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-simple-toast";
import FIcon from "react-native-vector-icons/FontAwesome";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { AddBookmarkGroupOption } from "./AddBookmarkGroupOption";
import { styles } from "./styles";
import BookmarkIcon from "../../assets/svg/BookmarkIcon.svg";
import BookmarkIconActive from "../../assets/svg/BookmarkIconActive.svg";

export const BookmarkOption = ({ recipeDetail }) => {
  const token = useSelector((state) => {
    return state.authReducer.token;
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [userBookmarkGroups, setUserBookmarkGroups] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(
    recipeDetail?.is_bookmarked || false
  );
  const user = useSelector((state) => state.authReducer.user);
  const navigation = useNavigation();

  console.log("recipeDetail bookmark", recipeDetail);

  const retrieveUserBookmarkGroups = async () => {
    if (token && user?.id) {
      setIsLoading(true);
      console.log(user);
      try {
        let data = await customApiService.doGetUserBookmarkGroups({
          userId: user?.id,
        });
        console.log("doGetUserBookmarkGroups==>", data);
        setUserBookmarkGroups(data.results);
        setIsLoading(false);
        setIsBookmarked(true);
      } catch (error) {
        setIsLoading(false);
        console.log("ERROR==>", error);
      }
    }
  };

  const performBookmarkRecipe = () => {
    console.log(selectedGroup, recipeDetail?.id);
    if (selectedGroup && recipeDetail?.id) {
      customApiService
        .doAddBookmark({
          userId: user?.id,
          recipeId: recipeDetail?.id,
          groupId: selectedGroup,
        })
        .then((resp) => {
          setModalVisible(false);
        })
        .catch((e) => {
          console.log("Error==>", e);

          if (e?.status === 400) {
            Toast.show("Recipe is already bookmarked.", Toast.LONG);
          } else {
            Toast.show("Unable to process your request.", Toast.LONG);
          }
        });
    }
  };

  useEffect(() => {
    if (modalVisible) {
      retrieveUserBookmarkGroups();
    }
  }, [modalVisible]);

  return (
    <>
      {isBookmarked ? (
        <TouchableOpacity
          onPress={() => {
            Toast.show("Recipe is already bookmarked.", Toast.LONG);
          }}
          style={{ marginHorizontal: 15 }}
        >
          <BookmarkIconActive height={32} width={32} />
        </TouchableOpacity>
      ) : (
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
          style={{ marginHorizontal: 15 }}
        >
          <BookmarkIcon height={32} width={32} />
        </TouchableOpacity>
      )}
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
