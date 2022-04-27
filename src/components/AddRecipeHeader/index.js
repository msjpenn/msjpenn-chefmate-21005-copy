import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import styled from "styled-components/native";

import * as AppStyles from "../appStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const app = (props) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: AppStyles.headerBackgroundColor,
          borderTopColor: AppStyles.headerBackgroundColor,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View style={{ marginTop: hp(3) }} />
          {props.htext ? <HText>{props.htext}</HText> : null}
          <View style={{ marginBottom: hp(1) }} />

          {props.subText ? <SubText>{props.subText}</SubText> : null}

          {props.children}
          <View style={{ marginBottom: hp(2) }} />
        </View>
      </View>
    </>
  );
};

export default app;

const SubText = styled.Text`
  left: 0%;
  right: 0%;
  top: 12%;
  bottom: 0%;

  /* ListDescription */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  /* or 136% */

  display: flex;
  align-items: center;
  text-align: center;

  /* Gray - 1 */

  color: #4c4c4c;
  opacity: 0.8;

  /* Inside Auto Layout */
  margin: 0px 10px;
`;

const HText = styled.Text`
  /* Content H1 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 25px;
  /* or 132% */

  text-align: center;

  /* Black */

  color: #000000;

  /* Inside Auto Layout */

  flex: none;
  flex-grow: 0;
  margin: 15px 10px 0px 10px;
`;

const styles = StyleSheet.create({});
