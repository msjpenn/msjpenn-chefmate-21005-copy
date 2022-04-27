import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
import CBTextInput from "../../../components/TextInput";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import { customApiService } from "../../../store/auth/services";
import { Button, Snackbar } from "react-native-paper";
const ChangePassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setConfirmShowPasswordError] = useState(
    false
  );
  const [showConfirmPasswordMessage, setConfirmShowPasswordMessage] = useState(
    "Please enter a valid confirm password!"
  );

  const [passwordError, setPasswordError] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const onDismissSnackBarSuccess = () => setVisibleSuccess(false);

  const [loading, setLoading] = useState(false);

  const updatePassword = async () => {
    setShowPasswordError(false);
    setConfirmShowPasswordError(false);
    setPasswordError("");
    if (password.trim() == "" && password.length < 8) {
      setShowPasswordError(true);
      return;
    }
    if (confirmPassword.trim() == "" && confirmPassword.length < 8) {
      setConfirmShowPasswordError(true);
      return;
    }

    if (confirmPassword != password) {
      setConfirmShowPasswordMessage(
        "Confirm Password is not matching with password."
      );
      setConfirmShowPasswordError(true);
      return;
    }
    setLoading(true);
    try {
      let results = await customApiService.doPwdChange({
        new_password1: password,
        new_password2: confirmPassword,
      });
      console.log("results===>", results.detail);
      if (results) {
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        // Alert.alert("Success!", "New password has been saved.");
        setVisibleSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("error===>", error);

      if (error?.data?.new_password2?.length > 0) {
        console.error("error===>", error.data.new_password2);
        setPasswordError(error?.data?.new_password2[0]);
        onToggleSnackBar();
      }
    }
  };

  return (
    <>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <CBHeader title={"Change Password"} navigation={navigation} />
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
              <CBTextInput
                secureTextEntry={true}
                value={password}
                label="Password"
                showError={showPasswordError}
                errorMessage="Please enter a valid password."
                onChangeText={(value) => {
                  setPassword(value);
                }}
              ></CBTextInput>
            </View>
            <View style={styles.mainForm}>
              <CBTextInput
                value={confirmPassword}
                label="Confirm Password"
                secureTextEntry={true}
                showError={showConfirmPasswordError}
                errorMessage={showConfirmPasswordMessage}
                onChangeText={(value) => {
                  setConfirmPassword(value);
                }}
              ></CBTextInput>
            </View>

            <TouchableOpacity
              onPress={updatePassword}
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
                Update Password
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            style={{ marginBottom: 20 }}
          >
            {passwordError}
          </Snackbar>

          <Snackbar
            visible={visibleSuccess}
            style={{ marginBottom: 20, backgroundColor: "green" }}
            onDismiss={onDismissSnackBarSuccess}
          >
            <Text style={{ textAlign: "center" }}>
              New password has been saved.
            </Text>
          </Snackbar>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {loading && (
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

export default ChangePassword;

const styles = StyleSheet.create({
  mainForm: {
    paddingVertical: 10,
    width: "90%",
    alignSelf: "center",
  },
});
