import React, { useEffect, useState } from "react";
import {
  TouchableHighlight,
  Image,
  View,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useFormikContext } from "formik";
import * as RNImagePicker from "expo-image-picker";

import AppFormField from "../form/AppFormField";
import colors from "../../config/colors";

export default function ImagePicker({ name, icon, width, height }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];
  const [images, setImages] = useState("");
  const getPermission = async () => {
    const { granted } = await RNImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) {
      alert("获取访问相册权限失败!");
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const selectImage = async () => {
    try {
      const result = await RNImagePicker.launchImageLibraryAsync({
        quality: 0.5,
        mediaTypes: RNImagePicker.MediaTypeOptions.Images,
        base64: Platform.OS === "android" ? true : false,
      });
      if (!result.cancelled) {
        if (Platform.OS === "android") {
          setFieldValue(name, result.base64);
          setImages(result.base64);
        } else if (Platform.OS === "ios") {
          setFieldValue(name, result.uri);
          setImages(result.uri);
        }
      }
    } catch (error) {
      console.log("选择照片失败");
    }
  };

  const deleteImage = () => {
    Alert.alert("删除", "你确定重新选择头像吗？", [
      {
        text: "确定",
        onPress: () => {
          selectImage();
        },
      },
      {
        text: "返回",
      },
    ]);
  };

  if (images) {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => deleteImage()}
          underlayColor={colors.light}
        >
          <View style={[styles.imageContainer, { width, height }]}>
            {Platform.OS === "ios" && (
              <Image source={{ uri: images }} style={styles.image} />
            )}
            {Platform.OS === "android" && (
              <Image
                source={{ uri: "data:image/png;base64," + images }}
                style={styles.image}
              />
            )}
          </View>
        </TouchableHighlight>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={selectImage} underlayColor={colors.light}>
          <AppFormField
            name={name}
            icon={icon}
            width={width}
            height={height}
            editable={false}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginHorizontal: 10,
    backgroundColor: colors.light,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
