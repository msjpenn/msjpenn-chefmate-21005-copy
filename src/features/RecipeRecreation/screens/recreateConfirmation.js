import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";

import styled from "styled-components/native";

import Header from "../../../components/AddRecipeHeader";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import { customApiService } from "../../../store/recipe/services";
import { setRecipeDetails } from "../../../store/recipeCreation/actions";
import { doAddImage } from "./../../../store/recipeCreation/actions";

const RecreateConfirmationScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { imageData, recipeDetails } = route.params;
  const [publishStatus, setPublishStaus] = React.useState(false);
  console.log("recipeDetails==>", imageData, recipeDetails);
  const publishPost = async () => {
    try {
      let file = {
        name: imageData.fileName,
        type: imageData.type,
        uri:
          Platform.OS === "android"
            ? imageData.uri
            : imageData.uri.replace("file://", ""),
      };
      let payload = {
        file: file,
        recipeId: recipeDetails?.recipeDetail?.recipeId,
      };
      let result = await customApiService.doPostRecreationImages(payload);
      setPublishStaus(true);
      console.log("result=>", result);
    } catch (error) {
      console.log("error=>", error.response);
    }
  };

  const editOrignalRecipe = () => {
    dispatch(setRecipeDetails(recipeDetails?.recipeDetail));
    dispatch(doAddImage(imageData));
    navigation.navigate("RecreactionAddIngredientSectionScreen");
  };

  const publish = () => {
    console.log("imageData", imageData);
    // if (imageData?.uri) {
    dispatch(setRecipeDetails(recipeDetails?.recipeDetail));
    dispatch(doAddImage(imageData));
    navigation.navigate("RecreateWithoutEditScreen", {
      recipeId: recipeDetails?.recipeDetail?.recipeId,
    });
    // } else {
    // navigation.navigate("RecreateUploadOptionsScreen");
    // }
  };

  return (
    <>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <Header>
          <>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 30,
                height: "30%",
                flexDirection: "column",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <HText>
                In case you made any changes, edit any ingredients or
                instructions you are able to recreate an original recipe ...
              </HText>
              {publishStatus && (
                <HSubText>
                  Your photo was successfully uploaded. Continue or take another
                  shot.
                </HSubText>
              )}
            </View>

            <View
              style={{
                marginTop: 5,
                padding: 35,
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                style={[
                  AppStyles.styles.buttonPrimary,
                  { width: "50%", marginRight: 5 },
                ]}
                onPress={publish}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontFamily: "Nunito",
                    fontWeight: "600",
                    position: "absolute",
                  }}
                >
                  Publish Recipe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  AppStyles.styles.buttonPrimary,
                  { width: "50%", marginLeft: 5, paddingHorizontal: 10 },
                ]}
                onPress={editOrignalRecipe}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontFamily: "Nunito",
                    fontWeight: "600",
                    position: "absolute",
                  }}
                >
                  Edit Original Recipe
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </Header>
      </SafeAreaView>
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
  /* Content H1 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 25px;
  /* or 132% */

  /* Black */

  color: #000000;

  /* Inside Auto Layout */

  flex: none;
  flex-grow: 0;
  margin: 0px 10px;
`;

const HSubText = styled.Text`
  /* ListDescription */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  /* or 136% */

  display: flex;
  align-items: center;
  /* Gray - 1 */

  color: #4c4c4c;
  opacity: 0.8;
  margin: 10px 0px;
`;

export default RecreateConfirmationScreen;

const styles = StyleSheet.create({});
