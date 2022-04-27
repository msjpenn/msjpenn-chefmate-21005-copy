import React, { useEffect } from "react";
import { Image, StyleSheet, View, BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import * as AppStyles from "../../../components/appStyles";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { doneRecipe } from "../../../store/recipeCreation/actions";
import { useNavigation } from "@react-navigation/native";

const RecreateSuccessScreen = ({ navigation }) => {
  const nav = useNavigation();

  const dispatch = useDispatch();

  const doneRecipes = () => {
    dispatch(doneRecipe(""));
    nav.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  return (
    <>
      <MainView>
        <MainText>Your recipe was {"\n"}successfully uploaded!</MainText>
        <SubText>
          We must review your recipe and {"\n"}will let you know immediately
          when {"\n"}recipe is published.
        </SubText>

        <View style={{ marginVertical: wp("5") }} />
        <SubText>Your Team at</SubText>

        <Image
          source={require("../../../assets/images/chefmate-logo.png")}
          style={{ marginVertical: wp("5") }}
        />
        <NextButton onPress={doneRecipes}>
          <NextButtonText>Close</NextButtonText>
        </NextButton>
      </MainView>
    </>
  );
};

const MainView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;
const NextButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-family: Nunito;
  font-weight: 600;
  position: absolute;
`;

const NextButton = styled.TouchableOpacity`
  height: 50;
  color: white;
  font-size: 16px;
  font-family: Nunito;
  line-height: 20px;
  align-items: center;
  border-color: #61baac;
  border-width: 1px;
  width: 80%;
  border-radius: 14px;
  justify-content: center;
  padding-vertical: 3%;
  background-color: #61baac;
  flex-direction: row;
  position: absolute;
  bottom: 50px;
`;

const SubText = styled.Text`
  margin-top: 5%;
  /* Content P SEMI */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  display: flex;
  align-items: center;
  text-align: center;

  /* Gray - 1 */

  color: #4c4c4c;
  opacity: 0.8;
`;

const MainText = styled.Text`
  margin-top: 25%;
  /* Content H1 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 25px;
  /* or 132% */

  text-align: center;

  /* Black */

  color: #000000;
`;

export default RecreateSuccessScreen;

const styles = StyleSheet.create({
  loginOptionsContainer: {
    backgroundColor: AppStyles.appBackgroundColor,
    //paddingTop: "10%",
    marginHorizontal: "8%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  mainContentBox: {
    marginVertical: "50%",
    alignItems: "center",
  },
  headingBox: {
    marginVertical: "3%",
  },
  headingText: {
    fontFamily: AppStyles.FONT_FAMILY,
    fontSize: 19,
    fontStyle: "normal",
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  headingSubTxtBox: {
    marginTop: "2%",
  },
  teamAtChefmateBox: {
    marginTop: "0%",
  },
  headingSubText: {
    fontSize: 15,
    color: "#4C4C4C",
    alignItems: "center",
    textAlign: "center",
    fontFamily: AppStyles.FONT_FAMILY,
    lineHeight: 25,
  },
});
