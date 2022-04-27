/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import * as AppStyles from "../../../components/appStyles";
import Header from "../../../components/AddRecipeHeader";
import { doAddDesc } from "./../../../store/recipeCreation/actions";
import { DismissKeyboard } from "../../../components/DismissKeyboard";
import IIcon from "react-native-vector-icons/Ionicons";

const app = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.recipeCreationReducer);

  const [value, setValue] = useState(recipe.description);

  useEffect(() => {
    if (recipe.description) setValue(recipe.description);
  }, [recipe.description]);

  const onChangeText = (value) => {
    setValue(value);
  };

  const handleSubmit = () => {
    dispatch(doAddDesc(value));
    navigation.navigate("EditIngredientSectionScreen");
  };

  return (
    <Header>
      <DismissKeyboard>
        <HText>Edit description {"\n"} of a dish</HText>
        <DescriptionView>
          <Description
            value={value}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            onChangeText={(value) => onChangeText(value)}
          />
        </DescriptionView>
      </DismissKeyboard>
      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => handleSubmit()}
      >
        <View />
        <Text style={styles.buttonPrimaryText}>Next</Text>

        <IIcon
          name="chevron-forward"
          color="#fff"
          size={24}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    </Header>
  );
};

export default app;

const Arrow = styled.Image`
  margin-left: 80%;
`;

const NextButtonView = styled.View`
  align-self: center;
`;

const DescriptionView = styled.View`
  width: 100%;
  height: 305px;
  margin: 0px 5%;
`;

const Description = styled.TextInput`
  width: 90%;
  height: 200px;
  /* left: 15px; */
  /* top: 217px; */
  /* margin: 0px 30px; */
  background: #ffffff;
  border-radius: 14px;
  padding: 10px;
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
  margin: 40px 10px;
`;

const styles = StyleSheet.create({
  buttonPrimaryText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Nunito",
    fontWeight: "700",
  },

  buttonPrimary: {
    height: 50,
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 24,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    width: "90%",
    borderRadius: 14,
    justifyContent: "space-between",
    backgroundColor: "#61BAAC",
    flexDirection: "row",
    marginBottom: 30,
    alignSelf: "center",
  },
});
