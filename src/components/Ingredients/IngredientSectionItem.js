import moment from "moment";
import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import appColors from "../../utils/appColors";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";
import { IngredientItem } from "./IngredientItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const IngredientSectionItem = ({
  sectionItem,
  sectionIndex,
  sections,
  setSections,
}) => {
  console.log(" IngredientSectionItem sections", sections);

  const handleSectionNameChange = (nameInput) => {
    const newSections = sections.map((section, index) => {
      return sectionIndex === index
        ? {
            ...section,
            name: nameInput,
          }
        : section;
    });
    setSections(newSections);
  };

  const deleteAlert = () =>
    Alert.alert("Remove", "Remove entire section", [
      {
        text: "Cancel",
        onPress: () => console.log("Canceled"),
        style: "cancel",
      },
      { text: "OK", onPress: () => handleRemoveSection() },
    ]);

  const handleRemoveSection = () => {
    if (sections.length <= 1) {
      Toast.show("Each recipe must have atleast one section ", Toast.LONG);
      return;
    }

    const newSection = sections.filter(
      (section, index) => sectionIndex !== index
    );
    console.log("after remove", newSection);
    setSections(newSection);
  };

  const handleAddNewSection = () => {
    const newSection = [
      ...sections,
      {
        name: "",
        ingredients: [{ name: "", amount: null, unit: "teaspoon" }],
        instructions: [{ description: "", image: {} }],
      },
    ];
    setSections(newSection);
  };

  const handleAddIngredient = (sectionIndex) => {
    let sectionData = [...sections];
    let currentSection = sectionData[sectionIndex];
    console.log("currentSection", currentSection);
    currentSection.ingredients = [
      ...currentSection.ingredients,
      { name: "", amount: null, unit: "teaspoon" },
    ];
    console.log("new currentSection", currentSection);

    sectionData[sectionIndex] = currentSection;
    console.log(sectionData);
    setSections(sectionData);
  };

  return (
    <View>
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.label}>Add Section</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Tomato sauce"
            onChangeText={handleSectionNameChange}
            value={sectionItem.name}
          />
        </View>
        <EntypoIcon
          name="cross"
          style={styles.optionsBtn}
          onPress={() => deleteAlert()}
        />
      </View>
      {sections[sectionIndex]?.ingredients?.map(
        (ingredient, ingredientIndex) => {
          return (
            <View key={ingredientIndex}>
              {/* {renderIngredient(ingredient, sectionIndex, ingredientIndex)} */}
              <IngredientItem
                ingredientItem={ingredient}
                sectionIndex={sectionIndex}
                ingredientIndex={ingredientIndex}
                sections={sections}
                setSections={setSections}
              />
            </View>
          );
        }
      )}

      <View style={styles.sectionContainerFooter}>
        <TouchableOpacity
          onPress={() => handleAddIngredient(sectionIndex)}
          style={styles.addNewContainerIngedient}
        >
          <EntypoIcon name="plus" color="#61BAAC" size={20} />
          <Text style={styles.addSectionIngredientText}>
            Add new ingredient
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleAddNewSection()}
          style={styles.addNewContainer}
        >
          <EntypoIcon name="plus" color="#61BAAC" size={20} />
          <Text style={styles.addSectionText}>Add new section</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("80"),
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  sectionContainerFooter: {
    width: wp("80"),
    alignSelf: "center",
    marginVertical: 10,
  },
  optionsBtn: {
    fontSize: 20,
  },
  ingredientContainer: {
    backgroundColor: "white",
    width: wp("80"),
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  addIngredient: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    color: appColors.black,
    fontWeight: "600",
    fontSize: 15,
    marginTop: 7,
    fontFamily: "Nunito",
  },
  label: {
    fontSize: 15,
    color: appColors.labelGray,
    fontFamily: "Nunito",
  },
  amountUnit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addNewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  addNewContainerIngedient: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#efefef",
    borderBottomWidth: 3,
    paddingBottom: 5,
  },
  addSectionIngredientText: {
    color: "#61BAAC",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  addSectionText: {
    color: "#61BAAC",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  saveDraftBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#61BAAC",
    borderRadius: 10,
    width: wp("40"),
  },
  saveDraftText: {
    color: "#61BAAC",
    fontSize: 20,
    textAlign: "center",
  },
  nextBtn: {
    backgroundColor: "#61BAAC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: wp("40"),
    borderRadius: 10,
    marginLeft: 10,
  },
  nextBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
