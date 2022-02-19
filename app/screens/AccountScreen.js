import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import authStorage from "../auth/storage";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "我的物品",
    icon: {
      name: "format-list-numbered",
      backgroundColor: colors.primary,
    },
    toScreen: "我的商品",
  },
  {
    title: "消息",
    icon: {
      name: "message",
      backgroundColor: colors.secondary,
    },
    toScreen: "消息列表",
  },
];

export default function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={{ height: "100%" }}>
        <FlatList
          ListHeaderComponent={() => (
            <ListItem
              title={user.name}
              subTitle={user.email}
              image={user.avatar}
              style={styles.container}
              onPress={() => navigation.navigate("我的账号", user)}
            />
          )}
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              component={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.toScreen, user._id)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          ListFooterComponent={() => (
            <ListItem
              title='退出登录'
              component={<Icon name='exit-to-app' backgroundColor='#ffe66d' />}
              style={{ marginTop: 20 }}
              onPress={logOut}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginBottom: 20,
  },
});
