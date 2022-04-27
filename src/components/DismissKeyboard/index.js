import React from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

export const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
};
