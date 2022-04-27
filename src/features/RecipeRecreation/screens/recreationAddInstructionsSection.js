import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/AddRecipeHeader";
import { InstructionSectionItem } from "../../../components/Sections/instructionSectionItem";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import { doAddSectionData } from "../../../store/recipeCreation/actions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-simple-toast";
import { launchImageLibrary } from "react-native-image-picker";
import IIcon from "react-native-vector-icons/Ionicons";

const app = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [sections, setSections] = useState([...route?.params?.sections]);
  const recipeCreationState = useSelector(
    (state) => state.recipeCreationReducer
  );

  useEffect(() => {
    console.log(route.params?.sections);
  }, []);

  const handleNext = () => {
    console.log(sections);

    for (let s = 0; s < sections.length; s++) {
      for (let i = 0; i < sections[s].instructions.length; i++) {
        if (!sections[s].instructions[i].description) {
          Toast.show(
            `Please enter description ${i + 1} for Section ${
              sections[s].name
            } `,
            Toast.LONG
          );
          return;
        }
      }
    }
    dispatch(doAddSectionData(sections));
    navigation.navigate("RecreateFinalStepOne");
  };

  const saveDraft = () => {
    console.log(sections);

    const draft = {
      draftId: moment().unix(),
      draftDate: moment().format("L"),
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
    <Header htext={`Add Instructions`}>
      <ScrollView>
        {sections.map((sectionItem, sectionIndex) => {
          return (
            <View key={sectionIndex}>
              <InstructionSectionItem
                sectionIndex={sectionIndex}
                instuctionItem={sectionItem}
                sections={sections}
                setSections={setSections}
              />
            </View>
          );
        })}
      </ScrollView>
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
    </Header>
  );
};
export default app;

const styles = StyleSheet.create({
  sectionContainer: {
    width: wp("80"),
    alignSelf: "center",
  },
  sectionName: {
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  instructionInput: {
    backgroundColor: "white",
    minHeight: hp("20"),
    textAlignVertical: "top",
    borderRadius: 10,
    marginTop: 10,
  },
  addNewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  addStepText: {
    color: "#61BAAC",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  addPhotoVideoContainer: {
    backgroundColor: "#efefef",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderStyle: "dotted",
    borderWidth: 2,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nextBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
