import React, {
  useContext
} from "react";
import {
  Alert
} from "react-native";
import jwtDecode from "jwt-decode";

import authStorage from "./storage";
import authContext from "./context";

export default useAuth = () => {
  const {
    user,
    setUser
  } = useContext(authContext);

  const logOut = (edit) => {
    if (!edit) {
      Alert.alert("退出登录", "你确定退出登录吗？", [{
          text: "确定",
          onPress: () => {
            setUser(null);
            authStorage.removeToken();
          },
        },
        {
          text: "手滑了",
        },
      ]);
    } else {
      setUser(null);
      authStorage.removeToken();
    }
  };

  const getUser = (token) => {
    const user = jwtDecode(token);
    return user;
  };

  const login = (token) => {
    const user = jwtDecode(token);
    setUser(user);
    authStorage.storeToken(token);
  };

  return {
    user,
    setUser,
    logOut,
    login,
    getUser,
  };
};