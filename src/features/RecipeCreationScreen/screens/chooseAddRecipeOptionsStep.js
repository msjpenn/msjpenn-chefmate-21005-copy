import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as AppStyles from "../../../config/appStyles";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { doAddType } from "./../../../store/recipeCreation/actions";
import { typesOfRecipe } from "./../../../store/recipeCreation/constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const app = (props) => {
  const { navigation, route } = props;
  console.log("recipeId", { ...route?.params });
  const dispatch = useDispatch();

  const handleNavigate = (navigate, type) => {
    dispatch(doAddType(type));
    navigation.navigate(navigate, {
      ...route.params,
    });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: AppStyles.headerBackgroundColor,
          borderTopColor: AppStyles.headerBackgroundColor,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Text style={styles.headText}>
            Now please select one of the {"\n"}
            options below:
          </Text>

          <ButtonView>
            <TouchableOpacity
              style={styles.optionsTouchable}
              onPress={() =>
                handleNavigate("AddByURLScreen", typesOfRecipe.LINK)
              }
            >
              <View style={{ paddingHorizontal: "3%" }}>
                <Image source={require("../../../assets/images/Group.png")} />
              </View>
              <View style={{ marginLeft: "5%" }}>
                <Text style={styles.optionsText}>Link to recipe</Text>
                <Text style={styles.optionsSubText}>
                  Recipe is already published online {"\n"}and I will provide
                  link
                </Text>
              </View>
              <Image
                style={{ marginLeft: "15%" }}
                source={require("../../../assets/images/Vector.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionsTouchable}
              onPress={() =>
                handleNavigate("AddByPictureHomeScreen", typesOfRecipe.PHOTO)
              }
            >
              <View style={{ paddingHorizontal: "3%" }}>
                <Image source={require("../../../assets/images/Frame.png")} />
              </View>
              <View style={{ marginLeft: "5%" }}>
                <Text style={styles.optionsText}>Provide photo</Text>
                <Text style={styles.optionsSubText}>
                  I will provide photo of a printed or {"\n"}hand written recipe
                </Text>
              </View>
              <Image
                style={{ marginLeft: "15%" }}
                source={require("../../../assets/images/Vector.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionsTouchable}
              onPress={() =>
                handleNavigate(
                  "AddRecipeManuallyDescription",
                  typesOfRecipe.RECIPE
                )
              }
            >
              <View style={{ paddingHorizontal: "3%" }}>
                <Image
                  source={require("../../../assets/images/TextField.png")}
                />
              </View>
              <View style={{ marginLeft: "5%" }}>
                <Text style={styles.optionsText}>Enter recipe</Text>
                <Text style={styles.optionsSubText}>
                  I will enter a recipe from scratch {"\n"}with ingredients and
                  instructions
                </Text>
              </View>
              <Image
                style={{ marginLeft: "15%" }}
                source={require("../../../assets/images/Vector.png")}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.optionsTouchable}
              onPress={() => handleNavigate("RecordTitle", typesOfRecipe.AUDIO)}
            >
              <View style={{ paddingHorizontal: "3%" }}>
                <Image source={require("../../../assets/images/audio.png")} />
              </View>
              <View style={{ marginLeft: "5%" }}>
                <Text style={styles.optionsText}>Audio record</Text>
                <Text style={styles.optionsSubText}>
                  Audio recording of your recipe
                </Text>
              </View>
              <Image
                style={{ marginLeft: "15%" }}
                source={require("../../../assets/images/Vector.png")}
              />
            </TouchableOpacity> */}
          </ButtonView>
        </View>
      </View>
    </>
  );
};

const ButtonView = styled.View`
  margin-top: 10%;
  height: 300px;
  /* background: red; */
  top: 4px;
`;

export default app;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppStyles.appBackgroundColor,
  },
  headText: {
    left: "0%",
    right: "0%",
    top: "1%",
    bottom: "0%",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: 25,
    textAlign: "center",
    color: "#000000",
    marginTop: hp(3),
  },
  optionsView: {
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
  },
  optionsTouchable: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1,
    borderBottomColor: "#E6E6E6",
    borderBottomWidth: 1,
  },
  optionsText: {
    alignItems: "center",
  },
  optionsSubText: {
    alignItems: "center",
    fontWeight: "600",
    fontSize: 14,
    color: "#A9A9A9",
  },
});
