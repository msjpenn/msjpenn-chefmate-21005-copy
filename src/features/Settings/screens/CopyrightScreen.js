import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  View,
  TextInput,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
const CopyrightScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
      <CBHeader title={"Copyright"} navigation={navigation} />

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
        <ScrollView>
          <Text style={{ textAlign: "center" }}>
            {"\n"}
            {"\n"}
            By using ChefMate and our website, you warrant on behalf of
            yourself, any entity who you represent who has entered into these
            Terms of Service, and your users that you will not:
            {"\n"}
            {"\n"}
            modify, copy, prepare derivative works of, decompile, or reverse
            engineer ChefMate or any materials and software contained within
            ChefMate or on our website;
            {"\n"}
            remove any copyright or other proprietary notations from ChefMate or
            any materials and software contained within ChefMate or on our
            website;
            {"\n"}
            transfer ChefMate or any of its associated materials to another
            person or “mirror” the materials on any other server;
            {"\n"}
            knowingly or negligently use ChefMate or any of its associated
            services in a way that abuses or disrupts our networks or any other
            service Corwood Labs, LLC provides;
            {"\n"}
            use ChefMate or its associated services to transmit or publish any
            harassing, indecent, obscene, fraudulent, or unlawful material; use
            ChefMate or its associated services in violation of any applicable
            laws or regulations;{"\n"}
            use ChefMate to send unauthorized advertising or spam;{"\n"}
            harvest, collect, or gather user data without the user’s consent; or
            {"\n"}
            use ChefMate or its associated services in such a way that may
            infringe the privacy, intellectual property rights, or other rights
            of third parties.
            {"\n"}
            {"\n"}
            Intellectual Property
            {"\n"}
            {"\n"}
            The intellectual property in the materials in ChefMate and on our
            website are owned by or licensed to Corwood Labs, LLC. You may
            download ChefMate, to view, use, and display the application on your
            mobile device for your personal use only.
            {"\n"}
            {"\n"}
            This constitutes the grant of a license, not a transfer of title.
            This license shall automatically terminate if you violate any of
            these restrictions or these Terms of Service, and may be terminated
            by Corwood Labs, LLC at any time.
            {"\n"}
            {"\n"}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CopyrightScreen;

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
