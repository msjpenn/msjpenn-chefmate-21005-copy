import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import appColors from "../../utils/appColors";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu } from "react-native-paper";
import { recipeApiService } from "../../store/recipeCreation/services";
import IIcon from "react-native-vector-icons/Ionicons";

export const IngredientItem = ({
  ingredientItem,
  sectionIndex,
  ingredientIndex,
  sections,
  setSections,
}) => {
  console.log(" IngredientItem sections", sections);
  console.log(" IngredientItem ingredientItem", ingredientItem);

  const [isOpen, setOpen] = useState(false);

  let unitItems = [
    { label: "Tablespoon", value: "tablespoon" },
    { label: "Teaspoon", value: "teaspoon" },
    { label: "Cup", value: "cup" },
    { label: "Gallon", value: "gallon" },
    { label: "Gram", value: "gram" },
    { label: "Kilogram", value: "kilogram" },
    { label: "Mililiter", value: "mililiter" },
    { label: "Ounce", value: "ounce" },
    { label: "Piece", value: "piece" },
    { label: "Pound", value: "pound" },
    { label: "Quart", value: "quart" },
    { label: "Slice", value: "slice" },
    { label: "Other Unit", value: "other unit" },
  ];

  const handleNameChange = (nameInput) => {
    const newGroup = sections.map((section, index) => {
      return sectionIndex === index
        ? {
            ...section,
            ingredients: section.ingredients.map((ingredientItem, index) => {
              return ingredientIndex === index
                ? {
                    ...ingredientItem,
                    name: nameInput,
                  }
                : ingredientItem;
            }),
          }
        : { ...section };
    });
    setSections(newGroup);
  };

  const handleAmountChange = (amountInput) => {
    console.log(amountInput, sectionIndex, ingredientIndex);

    const newGroup = sections.map((section, index) => {
      return sectionIndex === index
        ? {
            ...section,
            ingredients: section.ingredients.map((ingredientItem, index) => {
              return ingredientIndex === index
                ? {
                    ...ingredientItem,
                    amount: parseInt(amountInput),
                  }
                : ingredientItem;
            }),
          }
        : { ...section };
    });
    console.log(newGroup);
    setSections(newGroup);
  };

  const handleUnitChange = (unitInput) => {
    const newGroup = sections.map((section) => ({
      ...section,
      ingredients: section.ingredients.map((ingredientItem, index) => {
        return ingredientIndex === index
          ? {
              ...ingredientItem,
              unit: unitInput.value,
            }
          : ingredientItem;
      }),
    }));
    console.log(newGroup);

    setSections(newGroup);
  };

  const deleteAlert = () => {
    Alert.alert("Remove", "Remove ingredient from the list?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => handleRemoveIngredient() },
    ]);
  };

  const handleRemoveIngredient = async () => {
    if (sections[sectionIndex].ingredients.length <= 1) {
      Toast.show("Each section must have atleast one ingredient ", Toast.LONG);
      return;
    }

    if (ingredientItem?.id) {
      try {
        const payload = {
          id: ingredientItem.id,
        };
        const res = await recipeApiService.doDeleteIngredients(payload);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    const newSection = sections.map((section, index) => {
      return sectionIndex === index
        ? {
            ...section,
            ingredients: section.ingredients.filter(
              (ingredientItem, index) => ingredientIndex !== index
            ),
          }
        : { ...section };
    });
    console.log("after remove", newSection);
    setSections(newSection);
  };

  return (
    <View style={styles.ingredientContainer}>
      <View style={styles.addIngredient}>
        <View>
          <Text style={styles.label}>Add Ingredients</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Tomato sauce"
            onChangeText={handleNameChange}
            value={ingredientItem.name}
          />
        </View>
        <TouchableOpacity onPress={() => deleteAlert()}>
          <EntypoIcon name="cross" style={styles.optionsBtn} />
        </TouchableOpacity>
      </View>

      <View style={styles.amountUnit}>
        <View>
          <Text style={styles.label}>Add Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg: 1"
            keyboardType="numeric"
            onChangeText={handleAmountChange}
            value={ingredientItem.amount ? `${ingredientItem.amount}` : null}
          />
        </View>
        <View>
          <Text style={styles.label}>Select Unit</Text>

          <View style={{ maxHeight: 200 }}>
            <Menu
              style={{ marginTop: 20 }}
              visible={isOpen}
              onDismiss={() => setOpen(false)}
              anchor={
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Text style={styles.input}>{ingredientItem.unit}</Text>
                </TouchableOpacity>
              }
            >
              <ScrollView style={{ height: 200, overflow: "scroll" }}>
                {unitItems.map((unit, idx) => (
                  <Menu.Item
                    key={idx}
                    onPress={() => {
                      handleUnitChange(unit);
                      setOpen(false);
                    }}
                    title={`${unit.label}`}
                  />
                ))}
              </ScrollView>
              <IIcon
                name="ios-chevron-down-sharp"
                size={24}
                style={{ alignSelf: "center" }}
              />
            </Menu>
          </View>
        </View>
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
