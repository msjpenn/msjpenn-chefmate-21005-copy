/* eslint-disable prettier/prettier */
import moment from "moment";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import Header from "../../../components/AddRecipeHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";
import { doSaveDraft } from "../../../store/drafts/actions";
import appColors from "../../../utils/appColors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { IngredientSectionItem } from "../../../components/Ingredients/IngredientSectionItem";
import IIcon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const app = ({ navigation, route }) => {
  const index = route.params?.index;
  const dispatch = useDispatch();

  const section = useSelector((state) => state.recipeCreationReducer?.section);

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
            `Please enter ingredient name ${i + 1} in Section ${
              sections[s].name
            } `,
            Toast.LONG
          );
          return;
        }
        if (!sections[s].ingredients[i].amount) {
          Toast.show(
            `Please enter ingredient amount ${i + 1} in Section ${
              sections[s].name
            } `,
            Toast.LONG
          );
          return;
        }
      }
    }

    navigation.navigate("RecreationAddInstructionsSection", {
      sections: sections,
    });
  };

  const saveDraft = () => {
    console.log(sections);

    const draft = {
      draftId: moment().unix(),
      draftDate: moment().format("L"),
      // image: recipeCreationState.image,
      recreatedFrom: recipeCreationState.recipeId,
      title: recipeCreationState.title,
      time: recipeCreationState.total_hours_to_make,
      total_hours_to_make: recipeCreationState.total_hours_to_make,
      previewImage: recipeCreationState.recipeImage,
      recipeDetails: recipeCreationState.payload,
      description: recipeCreationState.description,
      rating: recipeCreationState.rating,
      section: sections,
      serving_size: recipeCreationState.serving_size,
      category: recipeCreationState.category,
      section: recipeCreationState.section,
    };
    console.log(draft);
    dispatch(doSaveDraft(draft));
    Toast.show("Draft successfully saved", Toast.LONG);
  };

  return (
    <Header htext={`Add Ingredients`}>
      <KeyboardAwareScrollView>
        {sections.map((sectionItem, sectionIndex) => {
          return (
            <View key={sectionIndex}>
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

  optionsBtn: {
    fontSize: 20,
  },
  input: {
    color: appColors.black,
    fontWeight: "500",
    fontSize: RFPercentage(2),
    marginTop: 7,
  },
  label: {
    fontSize: RFPercentage(2),
    color: appColors.labelGray,
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
  amountUnit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addNewContainer: {
    flexDirection: "row",
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
    marginBottom: 30,
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

  // actionSheet styles
  actionsheetContainer: {
    width: wp("80"),
    backgroundColor: "transparent",
    bottom: hp("5"),
    elevation: 0,
  },
  actionsheetOption: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  actionsheetCloseView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
  },
  actionsheetOptionView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
});

const Arrow = styled.Image``;

const ItemSubText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #000;
  width: 70px;
`;

const ItemText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  width: 70px;
`;
const ItemTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const ItemView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  /* position: absolute; */
  width: 375px;
  height: 93.87px;
  left: 0px;
  top: 0px;

  /* Inside Auto Layout */

  margin: 0px 0px;
`;
const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  left: 4.27%;
`;

const Label2 = styled.Text`
  position: relative;
  left: 4.27%;
  right: -4%;
  /* top: 67.98%; */
  /* bottom: 29.8%; */

  /* SmallPrint */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  font-weight: bold;
  line-height: 18px;
  /* identical to box height, or 150% */

  /* Gray - 1 */

  color: #4c4c4c;
`;
