import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../screens/ChatScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='消息列表' component={MessagesScreen} />
      <Stack.Screen name='聊天' component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
