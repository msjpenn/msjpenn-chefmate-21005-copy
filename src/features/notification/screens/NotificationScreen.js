import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { notificationService } from "../../../store/notification/services";
import defaultImage from "../../../assets/images/default-image.jpg";
import defaultUser from "../../../assets/images/default-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  doGetNotificationsList,
  turnOffBell,
} from "../../../store/notification/actions";

const RenderNotification = ({ item, navigation }) => {
  const { id, text, user, created_at, is_read, recipe } = item;
  console.log("cli", item);

  const handleDetail = () => {
    console.log("cli", item);

    if (recipe?.id) {
      console.log("navigate");
      let recipeDetail = recipe;
      console.log("recipeDetail", recipeDetail);
      navigation.navigate("RecipeDetailScreenSet", {
        screen: "RecipeDetailScreen",
        params: { recipeData: { recipeDetail } },
      });
    }
  };

  useEffect(() => {
    // console.log("bbf", item);

    if (!is_read) {
      updateIsRead();
    }
  }, []);

  const updateIsRead = async () => {
    try {
      const res = await notificationService.markAsRead({
        id: id,
        is_read: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleDetail}
      style={{
        flexDirection: "row",
        width: wp("83"),
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: is_read ? "#efefef" : "#d5f2ee",
        marginTop: 10,
        borderBottomWidth: 3,
        borderBottomColor: "#efefef",
        paddingBottom: 3,
      }}
    >
      <View style={{ width: wp("20") }}>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
          source={
            user?.users_demo?.image
              ? { uri: user?.users_demo?.image }
              : defaultUser
          }
        />
      </View>
      <View style={{ width: wp("50") }}>
        <Text>{text}</Text>

        <Text>{moment(created_at).format("MMMM DD")}</Text>
      </View>
      <View style={{ width: wp("20") }}>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 7,
          }}
          source={recipe?.picture ? { uri: recipe?.picture } : defaultImage}
        />
      </View>
    </TouchableOpacity>
  );
};

function NotificationScreen({ navigation }) {
  const dispatch = useDispatch();

  const [earlierNotifications, setEarlierNotifications] = useState([]);
  const [todayNotifications, setTodayNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.authReducer.user);
  const notifications = useSelector(
    (state) => state.notificationReducer.notifications
  );

  useEffect(() => {
    dispatch(doGetNotificationsList());

    return () => dispatch(turnOffBell());
  }, []);

  useEffect(() => {
    sortNotifications();
  }, [notifications]);

  const sortNotifications = async () => {
    const nots = notifications;

    const todayNotificationsRes = [];
    const earlierNotificationsRes = [];

    const todaysDate = moment().format("YYYY-MM-DD");

    nots.map((item) => {
      if (todaysDate === moment(item.created_at).format("YYYY-MM-DD")) {
        todayNotificationsRes.push(item);
      } else {
        earlierNotificationsRes.push(item);
      }
    });
    setEarlierNotifications(earlierNotificationsRes);
    setTodayNotifications(todayNotificationsRes);
  };

  const renderItem = ({ item }) => {
    return <RenderNotification item={item} navigation={navigation} />;
  };

  return (
    <View style={{ flex: 1 }}>
      {notifications.length == 0 && (
        <View style={styles.emptyContainer}>
          <Icon name="bell-o" size={hp("20")} backgroundColor="#3b5998" />
          <Text style={styles.nothingHereText}>No new notifications.</Text>
        </View>
      )}

      {todayNotifications.length > 0 && !isLoading && (
        <View style={{ height: 30, alignItems: "center", marginTop: 10 }}>
          <Text
            style={{
              backgroundColor: "#ccc",
              paddingHorizontal: 30,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            Today
          </Text>
        </View>
      )}

      {todayNotifications.length > 0 && !isLoading && (
        <FlatList
          data={todayNotifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<View style={{ marginVertical: 10 }} />}
          ListEmptyComponent={
            <View
              style={{
                flexDirection: "row",
                width: wp("83"),
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#efefef",
                marginTop: 10,
                borderBottomWidth: 3,
                borderBottomColor: "#efefef",
                paddingBottom: 3,
              }}
            >
              <Text>No new notifications today</Text>
            </View>
          }
        />
      )}

      {earlierNotifications.length > 0 && !isLoading && (
        <View style={{ height: 30, alignItems: "center", marginTop: 10 }}>
          <Text
            style={{
              backgroundColor: "#ccc",
              paddingHorizontal: 30,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            Earliar
          </Text>
        </View>
      )}
      {earlierNotifications.length > 0 && !isLoading && (
        <FlatList
          data={earlierNotifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

export default NotificationScreen;
const styles = StyleSheet.create({
  emptyContainer: {
    marginVertical: hp("20"),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  nothingHereText: {
    fontSize: hp("3"),
    paddingVertical: hp("10"),
  },
  notificationContainer: {},
});
