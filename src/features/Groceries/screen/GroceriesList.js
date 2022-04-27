import React, { useEffect, useState } from "react";
import {
  FlatList,
  Animated,
  SafeAreaView,
  Keyboard,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
import GroceryListItem from "../../../components/Grocries/GroceryItems";
import GroceryCrossedItem from "../../../components/Grocries/GroceryCrossedItem";
import {
  doGetGroceriesList,
  doPostGroceriesListItem,
} from "../../../store/groceries/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { groceriesServices } from "../../../store/groceries/services";
import { request } from "../../../utils/http";
import axios from "axios";
import Toast from "react-native-simple-toast";

const GroceryList = ({ navigation }) => {
  const [groceries, setGroceries] = useState([]);
  const [groceriesCrossed, setGroceriesCrossed] = useState([]);

  const dispatch = useDispatch();

  const openingAnimation = React.useRef(new Animated.Value(0)).current;
  const user = useSelector((state) => state.authReducer.user);
  const isLoading = useSelector((state) => state.groceryReducer.isLoading);
  // const listData = useSelector((state) => {
  //   return state.groceryReducer.groceryList.filter((item) => {
  //     if (!item.crossed) {
  //       return item;
  //     }
  //   });
  // });

  // const listDataUnavailable = useSelector((state) => {
  //   return state.groceryReducer.groceryList.filter((item) => {
  //     if (item.crossed) {
  //       return item;
  //     }
  //   });
  // });
  const [addGroceryVisible, setAddGroceryVisible] = React.useState(false);
  const [groceryName, setGroceryName] = React.useState("");
  useFocusEffect(
    React.useCallback(() => {
      // dispatch(doGetGroceriesList(user.id));
      fetchGroceries();
    }, [])
  );

  const fetchGroceries = async () => {
    const response = await request.get(`/grocery/?user__id=${user.id}`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    });
    const notCrossed = response.data.filter((item) => !item.crossed);
    const crossed = response.data.filter((item) => item.crossed);

    setGroceries(notCrossed);
    setGroceriesCrossed(crossed);
    console.log("response.data", response.data);
  };

  const renderMainList = ({ item }) => {
    return (
      <GroceryListItem
        data={item}
        onInfoClick={() => {
          navigation.navigate("GroceriesItemDetail", { ...item });
        }}
      />
    );
  };

  const renderCrossedList = ({ item }) => {
    return (
      <GroceryCrossedItem
        data={item}
        onInfoClick={() => {
          navigation.navigate("GroceriesItemDetail", { ...item });
        }}
      />
    );
  };

  const openAddGrocery = () => {
    Animated.timing(openingAnimation, {
      toValue: Dimensions.get("screen").width - 30,
      duration: 500,
    }).start(setAddGroceryVisible(true));
  };

  const closeAddGrocery = () => {
    Animated.timing(openingAnimation, {
      toValue: 0,
      duration: 500,
    }).start(setAddGroceryVisible(false));
    Keyboard.dismiss();
  };

  const postGroceryItem = async () => {
    let postData = {
      name: groceryName,
      quantity: 1,
      user: user.id,
    };
    if (!groceryName) {
      Toast.show("Please enter grocery item", Toast.LONG);
      return;
    }
    // dispatch(doPostGroceriesListItem(postData));
    try {
      const res = await groceriesServices.doPostGroceriesListItem(postData);
      setGroceryName("");
      // dispatch(doGetGroceriesList(user.id));
      fetchGroceries();
      Toast.show("Successfully added grocery item", Toast.LONG);
    } catch (error) {
      Toast.show("Something went wrong while add grocery item. ", Toast.LONG);
    }
  };

  const deleteAllCrossed = async () => {
    try {
      let results = await groceriesServices.deleteAllGroceries(user.id);
      console.log("Result==>", results);
      fetchGroceries();
      // dispatch(doGetGroceriesList(user.id));
      Toast.show(
        "Something went wrong while deleting crossed of items. ",
        Toast.LONG
      );
    } catch (error) {
      Alert.alert("Error!", error);
    }
  };

  React.useEffect(() => {
    console.log("openingAnimation", openingAnimation?._value);
  }, [openingAnimation?._value]);

  const renderEmptyCrossed = () => {
    return <Text>Crossed List is Empty</Text>;
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
            { paddingTop: 10 },
          ]}
        >
          <View style={styles.addItemContainer}>
            {!addGroceryVisible ? (
              <View style={styles.addItemBtnContainer}>
                <Icon
                  size={20}
                  name="plus"
                  color={AppStyles.headerBackgroundColor}
                />
                <HText
                  onPress={() => {
                    openAddGrocery();
                  }}
                >
                  Add Item
                </HText>
              </View>
            ) : (
              <View style={styles.addItemBtnContainer}>
                <HText
                  onPress={() => {
                    closeAddGrocery();
                  }}
                >
                  Cancel
                </HText>
              </View>
            )}
          </View>
          {addGroceryVisible && (
            <Animated.View
              useNativeDriver={true}
              style={{
                width: openingAnimation,
                paddingHorizontal: 10,
                height: 50,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 12,
                backgroundColor: "#fff",
              }}
            >
              <InputAddGrocery
                value={groceryName}
                onChangeText={(txt) => {
                  setGroceryName(txt);
                }}
                placeHolder={"Add Grocery"}
                placeHolderTextColor={AppStyles.COLOR_GRAY_3}
                numberOfLines={1}
                style={{ flex: 4 }}
              ></InputAddGrocery>
              <HText
                style={{ flex: 1, textAlign: "center" }}
                onPress={() => {
                  postGroceryItem();
                }}
              >
                ADD
              </HText>
            </Animated.View>
          )}

          <View style={styles.listAreaMainContainer}>
            <FlatList
              style={styles.mainList}
              keyExtractor={(item) => item.id.toString()}
              data={groceries}
              renderItem={renderMainList}
            />
            {/* {listDataUnavailable.length > 0 && ( */}
            <View style={styles.secondListContainer}>
              <View style={styles.secondListHeader}>
                <MainText>Crossed off Items</MainText>
                <SecondryText onPress={deleteAllCrossed}>
                  Delete All
                </SecondryText>
              </View>
              <FlatList
                style={styles.mainList}
                keyExtractor={(item) => item.id.toString()}
                data={groceriesCrossed}
                renderItem={renderCrossedList}
                ListEmptyComponent={renderEmptyCrossed}
              />
            </View>
            {/* )} */}
          </View>
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
    </>
  );
};

export default GroceryList;

const styles = StyleSheet.create({
  addItemContainer: {
    height: 40,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  addItemBtnContainer: {
    height: "100%",
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  listAreaMainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  mainList: {
    flex: 2,
    width: "100%",
    paddingHorizontal: 20,
  },
  secondListContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: "50%",
    flex: 1,
  },
  secondListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 50,
  },
});

/* Styles Components */
const HText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  /* Seconday */

  color: ${AppStyles.headerBackgroundColor};
`;
const MainText = styled.Text`
  /* Content H1 */

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 25px;
  /* identical to box height, or 132% */

  color: #000000;
`;

const SecondryText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  text-align: right;
  text-decoration-line: underline;

  /* Gray - 2 */

  color: #999999;
`;

const InputAddGrocery = styled.TextInput`
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.3px;

  /* Black */

  color: #000000;
`;
