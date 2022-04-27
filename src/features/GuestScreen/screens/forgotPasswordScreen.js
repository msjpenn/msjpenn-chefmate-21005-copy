import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import FEIcon from "react-native-vector-icons/Feather";
import * as AppStyles from "../../../components/appStyles";
import CBTextInput from "../../../components/TextInput";
import { customApiService } from "../../../store/auth/services";
import { useState } from "react";
import Toast from "react-native-simple-toast";
import validateEmail from "../../../utils/validateEmail";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async () => {
    console.log(validateEmail(email));

    if (!validateEmail(email)) {
      Toast.show("Please enter a valid email.", Toast.LONG);
      return;
    }

    setIsLoading(true);
    const payload = {
      email: email,
    };
    try {
      const res = await customApiService.doPasswordReset(payload);
      console.log(res);
      setIsLoading(false);
      navigation.navigate("SendEmailSuccessScreen");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.show("Something went wrong please try again later.", Toast.LONG);
    }
  };

  return (
    <>
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
      <ScrollView
        style={[styles.loginOptionsContainer, AppStyles.styles.container]}
        contentContainerStyle={styles.scrollContainer}
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
          <Image source={require("../../../assets/images/chefmate-logo.png")} />
        </View>
        <View style={styles.headingBox}>
          <View>
            <Text style={AppStyles.styles.content_h1_bold}>
              Password Recovery
            </Text>
          </View>
          <View>
            <Text
              style={[AppStyles.styles.content_regular, styles.headingSubText]}
            >
              Please type in your email {"\n"}We will send you a link to change
              the password
            </Text>
          </View>
        </View>

        <View style={styles.mainForm}>
          <CBTextInput
            label="Email Address"
            errorMessage="Email must contain at least 8 characters"
            onChangeText={(value) => {
              setEmail(value);
            }}
            keyboardType="email-address"
          ></CBTextInput>
        </View>

        <View style={{ marginTop: 5 }}>
          <TouchableOpacity
            style={AppStyles.styles.buttonPrimary}
            onPress={() => (isLoading ? {} : sendEmail())}
          >
            {!isLoading ? (
              <Text style={AppStyles.styles.buttonPrimaryText}>Submit</Text>
            ) : (
              <Text style={AppStyles.styles.buttonPrimaryText}>
                Submiting...
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* <View style={styles.noAccountBox}>
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
        </View> */}
      </ScrollView>
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  loginOptionsContainer: {
    paddingTop: "10%",
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
  cancelBtn: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
});
