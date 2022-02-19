import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

export default function ListItem({
  title,
  subTitle,
  extra,
  image,
  onPress,
  component,
  style,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          {component}
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.userContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          {extra && extra - 1 > 0 && (
            <View style={styles.extra}>
              <AppText
                style={{
                  color: "white",
                  fontSize: 15,
                }}
              >
                {extra - 1}
              </AppText>
            </View>
          )}
          <MaterialIcons
            name='keyboard-arrow-right'
            size={25}
            color={colors.medium}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  title: {
    fontWeight: "400",
    marginBottom: 5,
  },
  subTitle: {
    color: colors.medium,
  },
  extra: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
