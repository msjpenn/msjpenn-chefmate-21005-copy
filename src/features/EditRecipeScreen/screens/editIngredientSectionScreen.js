/* eslint-disable prettier/prettier */
import moment from "moment";
import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/AddRecipeHeader";
import { doSaveDraft } from "../../../store/drafts/actions";
import appColors from "../../../utils/appColors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";
import { recipeApiService } from "../../../store/recipeCreation/services";
import { IngredientSectionItem } from "../../../components/Ingredients/IngredientSectionItem";
import IIcon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const app = ({ navigation, route }) => {
  const index = route.params?.index;
  const dispatch = useDispatch();
  const recipeState = useSelector((state) => state.recipeCreationReducer);
  const section = useSelector((state) => state.recipeCreationReducer?.section);
  const draftState = useSelector((state) => state.draftReducer);

  const [sections, setSections] = React.useState(section);

  const handleNext = () => {
    console.log(sections);

    for (let s = 0; s < sections.length; s++) {
      if (!sections[s].name) {
        Toast.show(`Please enter Section ${s + 1} name`, Toast.LONG);
        return;
      }
      for (let i = 0; i < sections[s]?.ingredients.length; i++) {
        if (!sections[s].ingredients[i].name) {
          Toast.show(
            `Please enter ingredient name ${i + 1} in Section ${s + 1} `,
            Toast.LONG
          );
          return;
        }
        if (!sections[s].ingredients[i].amount) {
          Toast.show(
            `Please enter ingredient amount ${i + 1} in Section ${s + 1} `,
            Toast.LONG
          );
          return;
        }
      }
    }

    navigation.navigate("EditInstructionsSectionScreen", {
      sections: sections,
    });
  };

  const saveDraft = () => {
    console.log(sections);

    const draft = {
      draftId: moment().unix(),
      draftDate: moment().format("L"),
      image: recipeState?.image,
      recreatedFrom: recipeState?.recipeId,
      title: recipeState?.title,
      time: recipeState?.total_hours_to_make,
      total_hours_to_make: recipeState?.total_hours_to_make,
      previewImage: recipeState?.recipeImage,
      recipeDetails: recipeState?.payload,
      description: recipeState?.description,
      rating: recipeState?.rating,
      section: sections,
      serving_size: recipeState?.serving_size,
      category: recipeState?.category,
      section: recipeState?.section,
    };
    console.log(draft);
    dispatch(doSaveDraft(draft));
    Toast.show("Draft successfully saved", Toast.LONG);
  };

  return (
    <Header htext={`Edit ingredients`}>
      <KeyboardAwareScrollView>
        {sections.map((sectionItem, sectionIndex) => {
          return (
            <View key={sectionIndex}>
              {/* {renderSections(sectionItem, sectionIndex)} */}
              <IngredientSectionItem
                sectionIndex={sectionIndex}
                sectionItem={sectionItem}
                sections={sections}
                setSections={setSections}
              />
            </View>
          );
        })}
      </KeyboardAwareScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={saveDraft} style={styles.saveDraftBtn}>
          <Text style={styles.saveDraftText}>Save Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
          <View />
          <Text style={styles.nextBtnText}>Next</Text>
          <IIcon
            name="chevron-forward"
            color="#fff"
            size={24}
            style={{ marginLeft: 0 }}
          />
        </TouchableOpacity>
      </View>

      <View></View>
    </Header>
  );
};

export default app;

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
});
