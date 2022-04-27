import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import * as AppStyles from "../../../components/appStyles";

const app = ({ navigation }) => {
  const data = useSelector((state) => state.recipeCreationReducer?.url);

  const handleSubmit = () => {
    navigation.navigate("FinalStepOne");
  };

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
          <View style={{ marginTop: 25, marginLeft: 25 }}>
            <View style={{}}>
              <Text style={styles.headingBoxText}>Please review</Text>
            </View>

            <Text
              style={{
                fontFamily: "Nunito",
                fontStyle: "normal",
                fontSize: 16,
                lineHeight: 25,
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Nunito",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: 16,
                  lineHeight: 25,
                }}
              >
                Link:{" "}
              </Text>
              {data.url}
            </Text>

            <TouchableOpacity
              style={{ marginVertical: 30 }}
              onPress={() => navigation.navigate("AddByURLScreen")}
            >
              <Text
                style={{
                  fontFamily: "Nunito",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: 16,
                  lineHeight: 25,
                  textDecorationLine: "underline",
                  color: "#A9A9A9",
                  textAlign: "center",
                }}
              >
                Remove Link
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: data.image }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                  marginHorizontal: 5,
                }}
              ></Image>
              <Text>{data.title}</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: "40%",
              padding: 35,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={AppStyles.styles.buttonPrimary}
              onPress={() => handleSubmit()}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
              <Image
                style={styles.arrowStyle}
                source={require("../../../assets/images/white_arrow.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default app;

const styles = StyleSheet.create({
  arrowStyle: {
    marginLeft: "80%",
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
    marginVertical: 30,
  },
});
