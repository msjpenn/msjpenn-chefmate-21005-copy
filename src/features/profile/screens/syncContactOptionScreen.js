import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import Contacts from "react-native-contacts";
import { useDispatch, useSelector } from "react-redux";
import {
  DO_FOLLOWALL,
  DO_FOLLOWUSER,
  DO_FOLLOWALLFB,
  DO_GETUSERSBYPHONENUMBERS,
  DO_UNFOLLOWUSER,
} from "../../../store/profile/constants";
import CBAvatar from "../../../components/Avatar";
import { LOADING } from "../../../store/constants";

const SyncContactOptionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const usersFromContact = useSelector(
    (state) => state.profileReducer.usersFromContact
  );
  const usersFromContactStatus = useSelector(
    (state) => state.profileReducer.usersFromContactStatus
  );
  const usersFromFB = useSelector((state) => state.profileReducer.usersFromFB);
  const [viewMode, setViewMode] = React.useState("Initial");
  const [isFacebookConnected, setIsFacebookConnected] = React.useState(false);
  const user = useSelector((state) => state.authReducer.user);

  const fetchContacts = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Chefmate",
        message: "Would Like to Access Your Contacts",
      }).then(() => {
        loadAndPushContacts();
      });
    } else {
      loadAndPushContacts();
    }
  };

  const followAllContactUsers = () => {
    const allUserIdsFromContact = [];
    usersFromContact.map((contact) => {
      allUserIdsFromContact.push(contact.userId);
    });
    dispatch({
      type: DO_FOLLOWALL,
      userId: user.id,
      allUserIdsToFollow: allUserIdsFromContact,
    });
  };

  const followAllFacebookUsers = () => {
    const allUserIdsFromFB = [];
    usersFromFB.map((contact) => {
      allUserIdsFromFB.push(contact.userId);
    });
    dispatch({
      type: DO_FOLLOWALLFB,
      userId: user.id,
      allUserIdsToFollow: allUserIdsFromFB,
    });
  };

  const followUser = (userId) => {
    dispatch({ type: DO_FOLLOWUSER, userId: user.id, userIdToFollow: userId });
  };

  const unfollowUser = (userId) => {
    //dispatch({type: DO_UNFOLLOWUSER, "userId":user.id, "userIdToUnfollow":userId});
  };

  const loadAndPushContacts = () => {
    let numbersToPush = [];
    Contacts.getAll()
      .then((contacts) => {
        contacts.map((contact) => {
          contact.phoneNumbers.map((phoneNumber) => {
            if (phoneNumber.number) {
              let onlyDigitNumbers = phoneNumber.number.replace(/[^0-9]/g, "");
              if (numbersToPush.indexOf(onlyDigitNumbers) === -1) {
                numbersToPush.push(onlyDigitNumbers);
              }
            }
          });
        });
        if (numbersToPush.length > 0) {
          dispatch({
            type: DO_GETUSERSBYPHONENUMBERS,
            userId: user.id,
            phoneNumbers: numbersToPush,
          });
          setViewMode("ContactTab");
        }
      })
      .catch((e) => {
        console.log("Got error: " + e);
      });

    Contacts.checkPermission().then((permission) => {
      console.log(permission);
      if (permission === "undefined") {
        Contacts.requestPermission().then((permission1) => {
          loadAndPushContacts();
        });
      }
      if (permission === "authorized") {
        loadAndPushContacts();
      }
      if (permission === "denied") {
        Alert.alert(
          "Access Needed",
          "Please allow contact access from Settings."
        );
      }
    });
  };

  fetchFacebookFriends = () => {
    //dispatch(getContactFriends);
    //facebookContacts = FBFriends_DATA;
    setIsFacebookConnected(true);
    setViewMode("FacebookTab");
  };

  renderContactPeopleList = () => {
    return (
      <>
        {usersFromContactStatus.status == LOADING ? (
          <ActivityIndicator
            size="small"
            color={AppStyles.headerBackgroundColor}
          ></ActivityIndicator>
        ) : (
          <View style={styles.followAllChefsbtnBox}>
            <View style={styles.totalContactTxtBox}>
              <Text style={styles.totalContactsTxt}>
                <Text style={{ fontWeight: "bold" }}>
                  {usersFromContact.length}{" "}
                </Text>{" "}
                Contact on <Text style={{ fontWeight: "bold" }}>ChefMate</Text>
              </Text>
            </View>
            {usersFromContact.length > 0 ? (
              <View style={styles.followAllBtnBox}>
                <TouchableOpacity
                  style={styles.followAllmainBtn}
                  onPress={() => followAllContactUsers()}
                >
                  <Text style={styles.followbtnTxt}>Follow All</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}

        <View style={styles.AllChefsOptionsBox}>
          {usersFromContact != null &&
            usersFromContact.map((contact) => {
              return (
                <>
                  <UserItem contact={contact} />
                </>
              );
            })}
        </View>
      </>
    );
  };

  renderFacebookPeopleList = () => {
    return (
      <>
        <View style={[styles.followAllChefsbtnBox]}>
          <View style={styles.totalContactTxtBox}>
            <Text style={styles.totalContactsTxt}>
              <Text style={{ fontWeight: "bold" }}>{usersFromFB.length} </Text>{" "}
              Contact on <Text style={{ fontWeight: "bold" }}>ChefMate</Text>
            </Text>
          </View>
          <View style={styles.followAllBtnBox}>
            <TouchableOpacity
              style={styles.followAllmainBtn}
              onPress={() => followAllFacebookUsers()}
            >
              <Text style={styles.followbtnTxt}>Follow All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.AllChefsOptionsBox}>
          {usersFromFB.map((contact) => {
            return <UserItem contact={contact} />;
          })}
        </View>
      </>
    );
  };

  renderContactAccessConfirmation = () => {
    return (
      <>
        <View style={styles.headingBox}>
          <Text style={AppStyles.styles.content_h1}>
            ChefMate would like to access your contacts
          </Text>
        </View>
        <Text
          style={[AppStyles.styles.content_listdescription, { marginTop: 10 }]}
        >
          Allow access to your contacts so you can find friends on Chef Mate. We
          will sync and store your contact but never share.
        </Text>
        {fetchContacts()}
      </>
    );
  };

  renderFacebookAccessCard = () => {
    return (
      <>
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <TouchableOpacity
            style={styles.loginOptionTouchable}
            onPress={() => {
              fetchFacebookFriends();
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                height: 50,
              }}
            >
              <Image
                source={require("../../../assets/icons/iconFacebook.png")}
                style={{ marginHorizontal: 20 }}
              />
              <View>
                <Text style={AppStyles.styles.content_semi}>
                  Connect to Facebook
                </Text>
                <Text
                  style={[
                    AppStyles.styles.content_semi,
                    { color: AppStyles.COLOR_GRAY_2 },
                  ]}
                >
                  Find your contacts on ChefMate
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  renderContactAccessCard = () => {
    return (
      <>
        <View style={styles.headingBox}>
          <Text style={AppStyles.styles.content_h1}>
            Follow other cooking enthusiasts
          </Text>
        </View>
        <View style={styles.loginOptionBox}>
          <TouchableOpacity
            style={styles.loginOptionTouchable}
            onPress={() => {
              setViewMode("ContactConfirmation"); /*fetchContacts()*/
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                height: 50,
              }}
            >
              <Image
                source={require("../../../assets/icons/iconSyncContacts.png")}
                style={{ marginHorizontal: 20 }}
              />
              <View>
                <Text style={AppStyles.styles.content_semi}>Sync Contacts</Text>
                <Text
                  style={[
                    AppStyles.styles.content_semi,
                    { color: AppStyles.COLOR_GRAY_2 },
                  ]}
                >
                  Find your contacts on chefmate
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  renderContactTabSelected = () => {
    return (
      <>
        <View style={{ flexDirection: "row", marginBottom: 40, marginTop: 10 }}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "black",
              flex: 0.5,
              height: 40,
            }}
          >
            <Text
              style={[
                AppStyles.styles.content_h2_bold,
                { textAlign: "center" },
              ]}
            >
              Contacts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: 2,
              borderBottomColor: AppStyles.COLOR_GRAY_5,
              flex: 0.5,
              height: 40,
            }}
            onPress={() => setViewMode("FacebookTab")}
          >
            <Text
              style={[
                AppStyles.styles.content_h2_bold,
                { textAlign: "center", color: AppStyles.COLOR_GRAY_3 },
              ]}
            >
              Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  renderFacebookTabSelected = () => {
    return (
      <>
        <View style={{ flexDirection: "row", marginBottom: 40, marginTop: 10 }}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 2,
              borderBottomColor: AppStyles.COLOR_GRAY_5,
              flex: 0.5,
              height: 40,
            }}
            onPress={() => setViewMode("ContactTab")}
          >
            <Text
              style={[
                AppStyles.styles.content_h2_bold,
                { textAlign: "center", color: AppStyles.COLOR_GRAY_3 },
              ]}
            >
              Contacts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "black",
              flex: 0.5,
              height: 40,
            }}
          >
            <Text
              style={[
                AppStyles.styles.content_h2_bold,
                { textAlign: "center" },
              ]}
            >
              Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  getNextButtonOnPress = () => {
    /*if(viewMode==="Initial"){
      setViewMode("ContactConfirmation"); 
    } else if(viewMode==="ContactConfirmation"){
      fetchContacts();
    } else {*/
    navigation.navigate("ProfileScreenSet", {
      screen: "AccountCreationGreetingScreen",
    });
    // }
  };

  const UserItem = (contact) => {
    return (
      <>
        <View style={styles.chefPicNameFollowBox}>
          <View>
            <CBAvatar
              size={40}
              imageSource={{ uri: contact.contact.image }}
              label={contact.contact.name}
            ></CBAvatar>
          </View>
          <View style={styles.chefNameTxtBox}>
            <Text style={styles.chefNameTxt}>{contact.contact.name}</Text>
          </View>
          <View style={styles.followBtnBox}>
            {contact.contact.isFollowing ? (
              <View style={styles.followingBtn}>
                <Text style={styles.followingBtnLabel}>Following</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.followAllmainBtn}
                onPress={() => followUser(contact.contact.userId)}
              >
                <Text style={styles.followbtnTxt}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
  };
  const CancelBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }}
      >
        <Text style={{ color: "#fff", marginRight: 10 }}>Cancel</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView
        style={AppStyles.styles.safeAreaDarkHeaderStyle}
      ></SafeAreaView>
      <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
        <CBHeader
          title="Profile Settings"
          navigation={navigation}
          rightComponent={<CancelBtn />}
        />
        <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
          <ScrollView
            style={[styles.loginOptionsContainer]}
            contentContainerStyle={[
              AppStyles.styles.scrollContentContainerOfHeaderScreen,
            ]}
          >
            {viewMode === "Initial" ? renderContactAccessCard() : null}
            {viewMode === "ContactConfirmation"
              ? renderContactAccessConfirmation()
              : null}
            {viewMode === "ContactTab" && isFacebookConnected == false
              ? renderFacebookAccessCard()
              : null}
            {viewMode === "ContactTab" && isFacebookConnected == true
              ? renderContactTabSelected()
              : null}
            {viewMode === "FacebookTab" ? renderFacebookTabSelected() : null}

            {viewMode === "ContactTab" ? renderContactPeopleList() : null}
            {viewMode === "FacebookTab" ? renderFacebookPeopleList() : null}

            <View style={AppStyles.styles.filler}></View>

            <TouchableOpacity
              onPress={() => {
                getNextButtonOnPress();
              }}
              title="Next"
              style={AppStyles.styles.buttonPrimary}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }}></View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  loginOptionBox: {
    marginTop: "8%",
  },
  loginOptionTouchable: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 14,
  },
  followAllChefsbtnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  followAllBtnBox: {
    width: "25%",
    justifyContent: "space-between",
  },
  followBtnBox: {
    justifyContent: "center",
    width: "20%",
  },
  followAllmainBtn: {
    alignItems: "center",
    paddingVertical: "7%",
    backgroundColor: "#61BAAC",
    width: "100%",
    borderRadius: 8,
  },
  followingBtn: {
    alignItems: "center",
    paddingVertical: "7%",
    borderColor: "#61BAAC",
    borderWidth: 1,
    width: "100%",
    borderRadius: 8,
  },
  followingBtnLabel: {
    fontFamily: AppStyles.appFontFamily,
    alignItems: "center",
    fontSize: 12,
    color: "#61BAAC",
  },
  totalContactsTxt: {
    fontFamily: AppStyles.appFontFamily,
    color: "black",
    fontSize: 14,
  },
  chefMainPic: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  chefNameTxtBox: {
    width: "68%",
    justifyContent: "center",
    paddingLeft: "5%",
  },
  chefNameTxt: {
    fontFamily: AppStyles.appFontFamily,
    alignItems: "center",
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  totalContactTxtBox: {
    justifyContent: "center",
  },
  AllChefsOptionsBox: {
    flexDirection: "column",
    width: "100%",
    marginTop: "3%",
  },
  chefPicNameFollowBox: {
    flexDirection: "row",
    marginTop: "8%",
  },
  followbtnTxt: {
    fontFamily: AppStyles.appFontFamily,
    alignItems: "center",
    color: "white",
    fontSize: 12,
  },
  findContactTxt: {
    fontFamily: AppStyles.appFontFamily,
    fontSize: 12,
    color: "#4C4C4C",
  },
});

export default SyncContactOptionScreen;
