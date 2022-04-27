import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as AppStyles from "./src/components/appStyles";
import { store, persistor } from "./src/store";
import { setupHttpConfig, setUpHttpMultipartConfig } from "./src/utils/http";
import FeedScreenSet from "./src/features/feed/feedScreenSet";
import AppScreenSet from "./src/features/appScreenSet";
import Freshpaint from "@freshpaint/freshpaint-react-native";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import appsFlyer from "react-native-appsflyer";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-community/async-storage";
import { Provider as RNProvider } from "react-native-paper";
import { doGetNotificationsList } from "./src/store/notification/actions";
// import PushNotification from "react-native-push-notification";

const App = () => {
  Freshpaint.init("4add7ca6-9cb6-4309-8d40-e07141e768c1");
  const FreshpaintNavigationContainer = Freshpaint.withReactNavigationAutotrack(
    NavigationContainer
  );

  appsFlyer.initSdk(
    {
      devKey: "vWWxsjxr4chPpi5hiesAk3",
      isDebug: false,
      appId: "1555040448",
      onInstallConversionDataListener: true, //Optional
      onDeepLinkListener: true, //Optional
      timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
    },
    (result) => {
      console.log(result);
    },
    (error) => {
      console.error(error);
    }
  );

  const [loading, setLoading] = React.useState(false);

  // const dispatch = useDispatch();

  React.useEffect(() => {
    loadAssets();
    setupHttpConfig();
    setUpHttpMultipartConfig();
  }, []);

  const loadAssets = async () => {
    // add any loading assets here
    setLoading(false);
  };

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      store.dispatch(doGetNotificationsList());
      console.log("remoteMessage", remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        store.dispatch(doGetNotificationsList());
        console.log("remoteMessage", remoteMessage);
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      store.dispatch(doGetNotificationsList());

      let title = remoteMessage.notification?.title;
      let body = remoteMessage.notification?.body;
      // PushNotification.localNotification({
      //   title: title,
      //   message: body,
      // });
      console.log("remoteMessage", remoteMessage);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      getFcmToken();
    }
  }

  async function getFcmToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("fcmToken", fcmToken);
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } catch (error) {
      console.log("fcmToken error", error);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}>
        <View style={[styles.flex]}>
          <Text>Loading</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <Provider store={store}>
      <RNProvider>
        <PersistGate loading={null} persistor={persistor}>
          <FreshpaintNavigationContainer>
            <AppScreenSet />
          </FreshpaintNavigationContainer>
        </PersistGate>
      </RNProvider>
    </Provider>
  );
};
export default App;
