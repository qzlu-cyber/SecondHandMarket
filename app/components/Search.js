import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import Constants from "expo-constants";

import listingsApi from "../api/listings";
import { AppForm, AppFormField, SubmitButton } from "../components/form";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  searchContent: Yup.string(),
});

export default function Search({ getChildValue }) {
  const handleSubmit = async (searchContent) => {
    const result = await listingsApi.getListingsBySearch(searchContent);
    if (!result.ok) {
      console.log(result);
    } else {
      //console.log("dataLen", result.data.length);
      if (result.data) getChildValue(result.data, true);
      if (result.data.length === 0) {
        getChildValue(null, false);
        console.log("没有该资源");
      }
    }
  };

  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{ searchContent: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <AppFormField
          name='searchContent'
          icon='search'
          placeholder='搜索...'
          autoCapitalize='none'
          autoCurrent={false}
          width='85%'
          height={50}
        />
        <SubmitButton
          title='搜索'
          style={styles.button}
          styleText={styles.text}
        />
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    marginTop: -Constants.statusBarHeight + 5,
    marginBottom: -10,
    justifyContent: "center",
  },
  button: {
    width: 40,
    padding: 5,
    backgroundColor: colors.secondary,
    borderRadius: 7,
    position: "absolute",
    right: 10,
    top: 10,
  },
  text: {
    fontSize: 14,
    color: colors.white,
  },
});
