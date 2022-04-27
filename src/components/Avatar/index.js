import React from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import * as AppStyles from "../appStyles";

const prepareInitials = (textString) => {
  if (!textString) return "";
  const text = textString.trim();
  const textSplit = text.split(" ");
  if (textSplit.length <= 1) return text.charAt(0);
  let initials = textSplit[0].charAt(0) + textSplit[1].charAt(0);
  return initials;
};

const CBAvatar = ({ size, imageSource, label }) => {
  let fontSize = size > 0 ? size / 2 : size;
  let initials = prepareInitials(label);
  return (
    <>
      {imageSource == null || imageSource.uri == null ? (
        <View
          style={[
            styles.container,
            { height: size, width: size, borderRadius: size },
          ]}
        >
          <Text style={{ fontSize: fontSize, padding: 5 }}>{initials}</Text>
        </View>
      ) : (
        <Image
          source={imageSource}
          style={[
            styles.container,
            { height: size, width: size, borderRadius: size },
          ]}
        ></Image>
      )}
    </>
  );
};
export default CBAvatar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.COLOR_GRAY_3,
    alignItems: "center",
    justifyContent: "center",
  },
});
