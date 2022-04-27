import React, { useCallback, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { doLogout } from "../../../store/auth/actions";
import { customApiService } from "../../../store/profile/services";
import { useFocusEffect } from "@react-navigation/native";
import { UPDATE_USER_PROFILE } from "../../../store/auth/constants";
import Toast from "react-native-simple-toast";

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const user = useSelector((state) => state.authReducer?.user);

  const [userData, setUserData] = useState({});
  const [pushNotificationEnable, setPushNotificationEnable] = useState(
    user?.push_notification
  );
  const [measurement, setMeasurement] = useState(
    user?.user_measurement_system || "metric"
  );
  const [isSwitchOn, setIsSwitchOn] = useState(
    user?.push_notification || false
  );

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const CHECKOUTLINE = require("../../../assets/images/CheckOutline.png");
  const CHECKFULL = require("../../../assets/images/CheckFull.png");

  const logoutUser = async () => {
    try {
      let results = await customApiService.doLogOut();
      if (results) {
        dispatch(doLogout());

        Toast.show("Successfully logged out!", Toast.LONG);
        navigation.navigate("FeedScreen");
      }
    } catch (error) {
      Alert.alert("Error!", error);
    }
  };

  const goToEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };

  const getProfile = async () => {
    try {
      const result = await customApiService.doGetOwnProfile(auth?.user?.id);
      // console.log(result, "this is result");
      setUserData(result);
      dispatch({ type: UPDATE_USER_PROFILE, payload: result });
      setPushNotificationEnable(
        result?.push_notification == null ? false : result?.push_notification
      );
      setMeasurement(result?.user_measurement_system);
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, [])
  );

  useEffect(() => {
    if (measurement !== user?.user_measurement_system) {
      const payload = {
        id: user.id,
        measurement_system: measurement,
        email: user?.email,
      };

      try {
        const res = customApiService.doEditMeasurement(payload);
        getProfile();
        Toast.show("Measurement system saved successfully", Toast.LONG);
      } catch (error) {
        console.log(error);
      }
    }
  }, [measurement]);

  useEffect(() => {
    if (isSwitchOn !== user?.push_notification) {
      editPushNotification();
    }
  }, [isSwitchOn]);

  async function editPushNotification() {
    try {
      const payload = {
        email: user.email,
        push_notifications: isSwitchOn,
      };
      console.log("paynload", payload);
      const result = await customApiService.editPushNotifications(payload);
      console.log(result);
      let message = isSwitchOn
        ? "Notification has been turned on"
        : "Notification has been turned off";

      Toast.show(message, Toast.LONG);
      getProfile();
    } catch (error) {}
  }

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <View>
          <CBHeader
            title={`${
              auth?.user?.name || auth?.user?.email?.match(/^([^@]*)@/)[1]
            }`}
            navigation={navigation}
            rightComponent={<View />}
          />
        </View>
        <View style={{ alignSelf: "center", justifyContent: "center" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              goToEditProfile();
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              overflow: "hidden",
              marginTop: 10,
              backgroundColor: "#A0A0A0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userData?.user_image == null ? (
              <Text style={{ fontSize: 34, color: "#fff" }}>
                {userData?.name?.charAt(0).toUpperCase()}
              </Text>
            ) : (
              <Image
                style={styles.profileImg}
                resizeMode="cover"
                source={{
                  uri: userData?.user_image,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        {userData && (
          <View style={styles.followerDetailsContainer}>
            <View style={styles.followerDetailsInnerContainer}>
              <SText>Recipes</SText>
              <MText>{userData?.recipe_count}</MText>
            </View>

            <View
              style={[styles.followerDetailsInnerContainer, styles.saprator]}
            >
              <SText>Followers</SText>
              <MText>{userData?.followers}</MText>
            </View>

            <View style={styles.followerDetailsInnerContainer}>
              <SText>Following</SText>
              <MText>{userData?.following}</MText>
            </View>
          </View>
        )}
        <ScrollView horizontal={false}>
          <View
            style={[
              AppStyles.styles.scrollHolderForHeaderScreen,
              { flex: 1, marginTop: 10, paddingTop: 15, paddingHorizontal: 10 },
            ]}
          >
            <ListText>My Profile</ListText>
            <View style={styles.checkBoxMainContainer}>
              <ListText>Measurement system</ListText>
              <TouchableOpacity
                onPress={() => {
                  setMeasurement("metric");
                }}
                style={styles.checkBoxContainer}
              >
                <Image
                  source={measurement === "metric" ? CHECKFULL : CHECKOUTLINE}
                />
                <ListText>Metric system</ListText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // dispatch({typ})
                  setMeasurement("customary");
                }}
                style={styles.checkBoxContainer}
              >
                <Image
                  source={
                    measurement === "customary" ? CHECKFULL : CHECKOUTLINE
                  }
                />
                <ListText>US customary system</ListText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
              style={styles.checkBoxMainContainer}
            >
              <ListText>Change password</ListText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkBoxMainContainer}
              onPress={() => {
                navigation.navigate("FeedbackScreen", {
                  userId: auth?.user?.id,
                });
              }}
            >
              <ListText>Send feedback</ListText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkBoxMainContainer}
              onPress={() => navigation.navigate("AboutScreen")}
            >
              <ListText>About</ListText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkBoxMainContainer}
              onPress={() => navigation.navigate("TermConditionScreen")}
            >
              <ListText>Terms & conditions</ListText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkBoxMainContainer}
              onPress={() => navigation.navigate("PrivacyPolicyScreen")}
            >
              <ListText>Privacy policy</ListText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkBoxMainContainer}
              onPress={() => navigation.navigate("CopyrightScreen")}
            >
              <ListText>Copyright</ListText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkBoxMainContainer}
              onPress={() => navigation.navigate("SupportScreen")}
            >
              <ListText>Support</ListText>
            </TouchableOpacity>
            <View style={styles.checkBoxMainContainer1}>
              <ListText>Push notifications</ListText>

              <Switch
                value={isSwitchOn}
                color={`${AppStyles.headerBackgroundColor}`}
                onValueChange={onToggleSwitch}
              />
            </View>

            <View style={styles.checkBoxMainContainer}>
              <ListText
                style={{ textAlign: "center", width: "100%", marginBottom: 20 }}
                onPress={() => {
                  logoutUser();
                }}
              >
                Logout
              </ListText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  topRecipeName: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  roundContainer: {
    width: "90%",
    height: 65,
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 2,
    padding: 10,
  },
  checkBoxContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkBoxMainContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: AppStyles.COLOR_GRAY_5,
    paddingVertical: 15,
    marginVertical: 5,
  },
  checkBoxMainContainer1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: AppStyles.COLOR_GRAY_5,
    paddingVertical: 15,
    marginVertical: 5,
  },
  saprator: {
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 30,
  },
  followBtnContainer: {
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  followerDetailsContainer: {
    alignSelf: "center",
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginVertical: 10,
  },
  followerDetailsInnerContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputHint: {
    flex: 1,
  },
  input: {
    flex: 1,
    width: "100%",
  },
  moreIcon: {
    marginHorizontal: 10,
  },
  profileImg: {
    width: 50,
    height: 50,
  },
});

/* Styles Components */
const SText = styled.Text`
  /* SmallPrint */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */

  text-align: center;

  /* White */

  color: #ffffff;
  opacity: 0.7;
`;

const SDText = styled.Text`
  /* SmallPrint */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: flex-end;

  /* Gray - 2 */

  color: #999999;
`;

const MText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 22px;
  /* identical to box height, or 110% */

  text-align: center;

  /* White */

  color: #ffffff;
`;

const InputText = styled.TextInput`
  /* PlaceholderInput */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.3px;

  /* Black */

  color: #000000;
`;

const RoundOuterFollowBTNConter = styled.View`
  background: #377e8e;
  border-radius: 14px;
`;

const ListText = styled.Text`
  /* Content P SEMI */

  font-family: Nunito;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  display: flex;
  align-items: flex-end;

  /* Tussle black */

  color: #000000;
`;
const CheckBox = styled.Image`
  margin-left: 50%;
`;
