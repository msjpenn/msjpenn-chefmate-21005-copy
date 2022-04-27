import React, { createRef } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
import { groceriesServices } from "../../../store/groceries/services";
import { useDispatch, useSelector } from "react-redux";
import ActionSheet from "react-native-actions-sheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-simple-toast";

import {} from "../../../store/groceries/actions";

const actionSheetRef = createRef();

const GroceriesItemDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(false);
  const [itemName, setItemname] = React.useState("");
  const [itemId, setItemId] = React.useState("");
  const [qty, setQty] = React.useState("");
  React.useEffect(() => {
    let params = route.params;
    if (params) {
      setItemname(params.name);
      setItemId(params.id);
      setQty(params.quantity);
    }
  }, []);

  const increaseQty = () => {
    let qty1 = parseInt(qty);
    setQty(qty1 + 1);
  };

  const decreaseQty = () => {
    let qty1 = parseInt(qty);
    if (qty > 0) {
      setQty(qty1 - 1);
    }
  };

  const onNameChange = (txt) => {
    setItemname(txt);
  };

  const updateGrocery = async () => {
    if (itemName == route.params?.name && qty == route.params.quantity) {
      Alert.alert("Alert", "No changes found in Grocery Item.");
      return;
    }
    try {
      setLoading(true);
      let payload = route.params;
      payload["name"] = itemName;
      payload["quantity"] = qty;
      if (qty == 0) {
        payload["crossed"] = true;
      }
      let results = await groceriesServices.doUpdateGroceryItem(payload);
      setLoading(false);
      Toast.show("Successfully updated that item", Toast.LONG);

      console.log("Result==>", results);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.response);
      console.log("error=>", error);
    }
  };

  //action sheet
  const onCloseActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const onClickDelete = () => {
    onCloseActionSheet();
    console.log(itemId);
    if (itemId) {
      Alert.alert("Delete", "Do you want to delete this grocery?", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete Item",
          onPress: async () => {
            try {
              setLoading(true);
              const result = await groceriesServices.doDeleteGroceriesListItem(
                itemId
              );
              console.log("Result==>", result);
              Toast.show("Successfully deleted that item", Toast.LONG);

              setLoading(false);
              navigation?.goBack();
            } catch (error) {
              setLoading(false);
              Alert.alert("Error", error.response);
              console.log("error=>", error);
            }
          },
        },
      ]);
    }
  };

  const onClickCross = async () => {
    let params = route.params;

    try {
      setLoading(true);
      let payload = {
        crossed: true,
        id: params.id,
      };
      let results = await groceriesServices.doUpdateGroceryItem(payload);
      Toast.show("Successfully crossed off that item", Toast.LONG);

      setLoading(false);
      console.log("Result==>", results);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.response);
      console.log("error=>", error);
    }
  };

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <View>
          <CBHeader title="Grocery List" navigation={navigation} />
        </View>
        <View
          style={[
            AppStyles.styles.scrollHolderForHeaderScreen,
            { flex: 1, paddingTop: 10 },
          ]}
        >
          <SText style={styles.topRecipeName}>Recipe: English Muffins</SText>
          <RoundOuterConter style={styles.roundContainer}>
            <View style={styles.inputContainer}>
              <SText style={styles.inputHint}>Ingredient</SText>
              <InputText
                onChangeText={onNameChange}
                value={itemName}
                placeholder={"text"}
                placeholderTextColor={AppStyles.COLOR_GRAY_3}
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              onPress={() => actionSheetRef.current?.setModalVisible()}
            >
              <Icon
                size={24}
                style={styles.moreIcon}
                name="ellipsis-v"
                color={AppStyles.COLOR_GRAY_3}
                // onPress={onClickDelete}
                onPress={() => actionSheetRef.current?.setModalVisible()}
              />
            </TouchableOpacity>
          </RoundOuterConter>
          <View
            style={{
              width: "90%",
              margin: 20,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text
              onPress={decreaseQty}
              style={{
                borderWidth: 2,
                borderColor: "#000",
                borderRadius: 8,
                paddingHorizontal: 7,
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                marginHorizontal: 10,
              }}
            >
              -
            </Text>
            <Text style={{ color: "#000", margin: 5 }}>{qty}</Text>
            <Text
              onPress={increaseQty}
              style={{
                borderWidth: 2,
                borderColor: "#000",
                borderRadius: 8,
                paddingHorizontal: 5,
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                marginHorizontal: 10,
              }}
            >
              +
            </Text>
          </View>

          <TouchableOpacity
            onPress={updateGrocery}
            activeOpacity={0.7}
            style={{
              width: "50%",
              alignSelf: "center",
              borderRadius: 15,
              backgroundColor: AppStyles.headerBackgroundColor,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                textAlignVertical: "center",
                paddingVertical: 10,
                fontSize: 14,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>

          {isLoading && (
            <View style={AppStyles.styles.activityIndicatorContainer}>
              <ActivityIndicator
                size={"large"}
                color={AppStyles.headerBackgroundColor}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>

      {/* ActionSheet */}

      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          width: wp("80"),
          backgroundColor: "transparent",
          bottom: hp("5"),
          elevation: 0,
        }}
        defaultOverlayOpacity={0.6}
      >
        <View
          style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              onCloseActionSheet();
              onClickCross();
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Cross Off
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          />

          <TouchableOpacity onPress={() => onClickDelete()}>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Delete Item
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginTop: 10,
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={onCloseActionSheet}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
};

export default GroceriesItemDetail;

const styles = StyleSheet.create({
  topRecipeName: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  roundContainer: {
    width: "90%",
    height: 65,
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 2,
    padding: 10,
  },
  inputHint: {
    flex: 1,
  },
  input: {
    flex: 1,
    width: "100%",
  },
  moreIcon: {
    marginHorizontal: 10,
  },
});

/* Styles Components */
const SText = styled.Text`
  /* SmallPrint */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */

  /* Gray - 2 */

  color: #999999;
`;

const InputText = styled.TextInput`
  /* PlaceholderInput */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.3px;

  /* Black */

  color: #000000;
`;

const RoundOuterConter = styled.View`
  background: #ffffff;
  border-radius: 14px;
`;
