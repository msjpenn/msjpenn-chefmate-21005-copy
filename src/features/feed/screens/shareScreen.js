import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ShareScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>navigation</Text>
    </View>
  );
};

export default ShareScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
});
