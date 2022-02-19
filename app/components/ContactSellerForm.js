import React, { useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";

import useAuth from "../auth/useAuth";
import { AppForm, AppFormField, SubmitButton } from "./form";
import messagesApi from "../api/messages";

function ContactSellerForm({ listing, getChildValue }) {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(
      message,
      listing._id,
      user.name,
      user.avatar
    );

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("错误", "发送信息失败。");
    } else {
      setCount(count + 1);
      getChildValue(count);

      resetForm();

      Notifications.presentLocalNotificationAsync({
        title: "Awesome!",
        body: "成功发送!",
      });
    }
  };

  return (
    <AppForm
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name='message'
        placeholder='说点什么...'
      />
      <View
        style={{
          width: "30%",
          alignSelf: "center",
        }}
      >
        <SubmitButton title='询问卖家' />
      </View>
    </AppForm>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
