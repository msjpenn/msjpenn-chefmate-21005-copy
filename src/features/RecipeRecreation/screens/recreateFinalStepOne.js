import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as AppStyles from "../../../components/appStyles";
import Header from "../../../components/AddRecipeHeader";
import CBTextInput from "../../../components/TextInput";
import {
  doAddRecipeDetail,
  doPostRecipe,
  doPostRecipeIngredients,
  doPostInstructions,
} from "./../../../store/recipeCreation/actions";
import { recipeApiService } from "./../../../store/recipeCreation/services";
import Toast from "react-native-simple-toast";
import { doSaveDraft } from "../../../store/drafts/actions";
import moment from "moment";
import IIcon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const app = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const recipeId = route.params?.recipeId;
  const authUser = useSelector((state) => state.authReducer);
  const titleState = useSelector((state) => state.recipeCreationReducer?.title);
  const recipe = useSelector((state) => state.recipeCreationReducer);
  const section = useSelector((state) => state.recipeCreationReducer?.section);
  const draftState = useSelector((state) => state.draftReducer);

  const [isLoading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(recipe.title);
  const [time, setTime] = React.useState(
    recipe.total_hours_to_make ? `${recipe.total_hours_to_make}` : null
  );
  const [size, setSize] = React.useState(
    recipe.serving_size ? `${recipe.serving_size}` : null
  );
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    if (typeof recipe.id != "undefined" && recipe.id != "") {
      updateSection();
    }
  }, [recipe.id]);

  React.useEffect(() => {
    if (recipe.instructionStatus && recipe.id != "" && section.length == 0) {
      navigation.navigate("RecreateFinalStepTwo", { recipeId: recipeId });
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

  React.useEffect(() => {
    if (titleState) setTitle(titleState);
  }, [titleState]);

  const saveDraft = () => {
    const { drafts } = draftState;
    const draft = {
      draftId: moment().unix(),
      draftDate: moment().format("L"),
      // image: recipe.image,
      recreatedFrom: recipe.recipeId,
      title: recipe.title,
      time: time,
      total_hours_to_make: time,
      previewImage: recipe.recipeImage,
      recipeDetails: recipe.payload,
      description: recipe.description,
      rating: recipe.rating,
      section: recipe.section,
      serving_size: size,
      category: recipe.category,
      section: recipe.section,
    };
    console.log(draft);
    dispatch(doSaveDraft(draft));
    Toast.show("Draft successfully saved", Toast.LONG);
  };

  return (
    <Header>
      <KeyboardAwareScrollView style={{ marginHorizontal: 10 }}>
        <Text style={styles.headerText}>Enter recipe details:</Text>

        <View style={{ alignItems: "center" }}>
          <View style={{ width: wp(90) }}>
            <CBTextInput
              label="Recipe title"
              value={title}
              onChangeText={(value) => setTitle(value)}
            ></CBTextInput>
          </View>
          <View style={{ width: wp(90) }}>
            <CBTextInput
              label="Total time to prepare & cook (in minutes)"
              value={time}
              onChangeText={(value) => setTime(parseInt(value))}
              keyboardType="numeric"
            ></CBTextInput>
          </View>
          <View style={{ width: wp(90) }}>
            <CBTextInput
              label="Serving size"
              value={size}
              onChangeText={(value) => setSize(parseInt(value))}
              keyboardType="numeric"
            ></CBTextInput>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={saveDraft} style={styles.saveDraftBtn}>
          <Text style={styles.saveDraftText}>Save Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={styles.nextBtn}>
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
      {isLoading && (
        <View style={AppStyles.styles.activityIndicatorContainer}>
          <ActivityIndicator
            size={"large"}
            color={AppStyles.headerBackgroundColor}
          />
        </View>
      )}
    </Header>
  );
};

export default app;

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
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  saveDraftBtn: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "#61BAAC",
    borderRadius: 10,
    width: wp("40"),
  },
  saveDraftText: {
    color: "#61BAAC",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Nunito",
  },
  nextBtn: {
    backgroundColor: "#61BAAC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: wp("40"),
    borderRadius: 10,
    marginLeft: 10,
    fontFamily: "Nunito",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nextBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Nunito",
    marginLeft: 10,
  },
  headerText: {
    fontFamily: "nunito",
    fontStyle: "normal",
    fontSize: 19,
    lineHeight: 25,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    marginTop: hp(2),
    marginBottom: hp(2),
  },
});
