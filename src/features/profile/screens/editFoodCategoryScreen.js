import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import RoundCheckbox from "rn-round-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS } from "../../../store/constants";
import {
  DO_GET_CATEGORIES,
  DO_UPDATE_CATEGORIES,
} from "../../../store/profile/constants";
import CBActionStatus from "../../../components/ActionStatus";
import EggIcon from "../../../assets/svg/EggIcon.svg";
import ChickenIcon from "../../../assets/svg/ChickenIcon.svg";
import SaladIcon from "../../../assets/svg/SaladIcon.svg";
import PopCornIcon from "../../../assets/svg/PopCornIcon.svg";
import CarrotIcon from "../../../assets/svg/CarrotIcon.svg";
import AsianIcon from "../../../assets/svg/AsianIcon.svg";
import styled from "styled-components/native";

const EditFoodCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.profileReducer.categories);
  const updateCategoriesStatus = useSelector(
    (state) => state.profileReducer.updateCategories.status
  );
  const [categoryItems, setCategoryItems] = React.useState(categories);
  const [refresh, setRefresh] = React.useState(false);
  const [showCategoryLimitError, setShowCategoryLimitError] = React.useState(
    false
  );

  const CHECKOUTLINE = require("../../../assets/images/CheckOutline.png");
  const CHECKFULL = require("../../../assets/images/CheckFull.png");

  const errorMessage = useSelector(
    (state) => state.profileReducer.updateCategories.errorMessage
  );
  const user = useSelector((state) => state.authReducer.user);

  const selectCategory = (selectedItem) => {
    selectedItem.isSelected = !selectedItem.isSelected;
    console.log("in selectCategory for " + JSON.stringify(selectedItem));
    let updatedCategoryItems = categoryItems;
    const index = categoryItems.findIndex(
      (item) => selectedItem.id === item.id
    );
    updatedCategoryItems[index] = selectedItem;

    setCategoryItems(updatedCategoryItems);
    setRefresh(!refresh);
  };

  const performSubmission = () => {
    let isValid = true;
    let selectedCategoryIds = [];
    let categoriesSelectedByUser = categoryItems.filter(
      (cat) => cat.isSelected == true
    );
    if (categoriesSelectedByUser.length > 5) {
      setShowCategoryLimitError(true);
      isValid = false;
    } else {
      setShowCategoryLimitError(false);
      categoriesSelectedByUser.forEach((element) => {
        selectedCategoryIds.push(element.id);
      });
      console.log(selectedCategoryIds);
    }
    if (isValid) {
      dispatch({
        type: DO_UPDATE_CATEGORIES,
        userId: user.id,
        categoryIds: selectedCategoryIds,
      });
    }
  };

  React.useEffect(() => {
    dispatch({ type: DO_GET_CATEGORIES, email: user.email });
  }, []);

  React.useEffect(() => {
    setCategoryItems(categories);
  }, [categories]);

  React.useEffect(() => {
    if (updateCategoriesStatus == SUCCESS) {
      navigation.navigate("ProfileScreenSet", {
        screen: "EditMeasurementSystemScreen",
      });
    }
  }, [updateCategoriesStatus]);

  const CancelBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }}
      >
        <Text style={{ color: "#fff", marginRight: 10 }}>Cancel</Text>
      </TouchableOpacity>
    );
  };

  const datasource = [
    {
      image: EggIcon,
      label: "Breakfast",
      id: 0,
    },
    {
      image: ChickenIcon,
      label: "Lunch",
      id: 1,
    },
    {
      image: SaladIcon,
      label: "Salad",
      id: 2,
    },
    {
      image: PopCornIcon,
      label: "Snack",
      id: 3,
    },
    {
      image: CarrotIcon,
      label: "Vegan",
      id: 4,
    },
    {
      image: AsianIcon,
      label: "Asian",
      id: 6,
    },
  ];

  const [items, setItems] = React.useState(datasource);
  const [count, setCount] = React.useState(0);

  const renderItem = (data) => {
    return (
      <ItemView>
        <ItemTouchableOpacity onPress={() => selectItem(data)}>
          <data.item.image height={40} width={40} />
          <ItemText>{data.item.label}</ItemText>
          <CheckBox source={data.item.isSelected ? CHECKFULL : CHECKOUTLINE} />
        </ItemTouchableOpacity>
      </ItemView>
    );
  };

  const selectItem = (data) => {
    if (data.item.isSelected) {
      data.item.isSelected = false;
      setCount(count - 1);
    } else {
      if (count < 5) {
        setCount(count + 1);
        data.item.isSelected = true;
      }
    }
    console.log(count);
    const index = items.findIndex((item) => data.item.id === item.id);
    let tempArray = [...items];
    tempArray[index] = data.item;
    setCategoryItems(tempArray);
  };

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <CBHeader
          title="Profile Settings"
          navigation={navigation}
          rightComponent={<CancelBtn />}
        />
        <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
          <View
            style={[
              styles.headingBox,
              { paddingTop: 30, paddingHorizontal: 30 },
            ]}
          >
            <Text style={AppStyles.styles.content_h1}>
              What type of food you cook most often or which recipes you most
              often search for?
            </Text>
            <Text style={[AppStyles.styles.content_regular, { marginTop: 10 }]}>
              Select up to 5 categories
            </Text>
          </View>
          <FlatList
            key={items.length}
            data={items}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
            extraData={items}
            ListFooterComponent={<View style={{ height: 50 }} />}
          />
        </View>
        <View style={styles.foodCategorybtnContainer}>
          <TouchableOpacity
            onPress={() => performSubmission()}
            title="Next"
            style={AppStyles.styles.buttonPrimary}
          >
            <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
export default EditFoodCategoryScreen;

const styles = StyleSheet.create({
  foodTypeBox: {
    flex: 1,
    width: "100%",
    marginTop: "8%",
    //backgroundColor:'yellow',
  },
  foodTypeBtn: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  foodTypeIconBox: {
    paddingLeft: "1%",
  },
  foodMainIcon: {
    height: 40,
    width: 40,
  },

  foodTypeCheck: {
    justifyContent: "center",
  },

  foodNameTxtBox: {
    width: "80%",
    justifyContent: "center",
    paddingLeft: "10%",
  },

  foodCategorybtnContainer: {
    //overflow: "hidden",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: "5%",
    //shadowOpacity: 5,
    //shadowRadius: 18,
    elevation: 5,
    height: 100,
    justifyContent: "center",
  },
  foodCategorybtnTxt: {
    alignItems: "center",
    color: "white",
    fontSize: 17,
  },
});
const ItemText = styled.Text`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  width: 70px;
`;

const CheckBox = styled.Image`
  margin-left: 50%;
`;

const ItemTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
const ItemView = styled.View`
  border: 0.5px solid #e6e6e6;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 70px;
`;
