import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import CBActionStatus from "../../../components/ActionStatus";
import { SUCCESS } from "../../../store/constants";
import { useDispatch, useSelector } from "react-redux";
import { doEditMeasurement } from "../../../store/profile/actions";
import styled from "styled-components/native";

const EditMeasurementSystemScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const editMeasurementStatus = useSelector(
    (state) => state.profileReducer.editMeasurement.status
  );
  const errorMessage = useSelector(
    (state) => state.profileReducer.editMeasurement.errorMessage
  );

  const user = useSelector((state) => state.authReducer.user);

  const [measurement, setMeasurement] = useState("metric");

  const CHECKOUTLINE = require("../../../assets/images/CheckOutline.png");
  const CHECKFULL = require("../../../assets/images/CheckFull.png");

  const performSubmission = () => {
    const payload = {
      id: user.id,
      measurement_system: measurement,
      email: user?.email,
    };
    dispatch(doEditMeasurement(payload));
  };

  React.useEffect(() => {
    // if (editMeasurementStatus == SUCCESS) {
    navigation.navigate("ProfileScreenSet", {
      screen: "AccountCreationGreetingScreen",
    });
    // }
  }, [editMeasurementStatus]);

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

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <CBHeader
          title="Profile Settings"
          navigation={navigation}
          rightComponent={<CancelBtn />}
        />
        <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
          <ScrollView
            style={[styles.loginOptionsContainer]}
            contentContainerStyle={
              AppStyles.styles.scrollContentContainerOfHeaderScreen
            }
          >
            <View style={[styles.headingBox, { marginTop: 20 }]}>
              <Text style={AppStyles.styles.content_h1}>Choose a system</Text>
            </View>

            <View style={styles.checkBoxMainContainer}>
              <TouchableOpacity
                onPress={() => {
                  setMeasurement("metric");
                }}
                style={styles.checkBoxContainer}
              >
                <Image
                  style={{ marginRight: 20 }}
                  source={measurement === "metric" ? CHECKFULL : CHECKOUTLINE}
                />
                <ListText>Metric system</ListText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMeasurement("customary");
                }}
                style={styles.checkBoxContainer}
              >
                <Image
                  style={{ marginRight: 20 }}
                  source={
                    measurement === "customary" ? CHECKFULL : CHECKOUTLINE
                  }
                />
                <ListText>US customary system</ListText>
              </TouchableOpacity>
            </View>
            {/* <CBActionStatus
              status={editMeasurementStatus}
              errorMessage={errorMessage}
            ></CBActionStatus> */}
            <View style={AppStyles.styles.filler}></View>
            <TouchableOpacity
              onPress={() => performSubmission()}
              title="Next"
              style={AppStyles.styles.buttonPrimary}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }}></View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};
export default EditMeasurementSystemScreen;

const styles = StyleSheet.create({
  checkBoxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkBoxMainContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 25,
    marginVertical: 5,
  },
});

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
