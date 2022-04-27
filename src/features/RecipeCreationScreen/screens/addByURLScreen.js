import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { useDispatch, useSelector } from "react-redux";
import * as AppStyles from "../../../components/appStyles";
import CBTextInput from "../../../components/TextInput";
import {
  doAddDesc,
  doAddTitle,
  doAddUrl,
} from "./../../../store/recipeCreation/actions";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const app = ({ navigation }) => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeCreationReducer);
  const urlState = useSelector((state) => state.recipeCreationReducer.url);

  const [showURLError, setShowURLError] = useState(false);
  const [URL, setURL] = useState(urlState?.url ? urlState?.url : null);
  const [linkText, setLinkText] = useState("Paste Link");
  const [disabled, setDisabled] = useState(false);
  const [favicon, setFavicon] = useState(null);
  const [URLTitle, setURLTitle] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handlePasteEvent = async () => {
    if (linkText == "Remove Link") {
      setLinkText("Paste Link");
      setURL(null);
      setDisabled(true);
    } else {
      try {
        const text = await Clipboard.getString();
        if (text.length != 0) {
          setURL(text);
          setLinkText("Remove Link");
          setDisabled(false);

          getLinkPreview(text)
            .then((data) => {
              setFavicon(data.favicons[0]);
              setURLTitle(data.title);
            })
            .catch((err) => {
              setShowURLError(true);
              setDisabled(true);
            });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const _validateURL = (text) => {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(text);
  };

  const handleSubmit = () => {
    if (_validateURL(URL)) {
      setDisabled(true);
      setLoading(true);

      getLinkPreview(URL).then((data) => {
        console.log("data", data);
        setFavicon(data.favicons[0]);
        setURLTitle(data.title);
        dispatch(
          doAddUrl({
            url: URL,
            image: data.images[0],
            title: data.title,
            description: data.description,
          })
        );
        if (data.title) {
          dispatch(doAddDesc(data.description));
        }

        if (data?.title) {
          dispatch(doAddTitle(data.title));
        }
        setLoading(false);
        navigation.navigate("FinalStepOne");
      });
    } else {
      setDisabled(true);
    }
  };

  React.useEffect(() => {
    if (URL == null) setDisabled(true);
  }, []);

  React.useEffect(() => {
    if (urlState?.url) {
      setURL(urlState?.url);
      setDisabled(false);
      setLinkText("Remove Link");
    }
  }, [urlState?.url]);

  const handleChangeText = (val) => {
    setURL(val);
    if (_validateURL(val)) {
      setDisabled(false);
      setLinkText("Remove Link");
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: AppStyles.headerBackgroundColor,
          borderTopColor: AppStyles.headerBackgroundColor,
        }}
      >
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View style={styles.headingBox}>
            <View>
              <Text style={styles.headingBoxText}>
                Please enter an URL of {"\n"}
                the recipe:
              </Text>
            </View>
          </View>
          <View style={styles.mainForm}>
            <CBTextInput
              label="Enter recipe URL."
              showError={showURLError}
              value={URL}
              errorMessage="UPS! Something is wrong with an URL. Please review the URL provided and try again."
              onChangeText={(value) => {
                handleChangeText(value);
              }}
              multiline
            ></CBTextInput>
          </View>

          {/* paste link */}
          <View style={{ marginTop: 25 }}>
            <Text style={styles.pasteText} onPress={handlePasteEvent}>
              {linkText}
            </Text>
          </View>

          <View
            style={{
              marginTop: 25,
              marginLeft: 25,
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: favicon }}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ position: "absolute", marginLeft: 50 }}>
              {URLTitle}
            </Text>
          </View>

          <View
            style={{
              marginTop: "40%",
              padding: 35,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={
                disabled
                  ? AppStyles.styles.buttonPrimaryDisabled
                  : AppStyles.styles.buttonPrimary
              }
              onPress={() => handleSubmit()}
              disabled={disabled}
            >
              <Text
                style={
                  disabled
                    ? AppStyles.styles.buttonPrimaryDisabledText
                    : AppStyles.styles.buttonPrimaryText
                }
              >
                Next
              </Text>
              <Image
                style={styles.arrowStyle}
                source={
                  disabled
                    ? require("../../../assets/images/grey_arrow.png")
                    : require("../../../assets/images/white_arrow.png")
                }
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>

      {isLoading && (
        <View style={AppStyles.styles.activityIndicatorContainer}>
          <ActivityIndicator
            size={"large"}
            color={AppStyles.headerBackgroundColor}
          />
        </View>
      )}
    </>
  );
};

export default app;

const styles = StyleSheet.create({
  arrowStyle: {
    marginLeft: "80%",
  },
  mainContainer: {
    backgroundColor: AppStyles.appBackgroundColor,
  },
  mainForm: {
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  headingBox: {
    marginTop: hp(3),
    alignItems: "center",
  },
  headingBoxText: {
    left: "0%",
    right: "0%",
    top: "1%",
    bottom: "0%",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: 25,
    textAlign: "center",
    color: "#000000",
  },
  pasteText: {
    position: "absolute",
    textDecorationLine: "underline",
    fontFamily: "Nunito",
    fontStyle: "normal",
    color: "#999999",
    bottom: "39.79%",
    marginLeft: "40%",
  },
});
