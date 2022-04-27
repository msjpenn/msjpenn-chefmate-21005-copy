import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
import CBTextInput from "../../../components/TextInput";
import { ScrollView } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import * as status from "../../../store/constants";
import { customApiService } from "../../../store/profile/services";
import { useFocusEffect } from "@react-navigation/native";
import validateEmail from "../../../utils/validateEmail";
import Toast from "react-native-simple-toast";
import { DO_UPLOADIMAGE } from "../../../store/profile/constants";

const EditProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  const [username, set] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.user_image);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [phonenum, setPhonenumber] = useState(user?.phone || "");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);

  const [showEmailError, setShowEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState(
    "Please enter a valid email!"
  );

  const [showPhoneNumError, setPhonNumError] = useState(false);
  const [phoneNumErrorMsg, setPhonErrorMsg] = useState(
    "Please enter a valid phone number!"
  );
  const [isLoading, setIsLoading] = useState(false);

  const uploadUserProfile = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxHeight: 200,
        maxWidth: 200,
        includeBase64: true,
      },
      (response) => {
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
        setImage(response);

        dispatch({
          type: DO_UPLOADIMAGE,
          email: user.email,
          image: response.base64,
        });
        // setIsImageChanged(true);
        // setIsImageChanged(true);
      }
    );
  };

  const updateProfile = () => {
    console.log("updateProfile");

    if (!username) {
      setShowUsernameError(true);
      return;
    }

    if (!name) {
      setShowNameError(true);
      return;
    }

    if (!validateEmail(email)) {
      setShowEmailError(true);
      return;
    }

    if (username && name && email) {
      updateUserDetails();
    }

    if (phonenum) {
      updateUserPhone();
    }
    Toast.show("Profile saved successfully", Toast.LONG);
  };

  async function updateUserDetails() {
    const payload = {
      email: email,
      name: name,
      username: username,
      id: user?.id,
    };
    try {
      const res = customApiService.doUpdateProfile(payload);
      console.log("res updateUserDetails", res);
    } catch (error) {
      console.error("error updateUserDetails", error);
    }
  }

  async function updateUserPhone() {
    const payload = {
      email: email,
      phone: phonenum,
    };

    try {
      const res = customApiService.doEditPhone(payload);
      console.log("res updateUserPhone", res);
    } catch (error) {
      console.error("error updateUserPhone", error);
    }
  }

  return (
    <>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <CBHeader title={"Edit Profile"} navigation={navigation} />
        <KeyboardAvoidingView
          style={[
            AppStyles.styles.scrollHolderForHeaderScreen,
            {
              flex: 1,
              marginTop: 10,
              paddingTop: 15,
              paddingHorizontal: 10,
              alignItems: "center",
            },
          ]}
          behavior={"padding"}
        >
          <ScrollView
            bounces={false}
            style={[
              AppStyles.styles.scrollHolderForHeaderScreen,
              {
                width: "100%",
                marginTop: 10,
                paddingTop: 15,
              },
            ]}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.mainForm}>
              <View style={{ width: 80, height: 80, alignSelf: "center" }}>
                {image == null ? (
                  <View
                    style={{
                      borderRadius: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#E6E6E6",
                      overflow: "hidden",
                      width: 80,
                      height: 80,
                    }}
                  >
                    <Text
                      style={{
                        textAlignVertical: "center",
                        alignSelf: "center",
                        textAlign: "center",
                        fontSize: 34,
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {name?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                ) : (
                  <Image
                    resizeMode="cover"
                    style={{
                      borderRadius: 40,
                      backgroundColor: "#E6E6E6",
                      overflow: "hidden",
                      width: 80,
                      height: 80,
                    }}
                    source={{ uri: image.uri ? image.uri : image }}
                  />
                )}
                <Icon
                  onPress={uploadUserProfile}
                  name="pencil"
                  size={15}
                  color="white"
                  style={{
                    position: "absolute",
                    bottom: 5,
                    left: 60,
                    padding: 5,
                    width: 25,
                    height: 25,
                    backgroundColor: "#000",
                    borderRadius: 12.5,
                    overflow: "hidden",
                  }}
                />
              </View>
            </View>

            <View style={styles.mainForm}>
              <CBTextInput
                value={name}
                label="Name"
                showError={showNameError}
                errorMessage="Please enter a valid name."
                onChangeText={(value) => {
                  setName(value);
                }}
              ></CBTextInput>
            </View>
            <View style={styles.mainForm}>
              <CBTextInput
                value={username}
                label="Username"
                showError={showUsernameError}
                errorMessage="An account with this username already exists!"
                onChangeText={(value) => {
                  set(value);
                }}
              ></CBTextInput>
            </View>
            <View style={styles.mainForm}>
              <CBTextInput
                value={email}
                label="Email"
                showError={showEmailError}
                errorMessage={emailErrorMsg}
                onChangeText={(value) => {
                  setEmail(value);
                }}
              ></CBTextInput>
            </View>
            {/* 
          <View style={styles.mainForm}>
                <CBTextInput value={username} label="Password" showError={showUsernameError} errorMessage="An account with this username already exists!" onChangeText={(value) => {set(value)}}></CBTextInput>
          </View> */}
            <View style={styles.mainForm}>
              <CBTextInput
                value={phonenum}
                label="Phone number"
                showError={showPhoneNumError}
                errorMessage={phoneNumErrorMsg}
                onChangeText={(value) => {
                  setPhonenumber(value);
                }}
                keyboardType="numeric"
              ></CBTextInput>
            </View>

            <TouchableOpacity
              onPress={updateProfile}
              activeOpacity={0.7}
              style={{
                width: "90%",
                marginTop: 25,
                alignSelf: "center",
                borderRadius: 15,
                backgroundColor: AppStyles.headerBackgroundColor,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  textAlignVertical: "center",
                  paddingVertical: 15,
                  fontSize: 14,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Update Profile
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {isLoading && (
        <View style={AppStyles.styles.activityIndicatorContainer}>
          <ActivityIndicator
            size={"large"}
            color={AppStyles.headerBackgroundColor}
          />
        </View>
      )}
    </>
  );
};

export default EditProfileScreen;

const SText = styled.Text`
  /* Content P SEMI */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  /* Gray - 1 */

  color: #4c4c4c;
`;

const styles = StyleSheet.create({
  mainForm: {
    paddingVertical: 10,
    width: "90%",
    alignSelf: "center",
  },
});
