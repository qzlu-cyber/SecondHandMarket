import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from '../components/form';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).max(20).label('Password'),
});

export default function LoginScreen() {
  const [loginFiled, setLoginFiled] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);

    if (!result.ok) return setLoginFiled(true);

    setLoginFiled(false);

    login(result.data);
  };
  return (
    <Screen style={styles.container}>
      <Image source={require('../assets/logo-red.png')} style={styles.image} />
      <AppForm
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <ErrorMessage error="账号或密码不正确" visible={loginFiled} />
        <AppFormField
          name="email"
          icon="person"
          placeholder="用户名/邮箱"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCurrent={false}
        />
        <AppFormField
          name="password"
          icon="lock"
          placeholder="密码"
          textContentType="password"
          autoCapitalize="none"
          autoCurrent={false}
          secureTextEntry
        />
        <SubmitButton title="登录" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});
