import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Yup from "yup";

import listingsApi from "../api/listings";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import AppPicker from "../components/AppPicker";
import UploadScreen from "../screens/UploadScreen";
import { AppForm, AppFormField, SubmitButton } from "../components/form";
import FormImagePicker from "../components/form/FormImagePicker";
import { userLocation } from "../hooks/useLocation";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(0).label("Price"),
  description: Yup.string().required().min(1).label("Description"),
  images: Yup.array().min(1, "至少添加一张商品图片!"),
  id: Yup.string().required(),
});

export default function ListingEditScreen({ navigation }) {
  const { user } = useAuth();
  const location = userLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    if (Platform.OS === "android") {
      for (let i = 0; i < listing.images.length; i++) {
        let formData = new FormData(); //如果需要上传多张图⽚,需要遍历数组,把图⽚的路径数组放⼊formData中
        formData.append("images", listing.images[i]); //这⾥的files就是后台需要的key

        const xhr = new XMLHttpRequest();

        xhr.open(
          "POST",
          `http://192.168.31.101:3000/api/listings/android`,
          true
        );
        xhr.send(formData);
      }
      const result = await listingsApi.addListing(
        { ...listing, location },
        (progress) => setProgress(progress)
      );
      console.log("ok");
      if (!result.ok) {
        setUploadVisible(false);
        return alert("发生错误");
      }
      resetForm();
    }

    if (Platform.OS === "ios") {
      for (let i = 0; i < listing.images.length; i++) {
        FileSystem.uploadAsync(
          "http://192.168.31.101:3000/api/listings/",
          listing.images[i],
          {
            httpMethod: "PATCH",
          }
        )
          .then(async () => {
            const result = await listingsApi.addListing(
              { ...listing, location },
              (progress) => setProgress(progress)
            );
            console.log("ok");
            if (!result.ok) {
              setUploadVisible(false);
              return alert("发生错误");
            }
            resetForm();
          })
          .catch((e) => console.log(e));
      }
    }
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          images: [],
          title: "",
          price: "",
          description: "",
          id: user._id,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <FormImagePicker name='images' />
        <AppFormField
          name='title'
          icon='class'
          placeholder='宝贝名称'
          autoCapitalize='none'
          autoCurrent={false}
        />
        <AppFormField
          name='description'
          icon='description'
          placeholder='宝贝描述'
          autoCapitalize='none'
          autoCurrent={false}
        />
        <AppPicker icon='apps' width='50%' />
        <AppFormField
          name='price'
          icon='credit-card'
          placeholder='宝贝价格'
          autoCapitalize='none'
          autoCurrent={false}
          maxLength={7}
          width={150}
        />
        <SubmitButton title='确认发布' />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
