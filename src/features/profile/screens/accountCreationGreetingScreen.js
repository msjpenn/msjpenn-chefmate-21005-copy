import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";

const AccountCreationGreetingScreen = ({ navigation }) => {
  return (
    <>
      <ScrollView style={styles.loginOptionsContainer}>
        <View style={styles.mainContentBox}>
          <View style={styles.headingBox}>
            <View>
              <Text style={styles.headingText}>Congratulations!</Text>
            </View>
            <View style={styles.headingSubTxtBox}>
              <Text style={styles.headingSubText}>
                Your account was successfully created!{"\n"} Start cooking!
              </Text>
            </View>
          </View>
          <View style={styles.teamAtChefmateBox}>
            <View>
              <Text style={[styles.headingSubText, { marginTop: 50 }]}>
                Your team at{" "}
              </Text>
              <Image
                style={{ marginTop: 30 }}
                source={require("../../../assets/images/chefmate-logo.png")}
              />
            </View>
          </View>
        </View>
        <View style={AppStyles.styles.filler}></View>
        <TouchableOpacity
          onPress={() => {}}
          style={AppStyles.styles.buttonPrimary}
          onPress={() => {
            navigation.navigate("Feed");
          }}
        >
          <Text style={AppStyles.styles.buttonPrimaryText}>Start Cooking</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default AccountCreationGreetingScreen;

const styles = StyleSheet.create({
  loginOptionsContainer: {
    backgroundColor: AppStyles.appBackgroundColor,
    paddingTop: "10%",
    paddingHorizontal: "8%",
  },
  mainContentBox: {
    marginVertical: "30%",
    alignItems: "center",
  },
  headingBox: {
    paddingVertical: "3%",
  },
  headingText: {
    fontFamily: AppStyles.FONT_FAMILY,
    fontSize: 19,
    fontStyle: "normal",
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  headingSubTxtBox: {
    marginTop: "2%",
  },
  teamAtChefmateBox: {
    marginTop: "0%",
  },
  headingSubText: {
    fontSize: 15,
    color: "#4C4C4C",
    alignItems: "center",
    textAlign: "center",
    fontFamily: AppStyles.FONT_FAMILY,
    lineHeight: 25,
  },
});
