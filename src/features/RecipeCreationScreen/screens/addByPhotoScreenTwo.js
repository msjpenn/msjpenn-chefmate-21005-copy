import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import styled from "styled-components/native";
import * as AppStyles from "../../../components/appStyles";
import Header from "../../../components/AddRecipeHeader";
import { useSelector, useDispatch } from "react-redux";
import { doDeletePhoto } from "./../../../store/recipeCreation/actions";
import IIcon from "react-native-vector-icons/Ionicons";

const app = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.recipeCreationReducer?.photos);

  const handleDeleteImg = (item) => {
    dispatch(doDeletePhoto(item));
  };

  return (
    <Header>
      <HText>Great Job!</HText>
      <HSubText>
        Your photo / video was successfully uploaded. {"\n"}
        Continue or take another shot.
      </HSubText>

      <ImageView horizontal={true}>
        {data.map((item, index) => {
          return (
            <ImageBackground key={index} source={{ uri: item.uri }}>
              <ImageButton onPress={() => handleDeleteImg(item)}>
                <CrossImage
                  source={require("../../../assets/images/cross.png")}
                />
              </ImageButton>
            </ImageBackground>
          );
        })}
      </ImageView>
      <AddPhotosView>
        <AddPhotosButton
          onPress={() => navigation.navigate("AddByPictureHomeScreen")}
        >
          <Image source={require("../../../assets/images/add_photos.png")} />
          <AddPhotosText>Add Photo(s)</AddPhotosText>
        </AddPhotosButton>
      </AddPhotosView>
      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate("FinalStepOne")}
      >
        <View />
        <Text style={styles.buttonPrimaryText}>Next</Text>

        <IIcon
          name="chevron-forward"
          color="#fff"
          size={24}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    </Header>
  );
};

const AddPhotosText = styled.Text`
  color: #999999;
  position: absolute;
  left: 41.16%;
  /* right: 30.14%; */
  /* top: 28.33%; */
  /* bottom: 35%; */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
`;

const AddPhotosButton = styled.TouchableOpacity`
  position: absolute;
  left: 30.43%;
  right: 30.14%;
  top: 28.33%;
  bottom: 35%;
`;

const AddPhotosView = styled.View`
  position: absolute;
  left: 4.11%;
  right: 3.89%;
  top: 52%;
  bottom: 39.66%;
  background: #f2f2f2;
  border: 1px dashed #dddddd;
  border-radius: 10px;
`;

const ImageButton = styled.TouchableOpacity`
  width: 36px;
  left: 125.4px;
  height: 36px;
  position: relative;
`;

const ImageView = styled.ScrollView`
  position: absolute;
  top: 20%;
  flex: 1;
  flex-direction: row;
`;

const CrossImage = styled.Image`
  position: absolute;
  width: 36px;
  height: 36px;
`;

const ImageBackground = styled.ImageBackground`
  width: 165px;
  height: 165px;
  left: 20.4px;
  margin: 5px;
`;

const HText = styled.Text`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 5%;
  bottom: 0%;

  /* Content H1 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 25px;
  /* or 132% */

  text-align: center;

  /* Black */

  color: #000000;

  /* Inside Auto Layout */

  flex: none;
  flex-grow: 0;
  margin: 0px 10px;
`;

const HSubText = styled.Text`
  position: relative;
  top: 10%;
  /* ListDescription */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  /* or 136% */

  display: flex;
  align-items: center;
  text-align: center;
  /* Gray - 1 */

  color: #4c4c4c;
  opacity: 0.8;
`;

export default app;

const styles = StyleSheet.create({
  buttonPrimaryText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Nunito",
    fontWeight: "700",
  },

  buttonPrimary: {
    position: "absolute",
    left: "4.11%",
    right: "3.89%",
    top: "69%",
    bottom: "39.66%",
    height: 50,
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 24,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    width: "90%",
    borderRadius: 14,
    justifyContent: "space-between",
    backgroundColor: "#61BAAC",
    flexDirection: "row",
    marginBottom: 30,
    alignSelf: "center",
  },
});
