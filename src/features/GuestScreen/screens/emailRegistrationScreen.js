import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBTextInput from "../../../components/TextInput";
import CBPasswordInput from "../../../components/PasswordInput";
import validateEmail from "../../../utils/validateEmail";
import { doLoginSucceeded } from "../../../store/auth/actions";
import { customApiService } from "../../../store/auth/services";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-community/async-storage";
import FEIcon from "react-native-vector-icons/Feather";
import { addCustomerIO } from "../../../store/customerio/actions";
import { doAddFCMDeviceAction } from "../../../store/auth/actions";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EmailRegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };
  const register = async () => {
    if (!email) {
      Toast.show("Please enter your email.", Toast.LONG);
      return;
    }

    if (!validateEmail(email)) {
      Toast.show("Please enter a valid email.", Toast.LONG);
      return;
    }

    if (!password) {
      Toast.show("Please enter your password", Toast.LONG);
      return;
    }

    if (password.length < 8) {
      Toast.show("Password be at least 8 characters long.", Toast.LONG);
      return;
    }

    if (!fullname) {
      Toast.show("Please enter your fullname", Toast.LONG);
      return;
    }

    try {
      setIsLoading(true);

      const res = await customApiService.doRegister({
        email: email,
        password: password,
        name: fullname,
      });

      const resLogin = await customApiService.doLogin({
        email: email,
        password: password,
      });
      console.log(res);
      _storeData();
      dispatch(doLoginSucceeded(resLogin));

      //add customer to CustomerIO
      const payload = {
        email: email,
        id: res.id,
        name: fullname || "",
        email: email,
        plan: "premium",
      };
      dispatch(addCustomerIO(payload));

      const payloadDevice = {
        user: res.id,
      };

      dispatch(doAddFCMDeviceAction(payloadDevice));

      Toast.show("Successfully signup up.", Toast.LONG);

      navigation.navigate("ProfileScreenSet", {
        screen: "EditUsernameScreen",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error.data.email[0]);
      setIsLoading(false);

      if (error?.data?.email[0]) {
        Toast.show(`${error?.data?.email[0]}`, Toast.LONG);
      } else {
        Toast.show(
          "Something went wrong while creating your account.",
          Toast.LONG
        );
      }
    }
  };

  return (
    <>
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
      <ScrollView
        style={[
          styles.loginOptionsContainer,
          AppStyles.styles.container,
          { flex: 1 },
        ]}
        contentContainerStyle={styles.scrollContainer}
      >
        <KeyboardAwareScrollView>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <FEIcon name="chevron-left" size={24} />
            <Text>Back</Text>
          </TouchableOpacity>

          <View style={styles.logoAndNameContainer}>
            <Image
              source={require("../../../assets/images/chefmate-logo.png")}
            />
          </View>
          <View style={[styles.headingBox, { marginTop: 25 }]}>
            <View>
              <Text style={AppStyles.styles.content_h1_bold}>
                Please sign up below
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
            <CBTextInput
              label="Name & Surname"
              onChangeText={(value) => {
                setFullname(value);
              }}
            ></CBTextInput>
          </View>

          <View style={{ marginTop: 5 }}>
            <TouchableOpacity
              style={AppStyles.styles.buttonPrimary}
              onPress={() => (isLoading ? {} : register())}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noAccountBox}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoginOptionsScreen");
              }}
            >
              <Text
                style={[
                  styles.noAccountTxt,
                  { textDecorationLine: "underline" },
                ]}
              >
                {" "}
                Already a Member ?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={AppStyles.styles.filler}></View>
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
          <View style={{ height: 30 }}></View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
    </>
  );
};

export default EmailRegistrationScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  loginOptionsContainer: {
    paddingTop: hp(5),
    paddingHorizontal: "8%",
  },
  logoAndNameContainer: {
    alignItems: "center",
    paddingVertical: "2%",
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
  termsWrapper: {
    justifyContent: "flex-end",
  },
  termsText: {
    fontSize: 12,
    fontWeight: "600",
    color: AppStyles.COLOR_GRAY_3,
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
});
