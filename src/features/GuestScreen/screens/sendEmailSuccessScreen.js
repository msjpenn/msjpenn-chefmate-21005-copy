import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

import * as AppStyles from "../../../components/appStyles";

const SendEmailSuccessScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
      <ScrollView
        style={[styles.loginOptionsContainer, AppStyles.styles.container]}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.logoAndNameContainer}>
          <Image source={require("../../../assets/images/chefmate-logo.png")} />
        </View>
        <View style={styles.headingBox}>
          <View>
            <Text style={AppStyles.styles.content_h1_bold}>
              Reset password link has been sent to your email{" "}
            </Text>
          </View>
          <View>
            <Text style={AppStyles.styles.content_h1_bold}>
              {/* Check your email{" "} */}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: "15%" }}>
          <TouchableOpacity
            style={AppStyles.styles.buttonPrimary}
            onPress={() => navigation.navigate("LoginOptionsScreen")}
          >
            <Text style={AppStyles.styles.buttonPrimaryText}>
              Go back to login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
    </>
  );
};

export default SendEmailSuccessScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  loginOptionsContainer: {
    paddingTop: "25%",
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
