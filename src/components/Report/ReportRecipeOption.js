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
import { styles } from "./styles";

export const ReportRecipeOption = ({ recipeDetail }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const [reason, setReason] = useState(null);
  const [reasonType, setReasonType] = useState(null);

  const performReportRecipe = () => {
    setIsLoading(true);
    console.log(user.id, recipeDetail);
    customApiService
      .doReportRecipe({
        user: user == null ? 0 : user.id,
        recipe: recipeDetail.recipeId,
        reason: reason,
      })
      .then((resp) => {
        console.log(resp);
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
            source={require("../../assets/icons/iconFlag.png")}
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
      <SafeAreaView style={{ height: 200 }}></SafeAreaView>
    </>
  );
};
