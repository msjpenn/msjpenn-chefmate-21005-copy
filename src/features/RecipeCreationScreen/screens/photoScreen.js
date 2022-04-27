import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import * as AppStyles from "../../../components/appStyles";
import Header from "../../../components/AddRecipeHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const app = ({ navigation }) => {
  const data = useSelector((state) => state.recipeCreationReducer?.image);
  const subText =
    "Your photo was successfully uploaded. \n Continue or take another shot.";

  const handleSubmit = (_) => {
    navigation.navigate("AddTitleScreen");
  };

  return (
    <Header>
      <View style={{ marginTop: hp("3"), alignSelf: "center" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: RFPercentage("3.5"),
            fontWeight: "bold",
          }}
        >
          Great Job!
        </Text>
        <Text style={{ fontSize: RFPercentage("2"), textAlign: "center" }}>
          {subText}
        </Text>
      </View>

      <ScrollView
        style={{
          marginTop: hp("5"),
          paddingHorizontal: 15,
          maxHeight: hp("50%"),
        }}
      >
        <Image
          source={{ uri: data.uri }}
          style={{
            width: "100%",
            height: 320,
            borderRadius: 12,
          }}
        />
      </ScrollView>
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ textDecorationLine: "underline" }}>
            Remove this image and {"\n"} take another shot
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 15, marginTop: "15%" }}>
        <TouchableOpacity
          style={AppStyles.styles.buttonPrimary}
          onPress={() => handleSubmit()}
        >
          <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
          <Arrow source={require("../../../assets/images/white_arrow.png")} />
        </TouchableOpacity>
      </View>
    </Header>
  );
};

export default app;

const ButtonView = styled.View`
  /* margin-top: 15%; */
  margin-left: 5%;
  margin-right: 5%;
  flex: 1;
  flex-direction: row;
  /* margin: 20px 25px; */
`;

const Arrow = styled.Image`
  margin-left: 80%;
`;

const BottomText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  /* or 129% */

  text-align: center;
  text-decoration-line: underline;

  /* Gray - 2 */

  color: #999999;
`;

const BottomTextView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  /* margin-top: 130px; */
`;

const Photo = styled.ImageBackground`
  width: 345px;
  height: 345px;
  /* top: 240px; */
`;

const PhotoView = styled.View`
  top: 15.09%;
  margin: 0px 20px;
`;

const styles = StyleSheet.create({});
