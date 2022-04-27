import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import * as AppStyles from "../../../components/appStyles";
import {
  doAddRecipeDetail,
  doPostRecipe,
  doPostRecipeIngredients,
  doPostInstructions,
} from "./../../../store/recipeCreation/actions";
import { recipeApiService } from "./../../../store/recipeCreation/services";
import Toast from "react-native-simple-toast";

const app = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const recipeId = route.params?.recipeId;
  const authUser = useSelector((state) => state.authReducer);
  const titleState = useSelector((state) => state.recipeCreationReducer?.title);
  const recipe = useSelector((state) => state.recipeCreationReducer);
  const section = useSelector((state) => state.recipeCreationReducer?.section);
  const [isLoading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(recipe.title);
  const [time, setTime] = React.useState(
    recipe.total_hours_to_make ? `${recipe.total_hours_to_make}` : null
  );
  const [size, setSize] = React.useState(
    recipe.serving_size ? recipe.serving_size : null
  );
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    handleSubmit();
  }, []);

  React.useEffect(() => {
    if (typeof recipe.id != "undefined" && recipe.id != "") {
      updateSection();
    }
  }, [recipe.id]);

  React.useEffect(() => {
    if (recipe.instructionStatus && recipe.id != "" && section.length == 0) {
      //   navigation.navigate("RecreateFinalStepTwo", { recipeId: recipeId });
      if (recipe?.category.length > 0) {
        updateCategories;
      }
      navigation.navigate("RecreateSuccessScreen");

      setLoading(false);
    } else if (recipe.id != undefined && recipe.id != "") {
      updateSection();
    }
  }, [section.length]);

  const updateSection = async () => {
    try {
      let res = await recipeApiService.doPostRecipeSection({
        name: section[0]?.name,
        recipe: recipe.id,
      });

      console.log("res----res-", res);

      if (res.id) {
        if (section[0]?.instructions?.length > 0) {
          let instructions = section[0]?.instructions?.map((item) => {
            let data = item;
            data["section"] = res.id;
            data.image = item.image?.base64;
            return data;
          });
          dispatch(doPostInstructions(instructions));
        }
        if (section[0]?.ingredients?.length > 0) {
          let ingredients = section[0]?.ingredients?.map((item) => {
            let data = item;
            data["section"] = res.id;
            return data;
          });
          dispatch(doPostRecipeIngredients(ingredients));
        }
      }
    } catch (error) {
      console.log("err0r----", error);
    }
  };

  const handleSubmit = () => {
    console.log(typeof time, typeof size);
    let prepTime = parseInt(time);
    if (typeof prepTime !== "number") {
      Toast.show("Time should be a number", Toast.LONG);
      return;
    }

    if (!title) {
      Toast.show("Recipe title is required!", Toast.LONG);
      return;
    }

    if (!size) {
      Toast.show("Serving size is required!", Toast.LONG);
      return;
    }

    if (!time) {
      Toast.show("Time to prepare is required!", Toast.LONG);
      return;
    }
    console.log("title, time, size, rating ", title, time, size, rating);
    dispatch(doAddRecipeDetail({ title, time, size, rating }));

    console.log("recipe.type", recipe.type);
    setLoading(true);

    const data = {
      title: recipe.title,
      description: recipe.description,
      is_draft: false,
      total_hours_to_make: time,
      recreated_from: recipe.recreatedFrom,
      serving_size: size,
      user: authUser.user?.id,
    };

    if (recipe.image?.base64) {
      data["picture"] = recipe.image?.base64;
    }

    dispatch(doPostRecipe(data));
  };

  const updateCategories = async () => {
    try {
      let result = await recipeApiService.doCreateCategory(recipe.category);
    } catch (error) {
      console.log("updateCategories error", error);
    }
  };

  return (
    <>
      {isLoading && (
        <View style={AppStyles.styles.activityIndicatorContainer}>
          <ActivityIndicator
            size={"large"}
            color={AppStyles.headerBackgroundColor}
          />
        </View>
      )}
    </>
  );
};

export default app;

const FooterButtonContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 110px;
  left: 0px;
  top: 200px;
`;

const FooterButtonView = styled.View`
  position: absolute;
  width: 322px;
  height: 50px;
  left: 10%;
  top: 30px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const styles = StyleSheet.create({
  boldText: {
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
  },
  ratingContainer: {
    marginTop: 10,
  },
  subtext: {
    left: "0%",
    right: "14.66%",
    textAlign: "center",
    alignItems: "center",
    color: "#A9A9A9",
  },
  bottomButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  saveDraftButton: {
    height: 50,
    color: "black",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 20,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    width: 150,
    justifyContent: "center",
  },
  nextButton: {
    height: 50,
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito",
    lineHeight: 20,
    alignItems: "center",
    borderColor: "#61BAAC",
    borderWidth: 1,
    width: 150,
    borderRadius: 14,
    justifyContent: "center",
    paddingVertical: "3%",
    backgroundColor: "#61BAAC",
    flexDirection: "row",
  },
  arrowStyle: {
    marginLeft: "80%",
  },
});
