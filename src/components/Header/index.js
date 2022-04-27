import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as AppStyles from "../appStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

const CBHeader = ({ navigation, title, rightComponent }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-end",
          height: 50,
        }}
      >
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <MCIcon
              size={30}
              name="keyboard-backspace"
              onPress={() => navigation.goBack()}
              color="white"
            />
          </View>

          <Text style={styles.centerContainer}>{title}</Text>

          <View style={styles.rightContainer}>
            {rightComponent ? (
              rightComponent
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text style={{ color: "white" }}>CANCEL</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};
export default CBHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  leftContainer: {
    justifyContent: "flex-start",
    minWidth: 40,
  },
  centerContainer: {
    ...AppStyles.styles.content_h2_bold,
    justifyContent: "space-around",
    color: "white",
  },
  rightContainer: {
    justifyContent: "flex-end",
    minWidth: 40,
  },
  rightContainerText: {
    ...AppStyles.styles.content_p_bold,
    color: "white",
  },
});
