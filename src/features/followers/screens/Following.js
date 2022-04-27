import React, { useState, useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { followerService } from "../../../store/followers/services";
import * as AppStyles from "../../../components/appStyles";
import { useFocusEffect } from "@react-navigation/native";
import FollowingListItem from "../../../components/followingListItem/FollowingListItem";

const Following = ({ navigation, route }) => {
  const userId = route?.params?.params;

  const [followerListData, setFollowerListData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getFollowingList();
    }, [])
  );

  const getFollowingList = async () => {
    setLoading(true);
    try {
      let result = await followerService.getFollowingList(userId);
      console.log("result=>", result);
      setFollowerListData(result?.results);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const renderItem = (data) => {
    console.log(data);
    return (
      <FollowingListItem
        isFollowing={true}
        data={data.item}
        navigation={navigation}
        getFollowingList={getFollowingList}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={followerListData}
        extraData={followerListData}
        renderItem={renderItem}
      />
      {isLoading && (
        <View style={AppStyles.styles.activityIndicatorContainer}>
          <ActivityIndicator
            size={"large"}
            color={AppStyles.headerBackgroundColor}
          />
        </View>
      )}
    </View>
  );
};

export default Following;
