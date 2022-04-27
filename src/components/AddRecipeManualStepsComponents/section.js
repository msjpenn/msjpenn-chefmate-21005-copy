/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import styled from "styled-components/native";

const app = ({
  value,
  label,
  placeholder,
  showActions,
  onChangeText,
  keyboardType,
  onPress,
  showError,
  errorMessage,
}) => {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <SectionView>
      <ContainerView>
        <InnverViewOne>
          <Label>{label}</Label>
          <TextInput
            value={value}
            placeholderTextColor={"#DDDDDD"}
            placeholder={placeholder}
            onChangeText={(val) => {
              setDisabled(false);
              onChangeText(val);
            }}
            keyboardType={keyboardType != null ? keyboardType : "default"}
          ></TextInput>
        </InnverViewOne>
        {showActions ? (
          <InnerViewTwo>
            <TouchableOpacity onPress={onPress} disabled={disabled}>
              {disabled ? (
                <Image source={require("../../assets/images/grey_dots.png")} />
              ) : (
                <Image source={require("../../assets/images/black_dots.png")} />
              )}
            </TouchableOpacity>
          </InnerViewTwo>
        ) : null}
      </ContainerView>
      {showError ? <ValidationMessage>{errorMessage}</ValidationMessage> : null}
    </SectionView>
  );
};

export default app;

const ValidationMessage = styled.Text`
  color: red;
  padding: 3%;
  margin-top: 8%;
`;

const TouchableOpacity = styled.TouchableOpacity`
  width: 15px;
  height: 15px;
`;

const InnerViewTwo = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
`;

const InnverViewOne = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

const TextInput = styled.TextInput`
  height: 40px;
  width: 100%;
  line-height: 20px;
  font-size: 15px;
  font-family: Nunito;
`;

const Label = styled.Text`
  font-size: 12px;
  color: #a9a9a9;
  font-family: Nunito;
  text-align: left;
  opacity: 0.6;
  margin: 0px;
  font-weight: 700;
`;
const ContainerView = styled.View`
  width: 100%;
  padding: 15px;
`;

const SectionView = styled.View`
  padding: 0px;

  width: 345px;
  height: 60px;
  left: 1px;
  top: 50px;
  border-radius: 14px;
  background: white;
`;

const styles = StyleSheet.create({});
