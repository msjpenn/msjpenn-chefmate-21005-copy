import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Header from "../../../components/AddRecipeHeader";
import * as AppStyles from "../../../components/appStyles";
import { doAddImage } from "../../../store/recipeCreation/actions";

const RecreateUploadResultScreen = ({ route, navigation }) => {
  const { data, recipeDetails } = route.params;
  console.log("recipeDetails", recipeDetails, "data", data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doAddImage(data));
  }, []);

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <Header>
          <HText>Great Job!</HText>
          <HSubText>
            Your photo / video was successfully uploaded. {"\n"}
            Continue or take another shot.
          </HSubText>
          <ScrollView style={{ marginTop: 10 }}>
            <View style={{ marginTop: 100, paddingHorizontal: 15 }}>
              <Image
                source={{ uri: data.uri }}
                style={{ width: "100%", height: 320, borderRadius: 12 }}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{ marginTop: 36 }}
            onPress={() => {
              console.log("removing");
              navigation.goBack();
            }}
          >
            <Text style={styles.removeBtn}>Remove image</Text>
          </TouchableOpacity>
          {/* RecreateAddRatingScreen */}
          <View style={{ marginTop: 5, padding: 35 }}>
            <TouchableOpacity
              style={AppStyles.styles.buttonPrimary}
              onPress={() =>
                navigation.navigate("RecreateConfirmationScreen", {
                  imageData: data,
                  recipeDetails: recipeDetails,
                })
              }
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
            </TouchableOpacity>
          </View>
        </Header>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};

const AddPhotosText = styled.Text`
  color: #999999;
  position: absolute;
  left: 41.16%;
  /* right: 30.14%; */
  /* top: 28.33%; */
  /* bottom: 35%; */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
`;

const AddPhotosButton = styled.TouchableOpacity`
  position: absolute;
  left: 30.43%;
  right: 30.14%;
  top: 28.33%;
  bottom: 35%;
`;

const AddPhotosView = styled.View`
  position: absolute;
  left: 4.11%;
  right: 3.89%;
  top: 52%;
  bottom: 39.66%;
  background: #f2f2f2;
  border: 1px dashed #dddddd;
  border-radius: 10px;
`;

const ImageButton = styled.TouchableOpacity`
  width: 36px;
  left: 125.4px;
  height: 36px;
  position: relative;
`;

const ImageView = styled.View`
  position: absolute;
  top: 20%;
  flex: 1;
  flex-direction: column;
`;

const CrossImage = styled.Image`
  position: absolute;
  width: 36px;
  height: 36px;
`;

const ImageBackground = styled.ImageBackground`
  width: 165px;
  height: 165px;
  left: 20.4px;
`;

const HText = styled.Text`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 5%;
  bottom: 0%;

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

  /* Inside Auto Layout */

  flex: none;
  flex-grow: 0;
  margin: 0px 10px;
`;

const HSubText = styled.Text`
  position: relative;
  top: 10%;
  /* ListDescription */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  /* or 136% */

  display: flex;
  align-items: center;
  text-align: center;
  /* Gray - 1 */

  color: #4c4c4c;
  opacity: 0.8;
`;

export default RecreateUploadResultScreen;

const styles = StyleSheet.create({
  removeBtn: {
    ...AppStyles.styles.content_p_bold,
    color: AppStyles.COLOR_GRAY_2,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
