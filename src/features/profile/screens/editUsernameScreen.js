import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  DO_RESETUSERNAME,
  DO_UPLOADIMAGE,
} from "../../../store/profile/constants";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import CBTextInput from "../../../components/TextInput";
import CBActionStatus from "../../../components/ActionStatus";
import { launchImageLibrary } from "react-native-image-picker";
import { LOADING, SUCCESS, FAILED } from "../../../store/constants";
import CBAvatar from "../../../components/Avatar";
import { customApiService } from "../../../store/profile/services";

const prepareUserName = (textString) => {
  if (!textString) return "";
  const text = textString.trim();
  const textSplit = text.split(" ");
  if (textSplit.length <= 1) return text.toLowerCase();
  let initials = textSplit[0] + textSplit[1];
  initials = initials.toLowerCase();
  return initials;
};

const EditUsernameScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const resetUsernameStatus = useSelector(
    (state) => state.profileReducer.resetUsername.status
  );
  const errorMessage = useSelector(
    (state) => state.profileReducer.resetUsername.errorMessage
  );

  const user = useSelector((state) => state.authReducer.user);
  const [image, setImage] = React.useState(null);
  // const [username, setUsername] = React.useState(
  //   user != null && user.name != null && user.name != ""
  //     ? "chef" + user.id + prepareUserName(user.name)
  //     : null
  // );

  const [username, setUsername] = React.useState(
    user && user.name ? user.name.split(" ")[0] : ""
  );

  const [showUsernameError, setShowUsernameError] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(null);

  const handleChangeUsername = async () => {
    if (image?.base64) {
      dispatch({
        type: DO_UPLOADIMAGE,
        email: user.email,
        image: image.base64,
      });
    }
    try {
      const res = await customApiService.doResetUsername({
        userId: user.id,
        username: username,
      });
      navigation.navigate("EditPhoneScreen");
    } catch (error) {
      console.log(error?.data);
      if (error?.data?.username[0]) {
        setUsernameError(error?.data?.username[0]);
        setShowUsernameError(true);
      }
      console.log("eroor", error);
    }
  };

  const renderImageBrowser = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setModalVisible(false);
        setImage(response);
      }
    );
  };
  const showImageAccessModal = () => {
    setModalVisible(true);
  };

  const getAvatarDefaultText = () => {
    let defaultText = "";
    if (user.name != "") {
      defaultText = user.name.slice(0, 2);
      if (user.name.indexOf(" ") > 0) {
        let names = user.name.split(" ");
        defaultText = names[0].slice(0, 1) + names[1].slice(0, 1);
      }
    }
    return defaultText.toUpperCase();
  };

  React.useEffect(() => {
    if (resetUsernameStatus == SUCCESS) {
      navigation.navigate("ProfileScreenSet", {
        screen: "EditPhoneScreen",
      });
    }
  }, [resetUsernameStatus]);

  const CancelBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }}
      >
        <Text style={{ color: "#fff", marginRight: 10 }}>Cancel</Text>
      </TouchableOpacity>
    );
  };

  const getModalScreenFragment = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
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
              <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
                <Text style={AppStyles.styles.content_h1}>
                  Access your photos and videos from Chefmate
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
                  <Image
                    source={require("../../../assets/icons/iconKey.png")}
                  ></Image>
                  <Text
                    style={[
                      AppStyles.styles.content_listdescription,
                      { paddingHorizontal: 25, textAlign: "left" },
                    ]}
                  >
                    You’ll be given options to access all your photos from Chef
                    Mate or manually select a few.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
                  <Image
                    source={require("../../../assets/icons/iconLock.png")}
                  ></Image>
                  <Text
                    style={[
                      AppStyles.styles.content_listdescription,
                      { paddingHorizontal: 25, textAlign: "left" },
                    ]}
                  >
                    You’re in control. You decide what photos and videos you
                    share.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
                  <Image
                    source={require("../../../assets/icons/iconPicFrame.png")}
                  ></Image>
                  <Text
                    style={[
                      AppStyles.styles.content_listdescription,
                      { paddingHorizontal: 25, textAlign: "left" },
                    ]}
                  >
                    It’s easier to share in Chef Mate when you can access your
                    whole camera roll.
                  </Text>
                </View>
              </View>
              <View style={AppStyles.styles.filler}></View>
              <Text
                style={[
                  AppStyles.styles.content_smallprint,
                  { paddingHorizontal: 40, marginBottom: 25 },
                ]}
              >
                Select{" "}
                <Text
                  style={{ fontWeight: "700", color: AppStyles.COLOR_GRAY_1 }}
                >
                  Allow Access to All Photos
                </Text>{" "}
                to access your whole camera roll from Chef Mate.
              </Text>
              <TouchableOpacity
                style={AppStyles.styles.buttonPrimary}
                onPress={() => renderImageBrowser()}
              >
                <Text style={AppStyles.styles.buttonPrimaryText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={[AppStyles.styles.safeAreaContentStyle]}>
        <CBHeader
          title="Profile Settings"
          navigation={navigation}
          rightComponent={<CancelBtn />}
        />
        <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
          <View
            style={[styles.loginOptionsContainer]}
            style={AppStyles.styles.scrollContentContainerOfHeaderScreen}
          >
            <View style={styles.headingBox}>
              <View>
                <Text style={AppStyles.styles.content_h1}>
                  Upload your profle image and pick a username
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", padding: 30 }}>
              <View>
                {image == null ? (
                  <CBAvatar
                    size={100}
                    style={styles.avtar}
                    label={getAvatarDefaultText()}
                  ></CBAvatar>
                ) : (
                  <CBAvatar
                    size={100}
                    imageSource={{ uri: image.uri != null ? image.uri : "" }}
                    style={styles.avtar}
                    label={getAvatarDefaultText()}
                  ></CBAvatar>
                )}
                <View
                  style={{
                    borderRadius: 40,
                    position: "absolute",
                    backgroundColor: "black",
                    borderWidth: 4,
                    borderColor: AppStyles.appBackgroundColor,
                    bottom: -10,
                    right: -10,
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="pencil"
                    size={25}
                    color="white"
                    onPress={() => showImageAccessModal()}
                  ></Icon>
                </View>

                {getModalScreenFragment()}
              </View>
            </View>
            <View style={styles.mainForm}>
              <CBTextInput
                value={username}
                label="Username"
                showError={showUsernameError}
                errorMessage={usernameError}
                onChangeText={(value) => {
                  setUsername(value);
                }}
              ></CBTextInput>
            </View>

            {/* <CBActionStatus
              status={resetUsernameStatus}
              errorMessage={errorMessage}
            ></CBActionStatus> */}

            <View style={styles.infoMessageBox}>
              <Text style={AppStyles.styles.content_smallprint}>
                {" "}
                You can always change your username inside profile settings
              </Text>
            </View>
            <View style={AppStyles.styles.filler}></View>
            <TouchableOpacity
              onPress={() => handleChangeUsername()}
              title="Next"
              style={AppStyles.styles.buttonPrimary}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
            </TouchableOpacity>
            <View style={{ height: 50 }}></View>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};

export default EditUsernameScreen;

const styles = StyleSheet.create({
  headingBox: {
    marginTop: "3%",
    alignItems: "center",
    textAlign: "center",
  },
  mainForm: {
    marginTop: "2%",
    paddingVertical: 10,
  },
  infoMessageBox: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  avtar: {
    backgroundColor: AppStyles.COLOR_GRAY_5,
    borderWidth: 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalTop: {
    backgroundColor: "black",
    flex: 1,
    opacity: 0.6,
    backgroundColor: "black",
  },
  modalView: {
    flex: 3.5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 0,
  },
  modalViewContent: {
    borderRadius: 25,
    borderWidth: 0,
    padding: 25,
    width: "100%",
    flex: 1,
    backgroundColor: AppStyles.appBackgroundColor,
  },
});
