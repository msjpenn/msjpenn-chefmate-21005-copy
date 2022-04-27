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

export const InstructionItem = ({
  instuctionItem,
  sectionIndex,
  instructionIndex,
  sections,
  setSections,
}) => {
  const handleDescriptionChange = (descInput) => {
    const newGroup = sections.map((section, index) => {
      return sectionIndex === index
        ? {
            ...section,
            instructions: section.instructions.map((instructionItem, index) => {
              return instructionIndex === index
                ? {
                    ...instructionItem,
                    description: descInput,
                  }
                : instructionItem;
            }),
          }
        : { ...section };
    });
    console.log(newGroup);
    setSections(newGroup);
  };

  const handleAddImage = () => {
    chooseFile(sectionIndex, instructionIndex);
  };

  const deleteAlert = () =>
    Alert.alert("Remove", "Remove instruction from the list?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => handleRemoveInstruction() },
    ]);

  const handleRemoveInstruction = () => {
    if (sections[sectionIndex].instructions.length <= 1) {
      Toast.show("Each section must have atleast one instruction ", Toast.LONG);
      return;
    }

    const newSection = sections.map((section, index) => {
      return sectionIndex === index
        ? {
            ...section,
            instructions: section.instructions.filter(
              (instructionItem, index) => instructionIndex !== index
            ),
          }
        : { ...section };
    });

    console.log("after remove", newSection);
    setSections(newSection);
  };

  const handleRemoveInstructionImage = () => {
    const newSection = sections.map((section, index) => {
      return sectionIndex === index
        ? {
            ...section,
            instructions: section.instructions.map((instructionItem, index) => {
              return instructionIndex === index
                ? {
                    ...instructionItem,
                    image: {},
                  }
                : instructionItem;
            }),
          }
        : { ...section };
    });

    console.log("after remove", newSection);
    setSections(newSection);
  };

  const chooseFile = (sectionIndex, instructionIndex) => {
    let options = {
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);

      const newGroup = sections.map((section, index) => {
        return sectionIndex === index
          ? {
              ...section,
              instructions: section.instructions.map(
                (instructionItem, index) => {
                  return instructionIndex === index
                    ? {
                        ...instructionItem,
                        image: response,
                      }
                    : instructionItem;
                }
              ),
            }
          : { ...section };
      });
      console.log(newGroup);
      setSections(newGroup);
      // };
    });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            backgroundColor: "black",
            borderRadius: 22,
            width: 32,
            justifyContent: "center",
            height: 32,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            {instructionIndex + 1}
          </Text>
        </View>
        <EntypoIcon
          name="cross"
          size={24}
          style={{ alignSelf: "flex-end" }}
          onPress={() => deleteAlert()}
        />
      </View>

      <TextInput
        style={styles.instructionInput}
        placeholder="Describe steps"
        onChangeText={handleDescriptionChange}
        multiline={true}
        defaultValue={instuctionItem.description}
      />

      {instuctionItem?.image?.uri && (
        <View
          style={{
            margin: 10,
            position: "relative",
            width: 100,
            height: 100,
          }}
        >
          <TouchableOpacity
            onPress={handleRemoveInstructionImage}
            style={{
              position: "absolute",
              right: -10,
              top: -10,
              zIndex: 1,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <EntypoIcon
              name="cross"
              size={24}
              color="#000"
              onPress={handleRemoveInstructionImage}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: instuctionItem?.image?.uri }}
            style={{ height: 100, width: 100, borderRadius: 10, zIndex: 0 }}
          />
        </View>
      )}

      {!instuctionItem?.image?.uri && (
        <TouchableOpacity
          onPress={handleAddImage}
          style={styles.addPhotoVideoContainer}
        >
          <FA5Icon name="photo-video" size={24} />
          <Text style={{ marginLeft: 10 }}>Add Photo or Video</Text>
        </TouchableOpacity>
      )}
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
