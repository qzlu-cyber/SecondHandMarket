import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppNavigator from "./AppNavigator";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";
import ListingDetailScreen from "../screens/ListingDetailScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import MyScreen from "../screens/MyScreen";

const Stack = createStackNavigator();

function AppVisibleNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='我的'
        component={AppNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='我的商品' component={MyListingsScreen} />
      <Stack.Screen
        name='消息列表'
        component={MessagesScreen}
        // options={{
        //   headerLeft: () => (
        //     <TouchableOpacity style={styles.button}>
        //       <MaterialIcons
        //         name='keyboard-arrow-left'
        //         size={30}
        //         color={colors.primary}
        //       />
        //       <Text style={styles.text}>我的</Text>
        //     </TouchableOpacity>
        //   ),
        // }}
      />
      <Stack.Screen name='我的账号' component={MyScreen} />
      <Stack.Screen
        name='聊天'
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name='详情'
        component={ListingDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: colors.primary,
  },
});

export default AppVisibleNavigator;
