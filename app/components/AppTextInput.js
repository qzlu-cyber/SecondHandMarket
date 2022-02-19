import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import defaltStyles from "../config/style";

export default function AppTextInput({
  icon,
  width = "100%",
  height,
  ...otherProps
}) {
  if (icon === "camera-alt")
    return (
      <View style={[styles.container, { width, height }, styles.iconCamera]}>
        {icon && <MaterialIcons name={icon} size={30} color={colors.medium} />}
        <TextInput {...otherProps} style={defaltStyles.text} />
      </View>
    );
  return (
    <View style={[styles.container, { width, height }]}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput {...otherProps} style={defaltStyles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.light,
  },
  icon: {
    marginRight: 10,
  },
  iconCamera: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
