import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as AppStyles from "../../../components/appStyles";
import CBHeader from "../../../components/Header";
import styled from "styled-components/native";
const TermConditionScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
      <CBHeader title={"Chefmate Terms & Conditions"} navigation={navigation} />

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
            Mobile App Terms of Service {"\n"}
            {"\n"}
            {"\n"}These Terms of Service govern your use of ChefMate, our
            website located at https://mychefmate.app, and any related services
            provided by Corwood Labs, LLC.
            {"\n"} When you create an ChefMate account or use ChefMate, you
            agree to abide by these Terms of Service and to comply with all
            applicable laws and regulations. If you do not agree with these
            Terms of Service, you are prohibited from further using the app,
            accessing our website, or using any other services provided by
            Corwood Labs, LLC.
            {"\n"}If you access or download ChefMate from (1) the Apple App
            Store, you agree to any Usage Rules set forth in the App Store Terms
            of Service; and/or (2) the Google Play Store, you agree to the
            Android, Google Inc. Terms and Conditions including the Google Apps
            Terms of Service.{"\n"} We, Corwood Labs, LLC, reserve the right to
            review and amend any of these Terms of Service at our sole
            discretion. Upon doing so, we will update this page and notify you
            through the app and/or the email address you provided when you
            created your account. Any changes to these Terms of Service will
            take effect immediately from the date of publication.{"\n"} These
            Terms of Service were last updated on 30 March 2021. {"\n"}
            {"\n"}Limitations of Use{"\n"}
            {"\n"} By using ChefMate and our website, you warrant on behalf of
            yourself, any entity who you represent who has entered into these
            Terms of Service, and your users that you will not: modify, copy,
            prepare derivative works of, decompile, or reverse engineer ChefMate
            or any materials and software contained within ChefMate or on our
            website; remove any copyright or other proprietary notations from
            ChefMate or any materials and software contained within ChefMate or
            on our website; transfer ChefMate or any of its associated materials
            to another person or “mirror” the materials on any other server;
            knowingly or negligently use ChefMate or any of its associated
            services in a way that abuses or disrupts our networks or any other
            service Corwood Labs, LLC provides; use ChefMate or its associated
            services to transmit or publish any harassing, indecent, obscene,
            fraudulent, or unlawful material; use ChefMate or its associated
            services in violation of any applicable laws or regulations; use
            ChefMate to send unauthorized advertising or spam; harvest, collect,
            or gather user data without the user’s consent; or use ChefMate or
            its associated services in such a way that may infringe the privacy,
            intellectual property rights, or other rights of third parties.
            {"\n"}
            {"\n"}
            Intellectual Property{"\n"}
            {"\n"} The intellectual property in the materials in ChefMate and on
            our website are owned by or licensed to Corwood Labs, LLC. You may
            download ChefMate, to view, use, and display the application on your
            mobile device for your personal use only. This constitutes the grant
            of a license, not a transfer of title. This license shall
            automatically terminate if you violate any of these restrictions or
            these Terms of Service, and may be terminated by Corwood Labs, LLC
            at any time. User-Generated Content You retain your intellectual
            property ownership rights over content you submit to us for
            publication within ChefMate and/or on its corresponding website. We
            will never claim ownership of your content, but we do require a
            license from you in order to use it. When you use ChefMate or its
            associated services to post, upload, share, or otherwise transmit
            content covered by intellectual property rights, you grant to us a
            non-exclusive, royalty-free, transferable, sub-licensable, worldwide
            license to use, distribute, modify, run, copy, publicly display,
            translate, or otherwise create derivative works of your content in a
            manner that is consistent with your privacy preferences and our
            Privacy Policy. The license you grant us can be terminated at any
            time by deleting your content or account. However, to the extent
            that we (or our partners) have used your content in connection with
            commercial or sponsored content, the license will continue until the
            relevant commercial or post has been discontinued by us. You give us
            permission to use your username and other identifying information
            associated with your account in a manner that is consistent with
            your privacy preferences, and our Privacy Policy. Automatic Updates
            You give us permission to download and install updates to ChefMate
            on your device in accordance with your privacy preferences. This
            permission can be revoked at any time by deleting ChefMate from your
            device.{"\n"}
            {"\n"} Liability {"\n"}
            {"\n"}ChefMate and the materials in ChefMate and on our website are
            provided on an 'as is' basis. To the extent permitted by law,
            Corwood Labs, LLC makes no warranties, expressed or implied, and
            hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property, or other violation of rights. In no event
            shall Corwood Labs, LLC or its suppliers be liable for any
            consequential loss suffered or incurred by you or any third party
            arising from the use or inability to use ChefMate, our website, or
            any other services provided by Corwood Labs, LLC or the materials in
            ChefMate, even if Corwood Labs, LLC or an authorized representative
            has been notified, orally or in writing, of the possibility of such
            damage. In the context of this agreement, “consequential loss”
            includes any consequential loss, indirect loss, real or anticipated
            loss of profit, loss of benefit, loss of revenue, loss of business,
            loss of goodwill, loss of opportunity, loss of savings, loss of
            reputation, loss of use and/or loss or corruption of data, whether
            under statute, contract, equity, tort (including negligence),
            indemnity, or otherwise. Because some jurisdictions do not allow
            limitations on implied warranties, or limitations of liability for
            consequential or incidental damages, these limitations may not apply
            to you. {"\n"}
            {"\n"}Accuracy of Materials{"\n"}
            {"\n"} The materials appearing in ChefMate or on our website are not
            comprehensive and are for general information purposes only. To the
            extent permitted by law, Corwood Labs, LLC does not warrant or make
            any representations concerning the accuracy, likely results, or
            reliability of the use of the materials in ChefMate or on our
            website, or otherwise relating to such materials or on any resources
            linked to ChefMate and our website. {"\n"}
            {"\n"}Links {"\n"}
            {"\n"}Corwood Labs, LLC has not reviewed all of the sites linked to
            ChefMate or on its corresponding website and is not responsible for
            the contents of any such linked site. The inclusion of any link does
            not imply endorsement, approval, or control by Corwood Labs, LLC of
            the site. Use of any such linked website is at your own risk and we
            strongly advise you make your own investigations with respect to the
            suitability of those sites.{"\n"}
            {"\n"} Notice regarding Apple{"\n"}
            {"\n"} To the extent that you are using or accessing ChefMate on an
            iOS device, you acknowledge and agree to the terms of this clause.
            You acknowledge that these Terms of Service are between you and
            Corwood Labs, LLC only, not with Apple Inc. (Apple), and Apple is
            not responsible for ChefMate and any materials available in
            ChefMate. Apple has no obligation to furnish you with any
            maintenance and support services with respect to ChefMate. If
            ChefMate fails to conform to any applicable warranty, you may notify
            Apple and Apple will refund the purchase price of the mobile
            application to you. To the maximum extent permitted by applicable
            law, Apple will have no other warranty obligation whatsoever with
            respect to ChefMate and any other claims, losses, liabilities,
            damages, costs, or expenses attributable to any failure to conform
            to any warranty will be our responsibility. Apple is not responsible
            for addressing any claims by you or any third party relating to
            ChefMate or your use of ChefMate, including but not limited to (1)
            product liability claims; (2) any claim that our mobile application
            fails to conform to any applicable legal or regulatory requirement;
            and (3) claims arising under consumer protection or similar
            legislation. Apple is not responsible for the investigation,
            defence, settlement, and discharge of any third-party claim that our
            mobile application infringes that third party’s intellectual
            property rights. You agree to comply with any applicable third-party
            terms when using ChefMate, including any Usage Rules set forth in
            the Apple App Store Agreement of Service. Apple and Apple’s
            subsidiaries are third-party beneficiaries of these Terms of
            Service, and upon your acceptance of these Terms of Service, Apple
            will have the right (and will be deemed to have accepted the right)
            to enforce these Terms of Service against you as a third-party
            beneficiary of these Terms of Service. You hereby represent and
            warrant that (1) you are not located in a country that is subject to
            a U.S. Government embargo, or that has been designated by the U.S.
            Government as a "terrorist supporting" country; and (2) you are not
            listed on any U.S. Government list of prohibited or restricted
            parties. {"\n"}
            {"\n"}Right to Terminate{"\n"}
            {"\n"} We may suspend or terminate your ChefMate account and right
            to use ChefMate and these Terms of Service immediately upon written
            notice to you for any breach of these Terms of Service. {"\n"}
            {"\n"}Severance{"\n"}
            {"\n"}
            Any term of these Terms of Service which is wholly or partially void
            or unenforceable is severed to the extent that it is void or
            unenforceable. The validity of the remainder of these Terms of
            Service is not affected. Governing Law These Terms of Service are
            governed by and construed in accordance with the laws of United
            States. You irrevocably submit to the exclusive jurisdiction of the
            courts in that State or location.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TermConditionScreen;

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
