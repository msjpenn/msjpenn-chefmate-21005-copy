import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
const AboutScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
      <CBHeader title={"About Chefmate"} navigation={navigation} />

      <View
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
      >
        <Text style={{ textAlign: "center" }}>
          Chefmate is your guide and community for cooking.{"\n"} We want you to
          learn, grow, and connect with others about your cooking. Cooking
          should be approachable, friendly, and fun.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;

const SText = styled.Text`
  /* Content P SEMI */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  /* Gray - 1 */

  color: #4c4c4c;
`;
