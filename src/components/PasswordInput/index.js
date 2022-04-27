import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import * as AppStyles from "../appStyles";
const CBPasswordInput = ({ label, onChangeText, showError, errorMessage }) => {
  const [showPassword, setShowPasword] = React.useState(false);

  return (
    <View>
      <View style={[styles.container]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.inputStyle}
          secureTextEntry={!showPassword}
          onChangeText={(value) => onChangeText(value)}
        ></TextInput>

        <TouchableOpacity
          style={styles.iconTouchable}
          onPress={() => setShowPasword(!showPassword)}
        >
          {showPassword ? (
            <Image
              source={require("../../assets/icons/iconPasswordShown.png")}
            />
          ) : (
            <Image
              style={styles.icon}
              source={require("../../assets/icons/iconPasswordHidden.png")}
            />
          )}
        </TouchableOpacity>
      </View>
      {showError ? (
        <Text style={styles.validationMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};
export default CBPasswordInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 14,
    paddingTop: 15,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  inputStyle: {
    margin: 0,
    height: 40,
    padding: 0,
    margin: 0,
    lineHeight: 16,
    width: "90%",
  },
  label: {
    fontSize: 12,
    color: AppStyles.COLOR_GRAY_3,
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
  iconTouchable: {
    position: "absolute",
    right: 15,
    top: 30,
  },
});
