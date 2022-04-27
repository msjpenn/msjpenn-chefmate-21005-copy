import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EntypoIcon from "react-native-vector-icons/Entypo";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-simple-toast";
import { launchImageLibrary } from "react-native-image-picker";
import { InstructionItem } from "./instructionItem";

export const InstructionSectionItem = ({
  instuctionItem,
  sectionIndex,
  setSections,
  sections,
}) => {
  const handleAddStep = () => {
    let sectionData = [...sections];
    let currentSection = sectionData[sectionIndex];
    console.log("currentSection", currentSection);
    currentSection.instructions = [
      ...currentSection.instructions,
      { description: "", image: {} },
    ];
    console.log("new currentSection", currentSection);

    sectionData[sectionIndex] = currentSection;
    console.log(sectionData);
    setSections(sectionData);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionName}>{instuctionItem.name}</Text>

      {instuctionItem.instructions.map((instuctionItem, instructionIndex) => {
        return (
          <View key={instructionIndex}>
            {/* {renderInstruction(
                instuctionItem,
                sectionIndex,
                instructionIndex
              )} */}
            <InstructionItem
              sectionIndex={sectionIndex}
              sections={sections}
              setSections={setSections}
              instructionIndex={instructionIndex}
              instuctionItem={instuctionItem}
            />
          </View>
        );
      })}

      <TouchableOpacity
        onPress={() => handleAddStep(sectionIndex)}
        style={styles.addNewContainer}
      >
        <EntypoIcon name="plus" color="#61BAAC" size={24} />
        <Text style={styles.addStepText}>Add Step</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginTop: 3,
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
  },
  nextBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
