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
const PrivacyPolicyScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
      <CBHeader title={"Chefmate Privacy Policy"} navigation={navigation} />

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
            Privacy Policy
            {"\n"} {"\n"} {"\n"}
            Your privacy is important to us. It is Corwood Labs, LLC's policy to
            respect your privacy and comply with any applicable law and
            regulation regarding any personal information we may collect about
            you, including via our app, ChefMate, and its associated services.
            {"\n"} {"\n"}
            Personal information is any information about you which can be used
            to identify you. This includes information about you as a person
            (such as name, address, and date of birth), your devices, payment
            details, and even information about how you use an app or online
            service.
            {"\n"} {"\n"}
            In the event our app contains links to third-party sites and
            services, please be aware that those sites and services have their
            own privacy policies. After following a link to any third-party
            content, you should read their posted privacy policy information
            about how they collect and use personal information. This Privacy
            Policy does not apply to any of your activities after you leave our
            app.
            {"\n"} {"\n"}
            This policy is effective as of 30 March 2021.
            {"\n"} {"\n"}
            Last updated: 30 March 2021
            {"\n"} {"\n"}
            Information We Collect
            {"\n"} {"\n"}
            Information we collect falls into one of two categories:
            “voluntarily provided” information and “automatically collected”
            information.
            {"\n"} {"\n"} {"\n"}
            “Voluntarily provided” information refers to any information you
            knowingly and actively provide us when using our app and its
            associated services.
            {"\n"} {"\n"} {"\n"}
            “Automatically collected” information refers to any information
            automatically sent by your device in the course of accessing our app
            and its associated services.
            {"\n"} {"\n"}
            Log Data
            {"\n"} {"\n"}
            When you access our servers via our app, we may automatically log
            the standard data provided by your device. It may include your
            device's Internet Protocol (IP) address, your device type and
            version, your activity within the app, time and date, and other
            details about your usage.
            {"\n"} {"\n"}
            Additionally, when you encounter certain errors while using the app,
            we automatically collect data about the error and the circumstances
            surrounding its occurrence. This data may include technical details
            about your device, what you were trying to do when the error
            happened, and other technical information relating to the problem.
            You may or may not receive notice of such errors, even in the moment
            they occur, that they have occurred, or what the nature of the error
            is.
            {"\n"} {"\n"}
            Please be aware that while this information may not be personally
            identifying by itself, it may be possible to combine it with other
            data to personally identify individual persons.
            {"\n"} {"\n"}
            Device Data
            {"\n"} {"\n"}
            Our app may access and collect data via your device's in-built
            tools, such as:
            {"\n"} {"\n"} {"\n"}
            Your identity {"\n"}
            Location data {"\n"}
            Camera {"\n"}
            Microphone {"\n"}
            Accelerometer {"\n"}
            Calendar {"\n"}
            Contacts {"\n"}
            Phone/SMS {"\n"}
            Storage, photos and/or media {"\n"}
            Notifications {"\n"}
            Voice assistance {"\n"}
            Background data refresh {"\n"}
            Mobile data {"\n"}
            Device/app history {"\n"}
            Flashlight {"\n"}
            Bluetooth {"\n"}
            {"\n"} {"\n"}
            When you install the app or use your device’s tools within the app,
            we request permission to access this information. The specific data
            we collect can depend on the individual settings of your device and
            the permissions you grant when you install and use the app.
            {"\n"} {"\n"} {"\n"}
            Personal Information
            {"\n"} {"\n"}
            We may ask for personal information — for example, when you submit
            content to us or when you contact us — which may include one or more
            of the following:
            {"\n"} {"\n"} {"\n"}
            Name {"\n"}
            Email {"\n"}
            Social media profiles {"\n"}
            Date of birth {"\n"}
            Phone/mobile number {"\n"}
            Home/mailing address {"\n"}
            {"\n"}
            Sensitive Information
            {"\n"}
            “Sensitive information” or “special categories of data” is a subset
            of personal information that is given a higher level of protection.
            Examples of sensitive information include information relating to
            your racial or ethnic origin, political opinions, religion, trade
            union or other professional associations or memberships,
            philosophical beliefs, sexual orientation, sexual practices or sex
            life, criminal records, health information, or biometric
            information.
            {"\n"} {"\n"}
            The types of sensitive information that we may collect about you
            include:
            {"\n"} {"\n"} {"\n"}
            Health information
            {"\n"} {"\n"}
            We will not collect sensitive information about you without first
            obtaining your consent, and we will only use or disclose your
            sensitive information as permitted, required, or authorized by law.
            {"\n"} {"\n"}
            User-Generated Content
            {"\n"} {"\n"}
            We consider “user-generated content” to be materials (text, image
            and/or video content) voluntarily supplied to us by our users for
            the purpose of publication on our platform, website or re-publishing
            on our social media channels. All user-generated content is
            associated with the account or email address used to submit the
            materials.
            {"\n"} {"\n"} {"\n"}
            Please be aware that any content you submit for the purpose of
            publication will be public after posting (and subsequent review or
            vetting process). Once published, it may be accessible to third
            parties not covered under this privacy policy.
            {"\n"} {"\n"}
            Legitimate Reasons for Processing Your Personal Information
            {"\n"} {"\n"}
            We only collect and use your personal information when we have a
            legitimate reason for doing so. In which instance, we only collect
            personal information that is reasonably necessary to provide our
            services to you.
            {"\n"} {"\n"}
            Collection and Use of Information {"\n"} {"\n"}
            We may collect personal information from you when you do any of the
            following on our website:
            {"\n"} {"\n"}
            Register for an account {"\n"}
            Enter any of our competitions, contests, sweepstakes, and surveys{" "}
            {"\n"}
            Sign up to receive updates from us via email or social media
            channels {"\n"}
            Use a mobile device or web browser to access our content {"\n"}
            Contact us via email, social media, or on any similar technologies{" "}
            {"\n"}
            When you mention us on social media {"\n"}
            {"\n"} {"\n"}
            We may collect, hold, use, and disclose information for the
            following purposes, and personal information will not be further
            processed in a manner that is incompatible with these purposes:
            {"\n"} {"\n"}
            to provide you with our app and platform's core features and
            services {"\n"}
            to enable you to customize or personalize your experience of our
            website {"\n"}
            {"\n"} {"\n"}
            to contact and communicate with you {"\n"}
            for analytics, market research, and business development, including
            to operate and improve our app, associated applications, and
            associated social media platforms for advertising and marketing,
            including to send you promotional information about our products and
            services and information about third parties that we consider may be
            of interest to you to consider your employment application {"\n"}
            to enable you to access and use our app, associated platforms, and
            associated social media channels {"\n"}
            for internal record keeping and administrative purposes {"\n"}
            to run competitions, sweepstakes, and/or offer additional benefits
            to you {"\n"}
            to comply with our legal obligations and resolve any disputes that
            we may have {"\n"}
            to attribute any content (e.g. posts and comments) you submit that
            we publish on our website {"\n"}
            for security and fraud prevention, and to ensure that our sites and
            apps are safe, secure, and used in line with our terms of use {"\n"}
            for technical assessment, including to operate and improve our app,
            associated applications, and associated social media platforms{" "}
            {"\n"}
            {"\n"} {"\n"}
            We may combine voluntarily provided and automatically collected
            personal information with general information or research data we
            receive from other trusted sources. For example, If you consent to
            us accessing your social media profiles, we may combine information
            sourced from those profiles with information received from you
            directly to provide you with an enhanced experience of our app and
            services.
            {"\n"} {"\n"}
            Security of Your Personal Information
            {"\n"} {"\n"}
            When we collect and process personal information, and while we
            retain this information, we will protect it within commercially
            acceptable means to prevent loss and theft, as well as unauthorized
            access, disclosure, copying, use, or modification.
            {"\n"} {"\n"} {"\n"}
            Although we will do our best to protect the personal information you
            provide to us, we advise that no method of electronic transmission
            or storage is 100% secure, and no one can guarantee absolute data
            security.
            {"\n"} {"\n"}
            You are responsible for selecting any password and its overall
            security strength, ensuring the security of your own information
            within the bounds of our services. For example, ensuring any
            passwords associated with accessing your personal information and
            accounts are secure and confidential.
            {"\n"} {"\n"}
            How Long We Keep Your Personal Information
            {"\n"} {"\n"}
            We keep your personal information only for as long as we need to.
            This time period may depend on what we are using your information
            for, in accordance with this privacy policy. For example, if you
            have provided us with personal information as part of creating an
            account with us, we may retain this information for the duration
            your account exists on our system. If your personal information is
            no longer required for this purpose, we will delete it or make it
            anonymous by removing all details that identify you.
            {"\n"} {"\n"} {"\n"}
            However, if necessary, we may retain your personal information for
            our compliance with a legal, accounting, or reporting obligation or
            for archiving purposes in the public interest, scientific, or
            historical research purposes or statistical purposes.
            {"\n"} {"\n"}
            Children’s Privacy
            {"\n"} {"\n"}
            We do not aim any of our products or services directly at children
            under the age of 13, and we do not knowingly collect personal
            information about children under 13.
            {"\n"} {"\n"}
            Disclosure of Personal Information to Third Parties
            {"\n"} {"\n"}
            We may disclose personal information to:
            {"\n"} {"\n"}a parent, subsidiary, or affiliate of our company
            third-party service providers for the purpose of enabling them to
            provide their services, including (without limitation) IT service
            providers, data storage, hosting and server providers, ad networks,
            analytics, error loggers, debt collectors, maintenance or
            problem-solving providers, marketing or advertising providers,
            professional advisors, and payment systems operators our employees,
            contractors, and/or related entities our existing or potential
            agents or business partners sponsors or promoters of any
            competition, sweepstakes, or promotion we run credit reporting
            agencies, courts, tribunals, and regulatory authorities, in the
            event you fail to pay for goods or services we have provided to you
            courts, tribunals, regulatory authorities, and law enforcement
            officers, as required by law, in connection with any actual or
            prospective legal proceedings, or in order to establish, exercise,
            or defend our legal rights third parties, including agents or
            sub-contractors, who assist us in providing information, products,
            services, or direct marketing to you third parties to collect and
            process data an entity that buys, or to which we transfer all or
            substantially all of our assets and business
            {"\n"} {"\n"}
            Third parties we currently use include:
            {"\n"}
            Appsflyer {"\n"}
            Userexperior {"\n"}
            Amplitude {"\n"}
            Freshpaint {"\n"}
            Customer.io {"\n"} {"\n"}
            Your Rights and Controlling Your Personal Information
            {"\n"} {"\n"}
            Your choice: By providing personal information to us, you understand
            we will collect, hold, use, and disclose your personal information
            in accordance with this privacy policy. You do not have to provide
            personal information to us, however, if you do not, it may affect
            your use of our app or the products and/or services offered on or
            through it.
            {"\n"} {"\n"}
            Information from third parties: If we receive personal information
            about you from a third party, we will protect it as set out in this
            privacy policy. If you are a third party providing personal
            information about somebody else, you represent and warrant that you
            have such person’s consent to provide the personal information to
            us.
            {"\n"} {"\n"}
            Contact Us
            {"\n"} {"\n"}
            For any questions or concerns regarding your privacy, you may
            contact us using the following details:
            {"\n"} {"\n"}
            ChefMate Privacy Support support@mychefmate.app
            {"\n"} {"\n"} {"\n"}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

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
