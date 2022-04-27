import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBTextInput from "../../../components/TextInput";
import CBPasswordInput from "../../../components/PasswordInput";
import Toast from "react-native-simple-toast";
import { customApiService } from "../../../store/auth/services";
import validateEmail from "../../../utils/validateEmail";
import {
  doAddFCMDeviceAction,
  doLoginSucceeded,
} from "../../../store/auth/actions";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import FEIcon from "react-native-vector-icons/Feather";
import { doGetNotificationsList } from "../../../store/notification/actions";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EmailLoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };

  const login = async () => {
    if (!email) {
      Toast.show("Please enter your email.", Toast.LONG);
      return;
    }

    if (!password) {
      Toast.show("Please enter your email.", Toast.LONG);
      return;
    }

    if (!validateEmail(email)) {
      Toast.show("Please enter a valid email.", Toast.LONG);
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);
      const res = await customApiService.doLogin(payload);
      console.log(res);
      const payloadDevice = {
        user: res.user.id,
      };

      _storeData();
      dispatch(doLoginSucceeded(res));
      dispatch(doGetNotificationsList());
      dispatch(doAddFCMDeviceAction(payloadDevice));

      Toast.show("Successfully logged in.", Toast.LONG);

      navigation.navigate("Home");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error?.status);
      if (error?.status === 400) {
        Toast.show("Invalid Email or password", Toast.LONG);
      }

      if (error?.status === 500) {
        Toast.show("Something went wrong please try again", Toast.LONG);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
      <ScrollView style={{ flex: 1, marginBottom: 30 }}>
        <KeyboardAwareScrollView
          style={[
            styles.loginOptionsContainer,
            AppStyles.styles.container,
            { flex: 1 },
          ]}
          contentContainerStyle={styles.scrollContainer}
          behavior="position"
          enabled
        >
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <FEIcon
              name="chevron-left"
              size={24}
              onPress={() => navigation.goBack()}
            />
            <Text>Back</Text>
          </TouchableOpacity>

          <View style={styles.logoAndNameContainer}>
            <Image
              source={require("../../../assets/images/chefmate-logo.png")}
            />
          </View>
          <View style={styles.headingBox}>
            <View>
              <Text style={AppStyles.styles.content_h1_bold}>Welcome!</Text>
            </View>
            <View>
              <Text
                style={[
                  AppStyles.styles.content_regular,
                  styles.headingSubText,
                ]}
              >
                Please login with an existing account.
              </Text>
            </View>
          </View>
          <View style={styles.mainForm}>
            <CBTextInput
              label="Email Address"
              errorMessage="Please enter valid email address"
              onChangeText={(value) => {
                setEmail(value);
              }}
              keyboardType="email-address"
            ></CBTextInput>
            <CBPasswordInput
              label="Password"
              errorMessage="Password must contain at least 8 characters"
              onChangeText={(value) => setPassword(value)}
            ></CBPasswordInput>
          </View>
          <View style={{ marginTop: 5 }}>
            <TouchableOpacity
              style={AppStyles.styles.buttonPrimary}
              onPress={() => (isLoading ? {} : login())}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={AppStyles.styles.content_regular}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.noAccountBox}>
            <Text style={AppStyles.styles.content_regular}> No Account ?</Text>
          </View>
          <View>
            <TouchableOpacity
              style={AppStyles.styles.buttonSecondary}
              onPress={() => {
                navigation.navigate("EmailRegistrationScreen");
              }}
            >
              <Text style={AppStyles.styles.buttonSecondaryText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filler}></View>
          <TouchableOpacity
            style={styles.termsWrapper}
            onPress={() => {
              navigation.navigate("TermsScreen");
            }}
          >
            <Text style={styles.termsText}>
              By logging in or creating a new account you agree to our terms and
              conditions and privacy policy. Tap to view.
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
      </ScrollView>
    </>
  );
};

export default EmailLoginScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  loginOptionsContainer: {
    paddingTop: hp(5),
    paddingHorizontal: "8%",
  },
  logoAndNameContainer: {
    alignItems: "center",
    paddingVertical: "2%",
  },
  headingSubText: {
    paddingVertical: "4%",
  },
  headingBox: {
    marginTop: "3%",
    alignItems: "center",
  },
  mainForm: {
    paddingVertical: 10,
  },
  noAccountBox: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noAccountTxt: {
    fontSize: 15,
    color: "#4C4C4C",
  },
  filler: {
    flex: 1,
  },
  termsWrapper: {
    justifyContent: "flex-end",
  },
  termsText: {
    fontSize: 12,
    fontWeight: "600",
    color: AppStyles.COLOR_GRAY_3,
  },
});
