import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-simple-toast";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as AppStyles from "../../../components/appStyles";
import { customApiService } from "../../../store/recipe/services";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CBRecipeItem from "../../../components/RecipeItem/index";
import * as recipeUtil from "../../../utils/recipeUtil";
import { useFocusEffect } from "@react-navigation/native";

const MyFeeds = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [recipesList, setRecipesList] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const [page, setPage] = useState(1);

  const user = useSelector((state) => state.authReducer.user);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getRecipeFeed();
    }, [page])
  );

  const prepareInputParams = () => {
    console.log("Preparing query for user: " + JSON.stringify(user));
    if (user != null) {
      return { userId: user.id, page: page };
    } else {
      return { page: page };
    }
  };

  const getRecipeFeed = async () => {
    try {
      const recipeFeed = await customApiService.doGetOwnRecipeFeed(
        prepareInputParams()
      );

      recipeFeed.next ? setIsNext(true) : setIsNext(false);

      const updatedRecipesList = recipeUtil.prepareRecipeList(
        recipeFeed.results
      );

      let data =
        page === 1
          ? updatedRecipesList
          : [...recipesList, ...updatedRecipesList];

      setRecipesList(data);
    } catch (e) {
      console.log(e);
      console.log("feed err", e?.data?.detail);
      if (e?.data?.detail === "Invalid page.") {
        Toast.show("All caught up", Toast.LONG);
      } else {
        Toast.show("Unable to load feed", Toast.LONG);
      }
    }
    setIsLoading(false);
    setRefreshing(false);
  };

  const renderRecipeItem = (props, detailAction) => {
    return <CBRecipeItem recipeDetail={props.item} />;
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          height: hp(50),
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No more recipes </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            isNext ? setPage(page + 1) : Toast.show("All caught up", Toast.LONG)
          }
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More</Text>
          {isLoadingMore ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.followChefsContainer1}>
        {!isLoading && (
          <FlatList
            data={recipesList}
            renderItem={(item) =>
              renderRecipeItem(item, () => {
                navigation.navigate("RecipeDetailScreen");
              })
            }
            keyExtractor={(item) => item.recipeId.toString()}
            refreshing={refreshing}
            onRefresh={() => {
              getRecipeFeed();
              setRefreshing(true);
            }}
            onEndReached={() => {
              isNext
                ? setPage(page + 1)
                : Toast.show("All caught up", Toast.LONG);
            }}
            ListFooterComponent={
              recipesList.length > 0 ? renderFooter : <View />
            }
            ListEmptyComponent={renderEmpty}
          />
        )}
        {isLoading && (
          <View style={AppStyles.styles.activityIndicatorContainer}>
            <ActivityIndicator
              size={"large"}
              color={AppStyles.headerBackgroundColor}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default MyFeeds;

const styles = StyleSheet.create({
  followChefsContainer1: {
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#61BAAC",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
