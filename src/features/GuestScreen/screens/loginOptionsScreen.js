import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import { customApiService } from "../../../store/auth/services";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS } from "../../../store/constants";
import { DO_FBLOGIN, DO_GOOGLELOGIN } from "../../../store/auth/constants";
import FontIcon from "react-native-vector-icons/FontAwesome";
import FEIcon from "react-native-vector-icons/Feather";
import { addCustomerIO } from "../../../store/customerio/actions";
import {
  doAddFCMDeviceAction,
  doAppleLogin,
} from "../../../store/auth/actions";
import { doGetNotificationsList } from "../../../store/notification/actions";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import FIcon from "react-native-vector-icons/FontAwesome";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

const LoginOptionsScreen = ({ navigation }) => {
  const fbLoginStatus = useSelector(
    (state) => state.authReducer?.fbLogin?.status
  );
  const googleLoginStatus = useSelector(
    (state) => state.authReducer?.googleLogin?.status
  );

  const appleLoginStatus = useSelector(
    (state) => state.authReducer?.appleLogin?.status
  );
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);

  const signInWithGoogle = async () => {
    try {
      GoogleSignin.hasPlayServices()
        .then(() => {
          GoogleSignin.signIn()
            .then((User) => {
              console.log(User);

              GoogleSignin.getTokens()
                .then((idToken, accessToken) => {
                  console.log("idToken", idToken, accessToken);
                  dispatch({
                    type: DO_GOOGLELOGIN,
                    token: idToken.accessToken,
                  });
                })
                .catch((er) => {
                  console.log("er : " + er);
                });
            })
            .catch((e) => {
              console.log("e google: " + e);
              // throw e;
            });
        })
        .catch((e2) => {
          console.log("e2: " + e2);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in progress");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
        // play services not available or outdated
      } else {
        // some other error happened
        console.log("last case : " + error);
      }
    }
  };

  const getFacebookInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name,email", //
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log("login info has error: " + error);
        } else {
          // this.setState({userInfo: user});
          console.log("result:", user, token);
          dispatch({ type: DO_FBLOGIN, token: token });
          //customApiService.doFacebookLogin({token}).then((response) => {
          //Alert.alert(
          //    'Response from backend for facebook login',
          //    JSON.stringify(response.data),
          //);
          //});
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions([
      "public_profile",
      "email",
      "user_friends",
    ]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getFacebookInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  };

  async function onAppleButtonPress() {
    if (appleAuth.isSupported) {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        console.log(appleAuthRequestResponse);

        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user
        );

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
          // user is authenticated
          console.log(credentialState);
          const token = appleAuthRequestResponse.identityToken;
          const email = appleAuthRequestResponse.email;
          const givenName = appleAuthRequestResponse.fullName.givenName;
          const familyName = appleAuthRequestResponse.fullName.familyName;
          const userId = appleAuthRequestResponse.user;

          const payload = {
            token: token,
            email: email,
            givenName: givenName,
            familyName: familyName,
            apple_id: userId,
          };
          dispatch(doAppleLogin(payload));
        }
      } catch (e) {
        console.log("ERR:" + e.message);
      }
    } else {
      Alert.alert(
        "Apple Auth Error",
        "AppleAuth is not supported on the device. Currently Apple Authentication works on iOS devices running iOS 13 or later."
      );
    }
  }

  const updateDeviceDetails = () => {
    //add customer to CustomerIO
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name || "",
      plan: "premium",
    };
    dispatch(addCustomerIO(payload));

    const payloadDevice = {
      user: user.id,
    };

    dispatch(doAddFCMDeviceAction(payloadDevice));
  };

  React.useEffect(() => {
    if (
      fbLoginStatus == SUCCESS ||
      googleLoginStatus == SUCCESS ||
      appleLoginStatus === SUCCESS
    ) {
      if (token != null) {
        if (user?.id) {
          updateDeviceDetails();
          dispatch(doGetNotificationsList());
        }
        navigation.navigate("Home");
      }
    }
  }, [fbLoginStatus, googleLoginStatus, appleLoginStatus]);

  React.useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <>
      <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
      <ScrollView
        style={[styles.loginOptionsContainer, AppStyles.styles.container]}
      >
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <FEIcon name="chevron-left" size={24} />
          <Text>Back</Text>
        </TouchableOpacity>
        <View style={styles.logoAndNameContainer}>
          <Image source={require("../../../assets/images/chefmate-logo.png")} />
        </View>
        <View style={styles.headingBox}>
          <Text style={AppStyles.styles.content_h1_bold}>Welcome!</Text>
          <Text style={[AppStyles.styles.content_regular, { marginTop: 10 }]}>
            Please continue using one of the options listed.
          </Text>
        </View>

        <View style={styles.loginOptionBox}>
          <TouchableOpacity
            style={styles.loginOptionTouchableApple}
            onPress={() => onAppleButtonPress()}
          >
            <View style={{ paddingHorizontal: "5%" }}>
              <FIcon name="apple" size={26} color="#fff" />
            </View>
            <Text
              style={[
                styles.loginOptionText,
                AppStyles.styles.content_semi,
                { color: "#fff" },
              ]}
            >
              Sign in with Apple
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginOptionBox}>
          <TouchableOpacity
            style={styles.loginOptionTouchableGoogle}
            onPress={() => signInWithGoogle()}
          >
            <View style={{ paddingHorizontal: "5%" }}>
              <FIcon name="google" size={26} color="#fff" />
            </View>
            <Text
              style={[
                styles.loginOptionText,
                AppStyles.styles.content_semi,
                { color: "#fff" },
              ]}
            >
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.loginOptionBox}>
          <TouchableOpacity
            style={styles.loginOptionTouchable}
            onPress={() => loginWithFacebook()}
          >
            <View style={{ paddingHorizontal: "5%" }}>
              <Image
                source={require("../../../assets/icons/iconFacebook.png")}
                style={styles.loginOptionIcon}
              />
            </View>
            <Text
              style={[styles.loginOptionText, AppStyles.styles.content_semi]}
            >
              Sign in with Facebook
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.loginOptionBox}>
          <TouchableOpacity
            style={styles.loginOptionTouchable}
            onPress={() => {
              navigation.navigate("EmailLoginScreen");
            }}
          >
            <View style={{ paddingHorizontal: "5%" }}>
              <MCIcon name="email" size={26} color="#000" />
            </View>
            <Text
              style={[styles.loginOptionText, AppStyles.styles.content_semi]}
            >
              Sign in with Email
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.noAccountWrapper]}>
          <Text style={styles.noAccountText}>No Account?</Text>
        </View>

        <View style={styles.loginOptionBox}>
          <TouchableOpacity
            style={AppStyles.styles.buttonSecondary}
            onPress={() => {
              navigation.navigate("EmailRegistrationScreen");
            }}
          >
            <Text style={AppStyles.styles.buttonSecondaryText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </>
  );
};

export default LoginOptionsScreen;

const styles = StyleSheet.create({
  loginOptionsContainer: {
    paddingTop: hp(2),
    paddingHorizontal: "8%",
  },
  logoAndNameContainer: {
    alignItems: "center",
    paddingVertical: "2%",
  },
  headingBox: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  loginOptionBox: {
    alignItems: "center",
    marginTop: 20,
    height: 50,
  },
  loginOptionTouchable: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  loginOptionTouchableApple: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#000",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
  },

  loginOptionTouchableGoogle: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#DB4437",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  loginOptionIcon: {
    height: 27,
    width: 27,
  },
  loginOptionText: {
    alignItems: "center",
    color: "black",
    fontSize: 20,
    fontFamily: AppStyles.FONT_FAMILY,
  },
  noAccountWrapper: {
    marginTop: 35,
    alignItems: "center",
  },
  noAccountText: {
    fontSize: 15,
    color: "#4C4C4C",
    fontFamily: AppStyles.FONT_FAMILY,
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
});
