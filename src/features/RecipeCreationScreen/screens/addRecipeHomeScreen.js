import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import * as AppStyles from "../../../components/appStyles";
import {
  doAddImage,
  setRecipeDetails,
} from "./../../../store/recipeCreation/actions";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  doDeleteAllDrafts,
  doDeleteDraft,
} from "./../../../store/drafts/actions";
import Toast from "react-native-simple-toast";
import defaultImage from "../../../assets/images/default-image2.jpg";
import AddImageIcon from "../../../assets/svg/AddImageIcon.svg";
import TakeAPhoto from "../../../assets/svg/TakeAPhoto.svg";
import IIcon from "react-native-vector-icons/Ionicons";

const app = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const draftState = useSelector((state) => state.draftReducer);
  const [showSkipBTN, setStatusToShowSkipBTN] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  // const [drafts] = useState(draftState.drafts);

  console.log("route?.params?.from==", route.params);
  const [drafts, setDrafts] = useState(draftState.drafts);

  useEffect(() => {
    console.log("route?.params?.from==", route.params.redirectImage);
    if (route.params.redirectImage === "addInstructionsSection") {
      setStatusToShowSkipBTN(false);
    } else {
      setStatusToShowSkipBTN(true);
    }
  }, [route.params]);

  useEffect(() => {
    setDrafts(draftState.drafts);
  }, [draftState.drafts]);

  const requestCameraPermission = async () => {
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
  };

  const requestExternalWritePermission = async () => {
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
  };

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
        dispatch(doAddImage(response));
        if (
          typeof route.params?.from != "undefined" &&
          route.params?.from == "finalStepOne"
        ) {
          navigation.goBack();
        } else {
          goToNextPage();
        }
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
      console.log("image", response);
      dispatch(doAddImage(response));
      // console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);

      if (showSkipBTN) {
        goToNextPage();
      } else {
        navigation.navigate("FinalStepOne");
      }
    });
  };

  const goToNextPage = () => {
    navigation.navigate("PhotoScreen");
  };

  const handleSubmit = async () => {};

  const deleteDraft = (draftId) => {
    dispatch(doDeleteDraft(draftId));
    Toast.show("Draft delete successfully", Toast.LONG);
  };

  const loadRecipe = (recipeData) => {
    dispatch(setRecipeDetails(recipeData));
    goToNextPage();
  };

  const deleteAllDrafts = () => {
    dispatch(doDeleteAllDrafts());
  };

  const emptyDrafts = () => {
    return <Text style={styles.emptyDraftText}>Your draft is empty</Text>;
  };

  const renderDraft = (item, loadRecipe) => {
    const {
      draftId,
      image,
      title,
      draftDate,
      recipeId,
      total_hours_to_make,
      description,
      rating,
      serving_size,
      category,
      section,
      url,
    } = item.item;

    const recipeData = {
      draftId: draftId,
      draftDate: draftDate,
      image: image,
      recreatedFrom: recipeId,
      recipeTitle: title,
      time: total_hours_to_make,
      total_hours_to_make: total_hours_to_make,
      description: description,
      rating: rating,
      sections: section,
      serving_size: serving_size,
      category: category,
      url: url,
    };

    return (
      <TouchableOpacity onPress={() => loadRecipe(recipeData)}>
        <View style={styles.renderDraftContainer}>
          <View style={{ margin: 15 }}>
            <Photo
              source={image?.uri ? { uri: image.uri } : defaultImage}
              imageStyle={{ borderRadius: 10 }}
            />
          </View>
          <View style={styles.renderDraftDetails}>
            <View style={{ margin: 15 }}>
              <RecipeDraftTitleText style={styles.recipeDraftTitle}>
                {title.slice(0, 6)}
              </RecipeDraftTitleText>
              <RecipeDraftDateText style={styles.recipeDraftDate}>
                {draftDate}
              </RecipeDraftDateText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => deleteDraft(draftId)}
            style={styles.deleteDraftIcon}
          >
            <Icon
              name="trash-o"
              size={24}
              color="red"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
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
          <TouchableOpacity
            style={styles.listContainer}
            onPress={() => chooseFile("photo")}
          >
            <View style={styles.iconContainer}>
              <AddImageIcon height={40} width={40} />
              <Text style={styles.itemText}>Upload from gallery</Text>
            </View>
            <IIcon name="chevron-forward" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listContainer}
            onPress={() => captureImage("photo")}
          >
            <View style={styles.iconContainer}>
              <TakeAPhoto height={40} width={40} />
              <Text style={styles.itemText}>Take a photo(s)</Text>
            </View>
            <IIcon name="chevron-forward" size={24} />
          </TouchableOpacity>

          <ButtonBottomText>
            Note: you must be an owner of the photo you are {"\n"}
            about to upload.
          </ButtonBottomText>

          {showSkipBTN ? (
            <View style={styles.bottomTextView}>
              <Text
                style={styles.skipText}
                onPress={() => navigation.navigate("AddTitleScreen")}
              >
                Skip this step
              </Text>
              <Text style={styles.skipTextSub}>
                Skip this step for now and add photo later
              </Text>
            </View>
          ) : (
            <View />
          )}

          {showSkipBTN ? (
            <View style={{ flex: 1 }}>
              <View style={styles.draftHeader}>
                <Text style={styles.seeDraft}>
                  See Drafts ({drafts?.length})
                </Text>

                <TouchableOpacity onPress={deleteAllDrafts}>
                  <Text style={styles.deleteAllDrafts}>Clear All</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }}>
                <FlatList
                  data={drafts}
                  renderItem={(item) => renderDraft(item, loadRecipe)}
                  keyExtractor={(item) => item.draftId.toString()}
                  refreshing={refreshing}
                  onEndReachedThreshold={0.5}
                  ListEmptyComponent={emptyDrafts}
                />
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    </>
  );
};

export default app;

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
  },
  bottomTextView: {
    // top: "10.88%",
    alignItems: "center",
  },
  skipText: {
    // position: "absolute",
    textDecorationLine: "underline",
    fontFamily: "Nunito",
    fontStyle: "normal",
    color: "#999999",
    // bottom: "39.79%",
    marginTop: 50,
    fontWeight: "bold",
  },
  skipTextSub: {
    // position: "absolute",a
    fontFamily: "Nunito",
    fontStyle: "normal",
    color: "#999999",
  },
  emptyDraftText: {
    textDecorationLine: "underline",
    fontFamily: "Nunito",
    fontStyle: "normal",
    color: "#999999",
    // bottom: "39.79%",
    marginTop: 50,
    textAlign: "center",
  },
  draftHeader: {
    flexDirection: "row",
    marginTop: 50,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  seeDraft: {
    textDecorationLine: "underline",
    fontFamily: "Nunito",
    fontStyle: "normal",
    color: "#999999",
    fontWeight: "bold",
  },
  deleteAllDrafts: {
    textDecorationLine: "underline",
    fontFamily: "Nunito",
    fontStyle: "normal",
    color: "red",
    fontWeight: "bold",
  },
  renderDraftContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    alignContent: "center",
    // justifyContent: "space-between",
  },
  renderDraftDetails: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  deleteDraftIcon: {
    color: "red",
    alignSelf: "center",
    marginLeft: "20%",
    width: 50,
    height: 50,
  },
  bottomButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 150,
  },
  saveDraftButton: {
    height: 50,
    color: "black",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 20,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    width: 150,
    justifyContent: "center",
  },
  nextButton: {
    height: 50,
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 20,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    width: 150,
    borderRadius: 14,
    justifyContent: "center",
    paddingVertical: "3%",
    backgroundColor: "#61BAAC",
    flexDirection: "row",
  },
  arrowStyle: {
    marginLeft: "80%",
  },
  listContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  iconContainer: { flexDirection: "row", alignItems: "center" },
  itemText: {
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 30,
  },
  headText: {
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: 25,
    textAlign: "center",
    color: "#000000",
    marginVertical: 40,
  },
});
