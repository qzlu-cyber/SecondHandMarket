import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='我的'
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='消息列表' component={MessagesScreen} />
      <Stack.Screen name='聊天' component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
