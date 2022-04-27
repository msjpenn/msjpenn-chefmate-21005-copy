import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import styled from "styled-components/native";

import * as AppStyles from "../../components/appStyles";

const app = ({ onClickNext, nextLabel, onSaveDraft }) => {
  return (
    <FooterButtonContainer>
      <FooterButtonView>
        <SaveDraftButton onPress={onSaveDraft}>
          <Text>Save Draft</Text>
        </SaveDraftButton>
        <NextButton onPress={onClickNext}>
          <NextButtonText>{nextLabel ? nextLabel : "Next"}</NextButtonText>
          <Arrow source={require("../../assets/images/white_arrow.png")} />
        </NextButton>
      </FooterButtonView>
    </FooterButtonContainer>
  );
};

export default app;

const FooterButtonContainer = styled.View`
  position: relative;
  width: 100%;
  height: 110px;
  left: 0px;
  background-color: white;
`;

const FooterButtonView = styled.View`
  position: absolute;
  width: 322px;
  height: 50px;
  left: 10%;
  top: 30px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SaveDraftButton = styled.TouchableOpacity`
  height: 50px;
  color: black;
  font-size: 16px;
  font-family: Nunito;
  line-height: 20px;
  align-items: center;
  border-color: #61baac;
  border-width: 1px;
  border-radius: 14px;
  align-items: center;
  width: 150px;
  justify-content: center;
`;

const NextButton = styled.TouchableOpacity`
  height: 50;
  color: white;
  font-size: 16px;
  font-family: Nunito;
  line-height: 20px;
  align-items: center;
  border-color: #61baac;
  border-width: 1px;
  width: 160px;
  border-radius: 14px;
  justify-content: center;
  padding-vertical: 3%;
  background-color: #61baac;
  flex-direction: row;
`;

const NextButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-family: Nunito;
  font-weight: 600;
  position: absolute;
`;

const Arrow = styled.Image`
  position: relative;
  margin-left: 70%;
`;

const styles = StyleSheet.create({});
