import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Platform,
  PermissionsAndroid,
} from "react-native";

import styled from "styled-components/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Header from "../../../components/AddRecipeHeader";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Toast from "react-native-simple-toast";
import AddImageIcon from "../../../assets/svg/AddImageIcon.svg";
import TakeAPhoto from "../../../assets/svg/TakeAPhoto.svg";

const datasource = [
  {
    image: AddImageIcon,
    label: "Upload from gallery",
    id: 0,
  },
  {
    image: TakeAPhoto,
    label: "Take a photo(s)",
    id: 1,
  },
];

const RecreateUploadOptionsScreen = ({ route, navigation }) => {
  const ARROW = require("../../../assets/images/Vector.png");
  const [filePath, setFilePath] = React.useState({});

  const dispatch = useDispatch();

  const [items, setItems] = React.useState(datasource);

  useEffect(() => {
    const { recipeDetail } = route.params;
    console.log("recipeDetail", recipeDetail);
    console.log("recipeDetail", route.params);

    // dispatch(doSetRecreateRecipe(recipeDetail));
  }, [route.params]);

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log("Response = ", response);

        if (response.didCancel) {
          Toast.show("You cancelled camera picker", Toast.LONG);
          return;
        } else if (response.errorCode == "camera_unavailable") {
          Toast.show("Camera not available on device", Toast.LONG);
          return;
        } else if (response.errorCode == "permission") {
          Toast.show("Permission not satisfied", Toast.LONG);
          return;
        } else if (response.errorCode == "others") {
          Toast.show(`${response.errorMessage}`, Toast.LONG);
          return;
        }
        goToNextPage(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        Toast.show("You cancelled camera picker", Toast.LONG);
        return;
      } else if (response.errorCode == "camera_unavailable") {
        Toast.show("Camera not available on device", Toast.LONG);
        return;
      } else if (response.errorCode == "permission") {
        Toast.show("Permission not satisfied", Toast.LONG);
        return;
      } else if (response.errorCode == "others") {
        Toast.show(`${response.errorMessage}`, Toast.LONG);
        return;
      }
      // console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);
      goToNextPage(response);
    });
  };

  const goToNextPage = (data) => {
    navigation.navigate("RecreateUploadResultScreen", {
      data: data,
      recipeDetails: route.params,
    });
  };

  const selectItem = (data) => {
    if (data.item.id == 0) chooseFile("photo");
    else if (data.item.id == 1) captureImage("photo");
  };

  const skipAddImage = () => {
    const { recipeDetail } = route.params;

    navigation.navigate("RecreateConfirmationScreen", {
      recipeDetails: route.params,
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
            backgroundColor: "#F5F5F5",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Text style={styles.headText}>
            First you must upload {"\n"}
            photo(s) and / or video(s) of {"\n"}
            your recipe
          </Text>

          <ButtonView>
            <FirstButton onPress={() => chooseFile("photo")}>
              <AddImageIcon height={40} width={80} />

              <FirstButtonText>Upload from gallery</FirstButtonText>
              <ImageStyled
                source={require("../../../assets/images/Vector.png")}
              />
            </FirstButton>
            <SecondButton onPress={() => captureImage("photo")}>
              <TakeAPhoto height={40} width={80} />

              <FirstButtonText>Take a Photo / Video</FirstButtonText>
              <ImageStyled
                source={require("../../../assets/images/Vector.png")}
              />
            </SecondButton>
            <ButtonBottomText>
              Note: you must be an owner of the photo you are {"\n"}
              about to upload.
            </ButtonBottomText>
          </ButtonView>
        </View>
      </View>
    </>
  );
};

const ItemImage = styled.Image`
  margin-left: 15%;
`;

const ItemText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  width: 100px;
`;

const ItemTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const ItemView = styled.View`
  border: 0.5px solid #e6e6e6;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 70px;
`;

const FlatListItemSeparator = styled.View`
  height: 0.5px;
  width: 100%;
`;

const FlatListView = styled.View`
  top: 20%;
`;

const HeaderText = styled.Text`
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

const ButtonBottomText = styled.Text`
  /* position: absolute; */
  left: 2.67%;
  right: 10.67%;
  top: 5.51%;
  bottom: 0%;

  /* SmallPrint */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  /* margin: 40px; */
  line-height: 18px;
  /* or 150% */

  text-align: center;

  /* Gray - 2 */

  color: #999999;
`;

const ImageStyled = styled.Image`
  /* margin-left: 50px */
`;

const SecondButtonView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background: pink;
`;

const FirstButton = styled.TouchableOpacity`
  /* background: white; */
  width: 100%;
  height: 72px;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #e6e6e6;
`;

const SecondButton = styled.TouchableOpacity`
  /* background: red; */
  width: 100%;
  height: 72px;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #e6e6e6;
`;

const FirstButtonText = styled.Text`
  /* Content H2 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  align-items: center;

  color: #000000;
`;

const RecipeDraftTitleText = styled.Text`
  /* Content H2 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  align-items: center;

  margin-bottom: 10px;
  color: #000000;
`;

const RecipeDraftDateText = styled.Text`
  /* Content H2 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  align-items: center;

  color: #000000;
`;

const FirstButtonView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background: red;
  position: relative;
`;

const ButtonView = styled.View`
  /* margin-top: 10%; */
  height: 194px;
  /* background: red; */
  top: 24px;
`;

const Photo = styled.ImageBackground`
  width: 120px;
  height: 120px;
`;

const Text = styled.Text`
  /* Content H2 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  align-items: center;

  color: #000000;
`;

export default RecreateUploadOptionsScreen;

const styles = StyleSheet.create({
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
    marginVertical: 30,
  },
});

async function requestExternalWritePermission() {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "External Storage Write Permission",
          message: "App needs write permission",
        }
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert("Write permission err", err);
    }
    return false;
  } else return true;
}

async function requestCameraPermission() {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs camera permission",
        }
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
}
