import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import FEIcon from "react-native-vector-icons/Feather";
import IIcon from "react-native-vector-icons/AntDesign";
import Clipboard from "@react-native-community/clipboard";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import Marker from "react-native-image-marker";
import Toast from "react-native-simple-toast";
import Modal from "react-native-modalbox";

const ShareScreen = ({ route, navigation }) => {
  const recipeDetail = route?.params?.recipeDetail;

  const imageUrl = route.params?.recipeDetail?.recipeImage;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  const [imageB, setImageB] = useState();
  const [baseB64, setBaseB64] = useState();

  const urlLink = "chefmate.app";
  const title = "Chefmate app";
  const message = "Please check this out.";

  const options = Platform.select({
    ios: {
      activityItemSources: [
        {
          placeholderItem: {
            type: "url",
            content: imageB,
          },
          item: {
            default: {
              type: "text",
              content: `${message} ${urlLink}`,
            },
          },
          linkMetadata: {
            title: message,
            icon: imageB,
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${urlLink}`,
    },
  });

  useEffect(() => {
    console.log(route.params.recipeDetail);
    console.log(route.params.recipeDetail?.recipeImage);
    copyToClipboard();
    fetchImage();
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(`${recipeDetail.title} #Chefmate`);
  };

  const waterMark = (base64) => {
    // console.log("converting", base64);
    Marker.markText({
      src: `data:image/jpeg;base64,${base64}`,
      text: "#Chefmate",
      color: "#fff",
      fontName: "Arial-BoldItalicMT",
      fontSize: 20,
      scale: 1,
      quality: 100,
      position: "bottomLeft",
    })
      .then(async (res) => {
        console.log("the path is" + res);
        // const path = Platform.OS === "android" ? "file://" + res : "" + res;
        const path = "file://" + res;
        console.log("path", path);
        setImageB(path);
      })
      .catch((err) => {
        console.log("err", err, "err");
      });
    let url = route.params?.recipeDetail?.recipeImage;
  };

  const fetchImage = () => {
    let url = route.params?.recipeDetail?.recipeImage;
    // send http request in a new thread (using native code)
    if (url) {
      setIsLoading(true);
      RNFetchBlob.fetch("GET", url)
        .then((res) => {
          let status = res.info().status;

          console.log(status);
          if (status == 200) {
            // the conversion is done in native code
            let base64Str = res.base64();

            waterMark(base64Str);
            setImage(base64Str);
            setBaseB64(base64Str);
            setIsLoading(false);
          } else {
            // handle other status codes
            console.log(status);
          }
        })
        // Something went wrong:
        .catch((errorMessage, statusCode) => {
          // error handling
          console.log("errorMessage", errorMessage);
        });
    }
  };

  const handleOtherShare = async () => {
    try {
      await Share.open(options);
    } catch (error) {
      console.log("err here", error);
    }
  };

  const shareSingleImage = async () => {
    const shareOptions = {
      title: "Share file",
      url: imageB,
      failOnCancel: false,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(ShareResponse);
      Toast.show("Thanks for sharing Chefmate", Toast.LONG);
      setIsOpen(false);
      navigation.goBack();
      // setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log("Error =>", error);
    }
  };

  return (
    <>
      <SafeAreaView></SafeAreaView>

      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" color="#61BAAC" />
        </View>
      )}
      {!isLoading && !imageUrl && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <FEIcon name="chevron-left" size={24} />
            <Text>Back</Text>
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>This recipe does not have an image</Text>
          </View>
        </View>
      )}

      {!isLoading && imageB && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <FEIcon name="chevron-left" size={24} />
            <Text>Back</Text>
          </TouchableOpacity>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.textClipboard}>
              Text was copied to your {"\n"}clipboard, paste it into your{"\n"}
              description field.
            </Text>
            <Image
              source={{ uri: imageB }}
              style={styles.image}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>{recipeDetail.title} #Chefmate</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setIsOpen(true)}
            style={styles.shareBtn}
          >
            <Text style={styles.shareBtnText}>Share Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOtherShare} style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Share Chefmate App</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        style={styles.modal}
        position={"bottom"}
        backdropPressToClose={false}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            style={styles.closeModalBtn}
          >
            <IIcon name="close" size={24} />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{recipeDetail.title} #Chefmate</Text>
          </View>

          <View style={styles.infoBox}>
            <Text>Paste it on description box</Text>
          </View>

          <TouchableOpacity
            onPress={shareSingleImage}
            style={styles.continueBtn}
          >
            <Text style={styles.shareBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ShareScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: hp("30"),
    width: wp("60"),
    borderRadius: 10,
    marginBottom: hp("4"),
  },
  textClipboard: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: RFPercentage("3"),
    marginVertical: hp("3"),
  },
  textCopied: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: RFPercentage("4"),
    // marginBottom: hp("3"),
    color: "#696969",
  },
  title: {
    fontSize: RFPercentage("4"),
    fontStyle: "italic",
    marginBottom: 10,
  },
  shareBtn: {
    backgroundColor: "#61BAAC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: wp("80"),
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: hp("3"),
  },
  shareBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  backBtn: {
    position: "absolute",
    top: 30,
    left: 30,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: 230,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor: "transparent",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
  },
  continueBtn: {
    backgroundColor: "#61BAAC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: wp("80"),
    borderRadius: 10,
    marginLeft: 10,
    marginVertical: hp("3"),
  },
  infoBox: {
    backgroundColor: "#cce5ff",
    borderColor: "#b8daff",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  closeModalBtn: {
    position: "absolute",
    top: -20,
    right: 0,
  },
});
