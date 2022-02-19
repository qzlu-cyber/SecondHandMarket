import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Yup from "yup";

import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/form";
import ActivityIndicator from "../components/ActivityIndicator";
import ImagePicker from "../components/form/ImagePicker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  avatar: Yup.string(),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (userInfo) => {
    if (Platform.OS === "android") {
      let formData = new FormData(); //如果需要上传多张图⽚,需要遍历数组,把图⽚的路径数组放⼊formData中

      formData.append("avatar", userInfo.avatar); //这⾥的files就是后台需要的key

      const xhr = new XMLHttpRequest();

      xhr.open("POST", `http://192.168.31.101:3000/api/users/android`, true);
      xhr.onload = async () => {
        const reslut = await registerApi.request(userInfo);
        if (!reslut.ok) {
          if (reslut.data) setError(reslut.data);
          else {
            setError("发生错误!");
            console.log(reslut);
          }
          return;
        }
        const { data: authToken } = await loginApi.request(
          userInfo.email,
          userInfo.password
        );
        login(authToken);
      };
      xhr.send(formData);
    }

    if (Platform.OS === "ios") {
      FileSystem.uploadAsync(
        "http://192.168.31.101:3000/api/users/",
        userInfo.avatar,
        {
          httpMethod: "PATCH",
        }
      ).then(async () => {
        const reslut = await registerApi.request(userInfo);
        if (!reslut.ok) {
          if (reslut.data) setError(reslut.data);
          else {
            setError("发生错误!");
            console.log(reslut);
          }
          return;
        }
        const { data: authToken } = await loginApi.request(
          userInfo.email,
          userInfo.password
        );
        login(authToken);

        console.log(reslut);
      });
    }
  };

  return (
    <>
      <ActivityIndicator visiable={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ name: "", email: "", password: "", avatar: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} visible={error} />
          <ImagePicker
            name='avatar'
            icon='camera-alt'
            width={100}
            height={100}
            editable={false}
          />
          <AppFormField
            autoCorrect={false}
            icon='person'
            name='name'
            placeholder='用户名'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            name='email'
            placeholder='邮箱地址'
            textContentType='emailAddress'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            name='password'
            placeholder='密码'
            secureTextEntry
            textContentType='password'
          />
          <SubmitButton title='注册' />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
