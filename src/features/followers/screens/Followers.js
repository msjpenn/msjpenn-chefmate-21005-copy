import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View, Alert } from "react-native";
import FollowerListItem from "../../../components/followerListItem/FollowerListItem";
import { followerService } from "../../../store/followers/services";
import * as AppStyles from "../../../components/appStyles";
import { useFocusEffect } from "@react-navigation/native";

const Followers = ({ navigation, route }) => {
  const userId = route?.params?.params;
  const [followerListData, setFollowerListData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getFollowerList();
    }, [])
  );

  const getFollowerList = async () => {
    setLoading(true);
    try {
      let result = await followerService.getFollowerList(userId);
      console.log("result=>", result);
      setFollowerListData(result?.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error);
    }
  };

  const renderItem = (data) => {
    console.log(data);
    return (
      <FollowerListItem
        data={data.item}
        navigation={navigation}
        getFollowerList={getFollowerList}
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

export default Followers;
