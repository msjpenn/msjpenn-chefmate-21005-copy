import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import CBTextInput from "../../../components/TextInput";
import { DO_EDITPHONE } from "../../../store/profile/constants";
import CBActionStatus from "../../../components/ActionStatus";
import { SUCCESS } from "../../../store/constants";
import { isValidPhoneNumber } from "../../../utils/validator";
import { customApiService } from "../../../store/profile/services";
import { DismissKeyboard } from "../../../components/DismissKeyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditPhoneScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const editPhoneStatus = useSelector(
    (state) => state.profileReducer.editPhone.status
  );
  const errorMessage = useSelector(
    (state) => state.profileReducer.editPhone.errorMessage
  );
  const user = useSelector((state) => state.authReducer.user);
  const [phone, setPhone] = React.useState("");
  const [showPhoneError, setShowPhoneError] = React.useState(false);
  const [error, setError] = React.useState(null);

  const performSubmission = () => {
    let isValid = true;
    if (phone == null || phone == "" || !isValidPhoneNumber(phone)) {
      setShowPhoneError(false);
    } else {
      setShowPhoneError(true);
      isValid = false;
    }
    if (isValid) {
      dispatch({ type: DO_EDITPHONE, email: user.email, phone: phone });
    }
  };

  const handleUpdatePhone = async () => {
    if (error) {
      setError(null);
    }
    console.log(isValidPhoneNumber(phone));

    try {
      if (phone) {
        const res = await customApiService.doEditPhone({
          email: user.email,
          phone: phone,
        });
      }
      navigation.navigate("ProfileScreenSet", {
        screen: "EditFoodCategoryScreen",
      });
    } catch (error) {
      // console.log(error.data.detail);
      setShowPhoneError(true);
      if (error?.data?.detail) {
        setError(`${error?.data?.detail}`);
      } else {
        setError("Something went wrong while updating info");
      }
    }
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
          <View
            style={[
              styles.loginOptionsContainer,
              AppStyles.styles.scrollContentContainerOfHeaderScreen,
            ]}
          >
            <KeyboardAwareScrollView>
              <View style={styles.headingBox}>
                <Text style={AppStyles.styles.content_h1}>
                  Phone Number (Optional)
                </Text>
                <Text
                  style={[
                    AppStyles.styles.content_listdescription,
                    { marginTop: 10 },
                  ]}
                >
                  Your phone number would not be displayed anywhere. It will be
                  used so your friends can find you.
                </Text>
              </View>
              <View style={styles.mainForm}>
                <CBTextInput
                  value={phone}
                  label="Phone number"
                  onChangeText={(value) => {
                    setPhone(value);
                  }}
                  showError={showPhoneError}
                  keyboardType="numeric"
                  errorMessage={error}
                ></CBTextInput>
              </View>
            </KeyboardAwareScrollView>

            <View style={AppStyles.styles.filler}></View>
            <TouchableOpacity
              onPress={() => handleUpdatePhone()}
              title="Next"
              style={AppStyles.styles.buttonPrimary}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }}></View>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={AppStyles.styles.safeAreaWhiteFooterStyle}
      ></SafeAreaView>
    </>
  );
};
export default EditPhoneScreen;

const styles = StyleSheet.create({
  headingBox: {
    marginTop: "3%",
    alignItems: "center",
    textAlign: "center",
  },
  mainForm: {
    marginTop: "3%",
    paddingVertical: 10,
  },
  infoMessageBox: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
});
