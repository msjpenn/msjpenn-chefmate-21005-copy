import React, { createRef, useState, useEffect } from "react";
import { SafeAreaView, Modal, TextInput } from "react-native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as AppStyles from "../appStyles";
import { customApiService } from "../../store/recipe/services";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";

export const AddBookmarkGroupOption = ({ onGroupAdd }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newGroupName, setNewGroupName] = React.useState(null);
  const user = useSelector((state) => state.authReducer.user);
  const [isLoading, setIsLoading] = React.useState(false);

  const processBookmarkGroupCreation = () => {
    setIsLoading(true);
    customApiService
      .doCreateBookmarkGroup({ name: newGroupName, userId: user?.id })
      .then((resp) => {
        onGroupAdd();
        setModalVisible(false);
      })
      .catch((e) => {
        alert("Unable to create group, please try again. " + e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text
          style={[
            AppStyles.styles.content_p_bold,
            {
              color: AppStyles.COLOR_GRAY_2,
              textAlign: "center",
              marginTop: 30,
              textDecorationLine: "underline",
            },
          ]}
        >
          + Create new group
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalTop, { flex: 1 }]}></View>
          <View
            style={[
              styles.modalView,
              { paddingHorizontal: 20, flexDirection: "column" },
            ]}
          >
            <View
              style={{
                backgroundColor: AppStyles.appBackgroundColor,
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}
            >
              <Text
                style={[
                  AppStyles.styles.content_h1,
                  { textAlign: "left", paddingTop: 20, paddingHorizontal: 20 },
                ]}
              >
                New Group
              </Text>
            </View>
            <View style={{ backgroundColor: AppStyles.appBackgroundColor }}>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  marginTop: 20,
                  paddingHorizontal: 20,
                }}
              >
                <TextInput
                  style={{
                    height: 55,
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                  value={newGroupName}
                  onChangeText={(value) => setNewGroupName(value)}
                ></TextInput>
              </View>
            </View>
            <View
              style={{
                backgroundColor: AppStyles.appBackgroundColor,
                height: 20,
              }}
            >
              {isLoading ? (
                <ActivityIndicator
                  color={AppStyles.headerBackgroundColor}
                  size="small"
                />
              ) : null}
            </View>
            <View
              style={{
                backgroundColor: AppStyles.appBackgroundColor,
                flexDirection: "row",
                borderTopWidth: 0,
                borderTopColor: AppStyles.COLOR_GRAY_5,
                paddingVertical: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  flex: 1,
                  height: 60,
                  justifyContent: "center",
                  backgroundColor: AppStyles.appBackgroundColor,
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderColor: AppStyles.COLOR_GRAY_5,
                  borderBottomStartRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => processBookmarkGroupCreation()}
                style={{
                  flex: 1,
                  height: 60,
                  justifyContent: "center",
                  backgroundColor: AppStyles.appBackgroundColor,
                  borderTopWidth: 1,
                  borderLeftWidth: 0,
                  borderColor: AppStyles.COLOR_GRAY_5,
                  borderBottomEndRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center" }}>Create group</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.modalTop, {}]}></View>
        </View>
      </Modal>
    </>
  );
};
