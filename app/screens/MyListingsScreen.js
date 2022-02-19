import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";

export default function MyListingsScreen({ route, navigation }) {
  const userid = route.params;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getListingsByUserid = async (id) => {
    const result = await listingsApi.getListingsByUserid(id);
    if (result.ok) {
      setData(result.data);
      setError(!result.ok);
    }
  };

  const update = async (id) => {
    const result = await listingsApi.update(id);
    if (!result.ok) {
      console.log(result);
    }
  };

  const handleSale = (id) => {
    Alert.alert(
      "提示",
      "你确定将商品状态设置为已售出状态吗？此修改不可逆，已售出的商品将不会再出现在首页，并且很快会被删除。",
      [
        {
          text: "确定",
          onPress: () => {
            update(id);
            getListingsByUserid(userid);
          },
        },
        {
          text: "取消",
        },
      ]
    );
  };

  useEffect(() => {
    getListingsByUserid(userid);
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <AppText>获取数据失败，请检查网络连接</AppText>
          <AppButton title='重试' onPress={getListingsByUserid} />
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <Card
                title={item.title}
                subTitle={item.price + "元"}
                imageUrl={item.images[0]}
                onPress={() => navigation.navigate("详情", item)}
              />
              <TouchableOpacity
                style={[
                  styles.saleButton,
                  {
                    backgroundColor: !item.saleOut
                      ? colors.primary
                      : colors.medium,
                  },
                ]}
                onPress={!item.saleOut ? () => handleSale(item._id) : null}
              >
                <Text style={styles.text}>
                  {item.saleOut ? "已售出" : "正在出售"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          getListingsByUserid(userid);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  saleButton: {
    width: 80,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    position: "absolute",
    right: 20,
    bottom: 60,
  },
  text: {
    fontSize: 15,
    color: colors.white,
    fontWeight: "bold",
  },
});
