/*
 * @Author: 刘俊琪
 * @Date: 2020-08-01 08:57:18
 * @LastEditTime: 2022-02-19 13:14:00
 * @Description: 描述
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import AppText from "./AppText";
import colors from "../config/colors";

function OfflineNotice(props) {
  const netInfo = useNetInfo();

  console.log(netInfo);

  if (netInfo.type === "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>网络连接不可用</AppText>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    position: "absolute",
    top: Constants.statusBarHeight,
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;
