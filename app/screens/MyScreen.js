import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Yup from "yup";

import useAuth from "../auth/useAuth";
import userApi from "../api/users";
import { AppForm, AppFormField, SubmitButton } from "../components/form";

const validationSchema = Yup.object().shape({
  prePassword: Yup.string().required(),
  password: Yup.string().min(7, "密码必须大于7位"),
});

export default function MyScreen({ route }) {
  const { logOut } = useAuth();
  const user = route.params;

  const handleSubmit = async (userInfo) => {
    const result = await userApi.update(user._id, userInfo);

    if (result.ok) {
      const edit = true;
      Alert.alert("修改成功", "请重新登陆。", [
        {
          text: "确定",
          onPress: () => logOut(edit),
        },
      ]);
    } else {
      alert("修改失败，请重试！");
    }
  };

  return (
    <AppForm
      initialValues={{ prePassword: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <AppFormField
        autoCapitalize='none'
        autoCorrect={false}
        icon='lock'
        name='prePassword'
        placeholder='请输入原密码'
        secureTextEntry
        textContentType='password'
      />
      <AppFormField
        autoCapitalize='none'
        autoCorrect={false}
        icon='lock'
        name='password'
        placeholder='请输入新密码'
        secureTextEntry
        textContentType='password'
      />
      <SubmitButton title='确认修改' />
    </AppForm>
  );
}

const styles = StyleSheet.create({});
