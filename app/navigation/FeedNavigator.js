import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailScreen from "../screens/ListingDetailScreen";
import AccountScreen from "../screens/AccountScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name='首页'
        component={ListingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='详情'
        component={ListingDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='聊天' component={ChatScreen} />
      <Stack.Screen
        name='我的'
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
