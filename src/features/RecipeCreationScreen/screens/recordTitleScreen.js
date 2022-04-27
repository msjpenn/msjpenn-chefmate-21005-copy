import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from "react-native-audio-recorder-player";
import * as AppStyles from "../../../components/appStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../../components/AddRecipeHeader";

audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.09);

const app = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [recordTime, setRecordTime] = useState("00:00:00");
  const [recordSecs, setRecordSecs] = useState(0);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState("00:00:00");
  const [duration, setDuration] = useState("00:00:00");
  const [isRecord, setIsRecord] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const headerText = "First you have to record a \n recipe title.";

  const onStartRecord = async () => {
    setIsRecord(1);
    setIsStart(true);
    setIsPlay(false);
    const path = "hello.m4a";
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log("audioSet", audioSet);
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.current_position);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
    });
    console.log(`uri: ${uri}`);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsRecord(0);
    setIsStart(false);
    setIsPlay(true);
    setRecordSecs(0);
    console.log(result);
  };

  const onResumeRecord = async () => {
    const result = await audioRecorderPlayer.resumePlayer();
    console.log(result);
  };

  const onStartPlay = async (e) => {
    console.log("onStartPlay");
    setIsPlay(false);
    const path = "hello.m4a";
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log("finished");
        audioRecorderPlayer.stopPlayer();
      }
      setCurrentPositionSec(e.current_position);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
    });
  };

  const onPausePlay = async (e) => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async (e) => {
    console.log("onStopPlay");
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const handleSubmit = () => {};

  return (
    <>
      <Text>Recode</Text>
      <View
        style={{
          flex: 1,
          backgroundColor: AppStyles.headerBackgroundColor,
          borderTopColor: AppStyles.headerBackgroundColor,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View style={styles.mainHead}>
            <Text style={styles.mainText}>{headerText}</Text>
          </View>
          <View style={styles.subHead}>
            <Text style={styles.subText}>Press record when ready</Text>
          </View>
          <View style={{ marginVertical: 30 }} />
          <View>
            <Text style={styles.status}>
              {isRecord === 1
                ? "Recording..."
                : isRecord === 2
                ? "Pause..."
                : ""}
            </Text>
            <Text style={styles.time}>{recordTime}</Text>
          </View>
          <View style={styles.recView}>
            <View style={{ alignItems: "center" }}>
              {/* {!isStart ? (
                <TouchableOpacity
                  style={styles.recOuterCircle}
                  onPress={() => onStartRecord()}
                >
                  <View style={styles.recInnerCircle} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.recOuterCircle}
                  onPress={() => onStopRecord()}
                >
                  <View style={styles.recInnerSquare} />
                </TouchableOpacity>
              )} */}
              {/* <Text style={{ marginVertical: 5 }}>
                {!isStart ? "Record" : "Stop"}
              </Text> */}
            </View>

            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={onStartRecord}
                textStyle={styles.txt}
                title="Record"
              />
              <Button
                style={styles.btn}
                onPress={onPausePlay}
                textStyle={styles.txt}
                title="Pause"
              />
            </View>

            {/* <View style={{ alignItems: "center" }}>
              {!isPlay ? (
                <TouchableOpacity style={styles.recControlBtn}>
                  <Icon name="pause" size={14} color="#000" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.recControlBtn}
                  onPress={() => onStartPlay()}
                >
                  <Icon name="play" size={14} color="#000" />
                </TouchableOpacity>
              )}
              <Text style={{ marginVertical: 5 }}>
                {!isPlay ? "Pause" : "Play"}
              </Text>
            </View> */}
          </View>

          <View style={{ marginTop: 5, padding: 35 }}>
            <TouchableOpacity
              style={AppStyles.styles.buttonPrimary}
              onPress={() => handleSubmit()}
            >
              <Text style={AppStyles.styles.buttonPrimaryText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default app;

const styles = StyleSheet.create({
  mainHead: {
    alignItems: "center",
    marginTop: 50,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
  subHead: {
    alignItems: "center",
  },
  subText: {
    marginTop: 10,
    fontSize: 11,
  },
  time: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  recView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 30,
  },
  recOuterCircle: {
    marginTop: "center",
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  recInnerCircle: {
    borderRadius: 30,
    width: 60,
    height: 60,
    margin: 10,
    backgroundColor: "#FF0000",
  },
  recInnerSquare: {
    width: 40,
    height: 40,
    margin: 20,
    backgroundColor: "#FF0000",
  },
  recControlBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  status: {
    textAlign: "center",
  },
  nextBtn: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  ArrowImg: {
    marginLeft: 80,
  },
});
