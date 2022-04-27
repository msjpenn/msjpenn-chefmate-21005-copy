/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import * as AppStyles from "../appStyles";
import { DismissKeyboard } from "../DismissKeyboard";
const CBTextInput = ({
  value,
  label,
  onChangeText,
  showError,
  errorMessage,
  keyboardType,
  secureTextEntry,
  multiline,
}) => {
  return (
    <View>
      <View style={[styles.container]}>
        <Text style={styles.label}>{label}</Text>
        <DismissKeyboard>
          <TextInput
            autoCapitalize={"none"}
            value={value}
            style={{
              height: multiline ? 60 : 40,
              lineHeight: 20,
              fontSize: 15,
              fontFamily: AppStyles.FONT_FAMILY,
            }}
            secureTextEntry={secureTextEntry ? true : false}
            onChangeText={(val) => onChangeText(val)}
            multiline={multiline ? true : false}
            keyboardType={keyboardType != null ? keyboardType : "default"}
          ></TextInput>
        </DismissKeyboard>
      </View>
      {showError ? (
        <Text style={styles.validationMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};
export default CBTextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 14,
    paddingTop: 15,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  inputStyle: {},
  label: {
    fontSize: 12,
    color: "#A9A9A9",
    fontFamily: AppStyles.FONT_FAMILY,
    textAlign: "left",
    opacity: 0.6,
    margin: 0,
    fontWeight: "700",
  },
  validation: {
    alignSelf: "flex-start",
  },
  validationMessage: {
    color: "red",
    padding: "3%",
  },
});
