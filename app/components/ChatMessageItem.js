import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../config/colors";

export default function ChatMessageItem({ content, isMe, image }) {
  if (!isMe) {
    return (
      <View style={[styles.messageContainerLeft]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={[styles.textContainer, { borderTopLeftRadius: 0 }]}>
          <Text style={styles.text}>{content}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.messageContainer]}>
      <View style={[styles.textContainer, { borderTopRightRadius: 0 }]}>
        <Text style={styles.text}>{content}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "25%",
  },
  messageContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "25%",
  },
  textContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  text: {
    fontSize: 17,
  },
  imageContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
