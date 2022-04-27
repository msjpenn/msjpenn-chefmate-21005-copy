/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import styled from "styled-components/native";
import DropDownPicker from "react-native-dropdown-picker";

const app = ({
  value,
  label,
  placeholder,
  showActions,
  onChangeText,
  onChangeUnit,
  keyboardType,
  onPress,
  showError,
  errorMessage,
  qtyPlaceholder,
  onQTYChange,
  qtyValue,
  onAmountChange,
  unit,
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
        <BottomInputGroup>
          <IngredientView>
            <Label>Add Amount</Label>
            <IngredientQtyInput
              value={qtyValue}
              keyboardType={keyboardType != null ? keyboardType : "default"}
              placeholderTextColor={"#DDDDDD"}
              placeholder={qtyPlaceholder}
              onChangeText={(val) => {
                onAmountChange(val);
              }}
            />
          </IngredientView>
          <BottomRightView>
            <Label>Select Unit</Label>
            <DropDownPicker
              items={[
                { label: "tsp", value: "tsp" },
                { label: "tbsp", value: "tbsp" },
              ]}
              defaultValue={unit}
              containerStyle={{ height: 40, width: 100 }}
              style={{ backgroundColor: "#fafafa", borderColor: "#fff" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => {
                onChangeUnit(item.value);
              }}
            />
          </BottomRightView>

          {/* <DropDownPicker
                            items={[
                                {label: 'tsp', value: 'tsp' },
                                {label: 'tbsp', value: 'tbsp' },
                            ]}
                            defaultValue={unit}
                            containerStyle={{height: 40, width: 80}}
                            style={{backgroundColor: '#fff', borderColor: "#fff"}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: 'white'}}
                            onChangeItem={item => console.log(item)}
                        /> */}
        </BottomInputGroup>

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

const IngredientView = styled.View`
  top: 5%;
  width: 70%;
`;

const IngredientQtyInput = styled.TextInput`
  height: 40px;
  line-height: 20px;
  font-size: 15px;
  font-family: Nunito;
`;

const BottomInputGroup = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

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

const BottomRightView = styled.View`
  width: 100%;
  top: 5%;
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
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 15px;
`;

const SectionView = styled.View`
  padding: 0px;

  width: 345px;
  height: 142px;
  border-radius: 14px;
  background: white;
  padding: 5px 0px;
`;

const styles = StyleSheet.create({});
