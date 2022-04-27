import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  TextInput,
  Text,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
import { doFeedback } from "../../../store/profile/services";
import { DismissKeyboard } from "../../../components/DismissKeyboard";
const FeedbackScreen = ({ navigation, route }) => {
  let [feedback, setFeedBack] = useState("");
  return (
    <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
      <CBHeader title={"Send FeedBack"} navigation={navigation} />

      <View
        style={[
          AppStyles.styles.scrollHolderForHeaderScreen,
          {
            flex: 1,
            marginTop: 10,
            paddingTop: 15,
            paddingHorizontal: 10,
            alignItems: "center",
          },
        ]}
      >
        <SText>
          Your opinion matters to us. Please tell us what is your experiance
          with our app.
        </SText>
        <DismissKeyboard>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={{
                width: wp("90%"),
                height: hp("30%"),
                backgroundColor: "#fff",
                borderRadius: 14,
                textAlignVertical: "top",
                paddingVertical: 15,
                paddingHorizontal: 10,
              }}
              multiline
              onChangeText={(val) => {
                setFeedBack(val);
              }}
              value={feedback}
            />
            <TouchableOpacity
              style={{
                width: wp("60%"),
                height: 50,
                borderRadius: 14,
                backgroundColor: "#61BAAC",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                alignSelf: "center",
              }}
              onPress={() => {
                doFeedback({
                  body: feedback,
                  user: route.params.userId,
                })
                  .then((data) => {
                    console.log(data, "this is data");
                    alert("Thank you for your feedback");
                    setFeedBack("");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Send</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </DismissKeyboard>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackScreen;

const SText = styled.Text`
  /* Content P SEMI */

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  /* Gray - 1 */

  color: #4c4c4c;
`;
