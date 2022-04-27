import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Header from "../../../components/AddRecipeHeader";
import { doAddPhoto } from "./../../../store/recipeCreation/actions";
import DocumentPicker from "react-native-document-picker";
import { Button } from "react-native-paper";
import * as AppStyles from "../../../components/appStyles";
import AddImageIcon from "../../../assets/svg/AddImageIcon.svg";
import TakeAPhoto from "../../../assets/svg/TakeAPhoto.svg";
import TypeIcon from "../../../assets/svg/TypeIcon.svg";
import IIcon from "react-native-vector-icons/Ionicons";

const app = ({ route, navigation }) => {
  const dispatch = useDispatch();

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
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log("Response = ", response);
        if (response.didCancel) {
          alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }
        dispatch(doAddPhoto(response));
        console.log("base64 -> ", response.base64);
        console.log("uri -> ", response.uri);
        console.log("width -> ", response.width);
        console.log("height -> ", response.height);
        console.log("fileSize -> ", response.fileSize);
        console.log("type -> ", response.type);
        console.log("fileName -> ", response.fileName);
        goToNextPage(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      dispatch(doAddPhoto(response));
      console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);
      goToNextPage(response);

      // setFile(response);
    });
  };

  const goToNextPage = () => {
    navigation.navigate("AddByPhotoScreenTwo");
  };

  const getDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.doc],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
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

          <TouchableOpacity
            style={styles.listContainer}
            onPress={() => getDoc()}
          >
            <View style={styles.iconContainer}>
              <TypeIcon height={40} width={40} />
              <Text style={styles.itemText}>Upload a document</Text>
            </View>
            <IIcon name="chevron-forward" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default app;

const styles = StyleSheet.create({
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
