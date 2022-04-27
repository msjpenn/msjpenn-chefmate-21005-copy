import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import { AirbnbRating } from "react-native-ratings";
import { customApiService } from "../../../store/recipe/services";
import { useSelector } from "react-redux";

const RecreateAddRatingScreen = ({ route, navigation }) => {
  const recipeId = route.params?.recipeId;
  const [ratingCount, setRatingCount] = React.useState(0);
  const authUser = useSelector((state) => state.authReducer);
  const recreatedFrom = useSelector(
    (state) => state.recipeCreationReducer?.recreatedFrom
  );

  const handleNext = async () => {
    try {
      const recipe_id = recreatedFrom || 1;
      const payload = {
        user: authUser?.user?.id,
        recipe: recipe_id,
        rate: ratingCount,
      };
      const res = await customApiService.doRateRecipe(payload);
      navigation.navigate("RecreateSuccessScreen");
      console.log(res);
    } catch (error) {
      navigation.navigate("RecreateSuccessScreen");
    }
  };

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    if (rating) {
      setRatingCount(rating);
    }
  };

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
          <KeyboardAvoidingView behavior="position" enabled>
            <View style={styles.rateRecipeContainer}>
              <View style={styles.rateRecipeheadingBox}>
                <View>
                  <Text style={styles.rateRecipeheadingText}>
                    Please rate this Recipe
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: "15%" }}>
                <AirbnbRating onFinishRating={ratingCompleted} />
              </View>

              <View style={styles.rateRecipeheadingBox}>
                <View>
                  <Text style={styles.rateRecipeheadingText}>
                    Please leave a comment
                  </Text>
                </View>
                <View>
                  <Text style={styles.rateRecipeSubText}>
                    You can give a rate only if you leave{"\n"} the comment.
                  </Text>
                </View>
              </View>
              <View style={styles.mainForm}>
                <View
                  style={[
                    styles.commentBox,
                    { height: 127, paddingHorizontal: 10 },
                  ]}
                >
                  <TextInput
                    placeholder="Write a comment..."
                    style={styles.commentBoxText}
                    multiline={true}
                  />
                </View>
              </View>
              {/* <View style={styles.ratingStarBox}>
                <View style={styles.starIconBox}>
                  <TouchableOpacity onPress={() => setRatingCount(1)}>
                    <Image
                      source={ratingCount >= 1 ? goldenStar : grayStar}
                      style={styles.starMainIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.starIconBox}>
                  <TouchableOpacity onPress={() => setRatingCount(2)}>
                    <Image
                      source={ratingCount >= 2 ? goldenStar : grayStar}
                      style={styles.starMainIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.starIconBox}>
                  <TouchableOpacity onPress={() => setRatingCount(3)}>
                    <Image
                      source={ratingCount >= 3 ? goldenStar : grayStar}
                      style={styles.starMainIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.starIconBox}>
                  <TouchableOpacity onPress={() => setRatingCount(4)}>
                    <Image
                      source={ratingCount >= 4 ? goldenStar : grayStar}
                      style={styles.starMainIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.starIconBox}>
                  <TouchableOpacity onPress={() => setRatingCount(5)}>
                    <Image
                      source={ratingCount >= 5 ? goldenStar : grayStar}
                      style={styles.starMainIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
             
             
             
             
              <View style={styles.rateRecipeheadingBox}>
                <View>
                  <Text style={styles.rateRecipeheadingText}>
                    Please leave a comment
                  </Text>
                </View>
                <View>
                  <Text style={styles.rateRecipeSubText}>
                    You can give a rate only if you leave{"\n"} the comment.
                  </Text>
                </View>
              </View>
              <View style={styles.mainForm}>
                <View
                  style={[
                    styles.commentBox,
                    { height: 127, paddingHorizontal: 10 },
                  ]}
                >
                  <TextInput
                    placeholder="Write a comment..."
                    style={styles.commentBoxText}
                    multiline={true}
                  />
                </View>
              </View> */}

              <View style={{ marginTop: 5, padding: 35 }}>
                <TouchableOpacity
                  style={AppStyles.styles.buttonPrimary}
                  onPress={handleNext}
                >
                  <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};

export default RecreateAddRatingScreen;

const styles = StyleSheet.create({
  rateRecipeContainer: {
    backgroundColor: "#F8F8F8",
    // paddingTop: "10%",
    paddingHorizontal: "8%",
  },

  rateRecipeheadingBox: {
    alignItems: "center",
    // marginTop: "5%",
  },
  rateRecipeheadingText: {
    fontSize: 19,
    fontStyle: "normal",
    color: "black",
    fontWeight: "bold",
  },

  ratingStarBox: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingVertical: "7%",
  },
  starIconBox: {
    paddingLeft: "5%",
  },

  starMainIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },
  rateRecipeSubText: {
    fontSize: 15,
    color: "#4C4C4C",
    paddingVertical: "4%",
    alignItems: "center",
    textAlign: "center",
  },
  mainForm: {
    alignItems: "center",
    marginTop: "3%",
    paddingVertical: 10,
  },

  commentBox: {
    marginTop: "3%",
    backgroundColor: "white",
    paddingVertical: "3%",
    paddingBottom: "18%",
    width: "100%",
    borderRadius: 14,
  },
  commentBoxText: {
    alignSelf: "flex-start",
    width: "100%",
    height: "150%",
    marginTop: "3%",
  },
  publishMainBtn: {
    alignItems: "center",
    paddingVertical: "3%",
    backgroundColor: "#61BAAC",
    width: "100%",
    borderRadius: 14,
  },
  publishBtnTxt: {
    alignItems: "center",
    color: "white",
    fontSize: 17,
  },

  publishBtnBox: {
    alignItems: "center",
    marginTop: "50%",
  },

  nextBtnBox: {
    width: 10,
    height: 10,
    position: "absolute",
    top: 5,
    marginLeft: 200,
    marginTop: 10,
  },
  nextMainBtn: {
    width: 12,
    height: 12,
  },
});
