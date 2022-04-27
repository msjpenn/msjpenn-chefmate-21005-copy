import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as AppStyles from "../../../components/appStyles";
import CBTextInput from "../../../components/TextInput";
import { doAddTitle } from "./../../../store/recipeCreation/actions";
import { setRecipeDetails } from "../../../store/recipeCreation/actions";

const App = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeCreationReducer);
  const titleState = useSelector((state) => state.recipeCreationReducer.title);
  const [showTitleError, setShowTitleError] = useState(false);
  const [title, setTitle] = useState(recipe.title);

  const handleSubmit = () => {
    if (title == null || title.length == 0) setShowTitleError(true);
    else {
      dispatch(doAddTitle(title));
      navigation.navigate("EditDescriptionScreen");
    }
  };
  const { recipeDetail } = route.params;
  useEffect(() => {
    console.log("recipeDetail from details screen", recipeDetail);
    dispatch(setRecipeDetails(recipeDetail));
  }, []);

  useEffect(() => {
    if (titleState) setTitle(titleState);
  }, [titleState]);

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
          <View style={styles.headingBox}>
            <View>
              <Text style={styles.headingBoxText}>Edit Recipe Title</Text>
            </View>
          </View>
          <View style={styles.mainForm}>
            <CBTextInput
              label="Recipe title"
              showError={showTitleError}
              value={title}
              errorMessage="Please enter valid title."
              onChangeText={(value) => {
                setTitle(value);
              }}
            ></CBTextInput>
          </View>

          <View style={{ marginTop: 5, padding: 35 }}>
            <TouchableOpacity
              style={AppStyles.styles.buttonPrimary}
              onPress={() => handleSubmit()}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  loginOptionsContainer: {
    paddingTop: "10%",
    paddingHorizontal: "8%",
  },
  logoAndNameContainer: {
    alignItems: "center",
    paddingVertical: "2%",
  },
  headingSubText: {
    paddingVertical: "4%",
  },
  headingBox: {
    marginTop: "3%",
    alignItems: "center",
  },
  headingBoxText: {
    left: "0%",
    right: "0%",
    top: "1%",
    bottom: "0%",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: 25,
    textAlign: "center",
    color: "#000000",
  },
  mainForm: {
    paddingVertical: 10,
  },
  noAccountBox: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noAccountTxt: {
    fontSize: 15,
    color: "#4C4C4C",
  },
  filler: {
    flex: 1,
  },
  termsWrapper: {
    justifyContent: "flex-end",
  },
  termsText: {
    fontSize: 12,
    fontWeight: "600",
    color: AppStyles.COLOR_GRAY_3,
  },
});
