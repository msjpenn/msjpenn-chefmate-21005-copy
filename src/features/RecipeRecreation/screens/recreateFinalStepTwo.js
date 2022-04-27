import React, { useEffect } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  BackHandler,
  View,
} from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/AddRecipeHeader";
import RecipeFooter from "../../../components/RecipeFooter";
import { recipeApiService } from "./../../../store/recipeCreation/services";
import EggIcon from "../../../assets/svg/EggIcon.svg";
import ChickenIcon from "../../../assets/svg/ChickenIcon.svg";
import SaladIcon from "../../../assets/svg/SaladIcon.svg";
import PopCornIcon from "../../../assets/svg/PopCornIcon.svg";
import CarrotIcon from "../../../assets/svg/CarrotIcon.svg";
import AsianIcon from "../../../assets/svg/AsianIcon.svg";

const app = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const recipeId = route.params?.recipeId;
  const CHECKOUTLINE = require("../../../assets/images/CheckOutline.png");
  const CHECKFULL = require("../../../assets/images/CheckFull.png");
  const recipe = useSelector((state) => state.recipeCreationReducer);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

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
    setItems(tempArray);
  };

  const handleNext = async () => {
    let data = [];
    const filter = items.map((item) => {
      if (item.isSelected) {
        data.navigate({
          name: item.label,
          recipe: recipe?.id,
        });
      }
    });
    //dispatch(doAddCategory(filter))
    console.log(data);
    try {
      let result = await recipeApiService.doCreateCategory(data);
      console.log("resultttt", result);
      if (result) {
        console.log("recipeId===>", recipeId, recipe.id);
        navigation.navigate("RecreateAddRatingScreen", { id: recipe.id });
      }
    } catch (error) {}
    //
  };

  return (
    <Header>
      <HeaderText>
        Choose up to 5 different {"\n"}
        categories:
      </HeaderText>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <FlatListView>
            <FlatList
              key={items.length}
              data={items}
              ItemSeparatorComponent={FlatListItemSeparator}
              renderItem={(item) => renderItem(item)}
              keyExtractor={(item) => item.id.toString()}
              extraData={items}
              ListFooterComponent={<View style={{ height: 100 }} />}
            />
          </FlatListView>
        </ScrollView>
      </SafeAreaView>

      <RecipeFooter onClickNext={handleNext} />
    </Header>
  );
};

export default app;

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
const FooterView = styled.View`
  background-color: blue;
  height: 120px;
  position: relative;
`;

const FlatListItemSeparator = styled.View`
  height: 0.5px;
  width: 100%;
`;

const ScrollView = styled.ScrollView`
  top: 15%;
`;

const FlatListView = styled.View``;

const HeaderText = styled.Text`
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

const styles = StyleSheet.create({});
