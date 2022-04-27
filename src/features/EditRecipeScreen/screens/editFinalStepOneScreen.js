import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import * as AppStyles from "../../../components/appStyles";
import Header from "../../../components/AddRecipeHeader";
import CBTextInput from "../../../components/TextInput";

import { recipeApiService } from "./../../../store/recipeCreation/services";
import Toast from "react-native-simple-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IIcon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const app = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const recipeId = route.params?.recipeId;
  const authUser = useSelector((state) => state.authReducer);
  const titleState = useSelector((state) => state.recipeCreationReducer?.title);
  const recipe = useSelector((state) => state.recipeCreationReducer);
  const section = useSelector((state) => state.recipeCreationReducer?.section);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [time, setTime] = useState(
    recipe.total_hours_to_make ? `${recipe.total_hours_to_make}` : null
  );
  const [size, setSize] = useState(
    recipe.serving_size ? `${recipe.serving_size}` : null
  );

  const updateSectionInstructionIngredient = async () => {
    try {
      for (let sectionItem = 0; sectionItem < section.length; sectionItem++) {
        /**
         * Check if section has id which means we can edit
         * if does not have an id it mean it does not exist
         * have on we add that section using recipeId
         */

        if (section[sectionItem]?.id) {
          const secResponse = await recipeApiService.doUpdateRecipeSection({
            name: section[sectionItem]?.name,

            id: section[sectionItem]?.id,
          });

          //Add section ingredients

          if (section[sectionItem]?.ingredients.length > 0) {
            for (
              let ingredientItem = 0;
              ingredientItem < section[sectionItem]?.ingredients.length;
              ingredientItem++
            ) {
              //if ingredients exist - update
              if (section[sectionItem]?.ingredients[ingredientItem]?.id) {
                const ingredientsPutResponse = await recipeApiService.doUpdateIngredients(
                  {
                    id: section[sectionItem]?.ingredients[ingredientItem]?.id,
                    name:
                      section[sectionItem]?.ingredients[ingredientItem]?.name,
                    amount:
                      section[sectionItem]?.ingredients[ingredientItem]?.amount,
                    unit:
                      section[sectionItem]?.ingredients[ingredientItem]?.unit,
                  }
                );
              } else {
                const ingredientsPostResponse = await recipeApiService.doPostIngredients(
                  [
                    {
                      section: section[sectionItem]?.id,
                      name:
                        section[sectionItem]?.ingredients[ingredientItem]?.name,
                      amount:
                        section[sectionItem]?.ingredients[ingredientItem]
                          ?.amount,
                      unit:
                        section[sectionItem]?.ingredients[ingredientItem]?.unit,
                    },
                  ]
                );
              }
            }
          }

          //Add section instructions

          if (section[sectionItem]?.instructions.length > 0) {
            for (
              let instructionItem = 0;
              instructionItem < section[sectionItem]?.instructions.length;
              instructionItem++
            ) {
              if (section[sectionItem]?.instructions[instructionItem]?.id) {
                const instructionsResponse = await recipeApiService.doUpdateInstructions(
                  {
                    id: section[sectionItem]?.instructions[instructionItem]?.id,
                    image:
                      section[sectionItem]?.instructions[instructionItem]?.image
                        ?.base64,
                    description:
                      section[sectionItem]?.instructions[instructionItem]
                        ?.description,
                  }
                );
              } else {
                const instructionsResponse = await recipeApiService.doPostInstructions(
                  [
                    {
                      section: section[sectionItem]?.id,
                      image:
                        section[sectionItem]?.instructions[instructionItem]
                          ?.image?.base64,
                      description:
                        section[sectionItem]?.instructions[instructionItem]
                          ?.description,
                    },
                  ]
                );
              }
            }
          }
        } else {
          //add new section

          const sectionRes = await recipeApiService.doPostRecipeSection({
            name: section[sectionItem]?.name,
          });

          //Add section ingredients

          if (section[sectionItem]?.ingredients.length > 0) {
            for (
              let ingredientItem = 0;
              ingredientItem < section[sectionItem]?.ingredients.length;
              ingredientItem++
            ) {
              const ingredientsResponse = await recipeApiService.doPostIngredients(
                [
                  {
                    section: sectionRes.id,
                    name:
                      section[sectionItem]?.ingredients[ingredientItem]?.name,
                    amount:
                      section[sectionItem]?.ingredients[ingredientItem]?.amount,
                    unit:
                      section[sectionItem]?.ingredients[ingredientItem]?.unit,
                  },
                ]
              );
            }
          }

          //Add section instructions

          if (section[sectionItem]?.instructions.length > 0) {
            for (
              let instructionItem = 0;
              instructionItem < section[sectionItem]?.instructions.length;
              instructionItem++
            ) {
              const instructionsResponse = await recipeApiService.doPostInstructions(
                [
                  {
                    section: sectionRes.id,
                    image:
                      section[sectionItem]?.instructions[instructionItem]?.image
                        ?.base64,
                    description:
                      section[sectionItem]?.instructions[instructionItem]
                        ?.description,
                  },
                ]
              );
            }
          }
        }
      }

      navigation.navigate("EditCompleteScreen");
      setLoading(false);
    } catch (error) {
      Toast.show("Something went wrong while updating this recipe", Toast.LONG);
      console.log(error);
    }
  };

  const updateRecipe = async () => {
    console.log(typeof time, typeof size);
    let prepTime = parseInt(time);
    if (typeof prepTime !== "number") {
      Toast.show("Time should be a number", Toast.LONG);
      return;
    }

    if (!title) {
      Toast.show("Recipe title is required!", Toast.LONG);
      return;
    }

    if (!size) {
      Toast.show("Serving size is required!", Toast.LONG);
      return;
    }

    if (!time) {
      Toast.show("Time to prepare is required!", Toast.LONG);
      return;
    }

    const data = {
      title: recipe.title,
      description: recipe.description,
      is_draft: false,
      total_hours_to_make: time,
      serving_size: size,
      user: authUser.user?.id,
      id: recipe.recipeIdUpdate,
    };

    if (recipe.image?.base64) {
      data["picture"] = recipe.image?.base64;
    }
    const res = await recipeApiService.doUpdateRecipe(data);
  };

  const handlePreview = () => {
    console.log(typeof time, typeof size);
    let prepTime = parseInt(time);

    if (typeof prepTime !== "number") {
      Toast.show("Time should be a number", Toast.LONG);
      return;
    }

    if (!title) {
      Toast.show("Recipe title is required!", Toast.LONG);
      return;
    }

    if (!size) {
      Toast.show("Serving size is required!", Toast.LONG);
      return;
    }

    if (!time) {
      Toast.show("Time to prepare is required!", Toast.LONG);
      return;
    }

    navigation.navigate("EditPreviewScreen", {
      total_hours_to_make: time,
      serving_size: size,
    });
  };

  useEffect(() => {
    if (titleState) setTitle(titleState);
  }, [titleState]);

  const onPublish = async () => {
    setLoading(true);
    updateRecipe();
    updateSectionInstructionIngredient();
  };

  return (
    <Header>
      <KeyboardAwareScrollView style={{ marginHorizontal: 10 }}>
        <Text style={styles.headerText}>Edit recipe details:</Text>

        <View>
          <CBTextInput
            label="Recipe title"
            value={title}
            onChangeText={(value) => setTitle(value)}
          ></CBTextInput>
        </View>

        <View>
          <CBTextInput
            label="Total time to prepare & cook (in minutes)"
            value={time}
            onChangeText={(value) => setTime(parseInt(value))}
            keyboardType="numeric"
          ></CBTextInput>
        </View>

        <View>
          <CBTextInput
            label="Serving size"
            value={size}
            onChangeText={(value) => setSize(parseInt(value))}
            keyboardType="numeric"
          ></CBTextInput>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => handlePreview()}
          style={styles.saveDraftBtn}
        >
          <Text style={styles.saveDraftText}>Preview</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPublish()} style={styles.nextBtn}>
          <View />
          <Text style={styles.nextBtnText}>Publish</Text>
          <IIcon
            name="chevron-forward"
            color="#fff"
            size={24}
            style={{ marginLeft: 0 }}
          />
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={AppStyles.styles.activityIndicatorContainer}>
          <ActivityIndicator
            size={"large"}
            color={AppStyles.headerBackgroundColor}
          />
        </View>
      )}
    </Header>
  );
};

export default app;

const styles = StyleSheet.create({
  boldText: {
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
  ratingContainer: {
    marginTop: 10,
  },
  subtext: {
    left: "0%",
    right: "14.66%",
    textAlign: "center",
    alignItems: "center",
    color: "#A9A9A9",
  },
  bottomButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  saveDraftButton: {
    height: 50,
    color: "black",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 20,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    width: 150,
    justifyContent: "center",
  },
  nextButton: {
    height: 50,
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 20,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    width: 150,
    borderRadius: 14,
    justifyContent: "center",
    paddingVertical: "3%",
    backgroundColor: "#61BAAC",
    flexDirection: "row",
  },
  arrowStyle: {
    marginLeft: "80%",
  },
  nextButton: {
    height: 50,
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 20,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    width: 150,
    borderRadius: 14,
    justifyContent: "center",
    paddingVertical: "3%",
    backgroundColor: "#61BAAC",
    flexDirection: "row",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  saveDraftBtn: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "#61BAAC",
    borderRadius: 10,
    width: wp("40"),
  },
  saveDraftText: {
    color: "#61BAAC",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Nunito",
  },
  nextBtn: {
    backgroundColor: "#61BAAC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: wp("40"),
    borderRadius: 10,
    marginLeft: 10,
    fontFamily: "Nunito",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nextBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Nunito",
    marginLeft: 10,
  },
  headerText: {
    fontFamily: "nunito",
    fontStyle: "normal",
    fontSize: 19,
    lineHeight: 25,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    marginTop: hp(2),
    marginBottom: hp(2),
  },
});
