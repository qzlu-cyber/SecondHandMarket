import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Platform } from "react-native";

import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ListItemSeparator from "../components/ListItemSeparator";
import ActivityIndicator from "../components/ActivityIndicator";
import Search from "../components/Search";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getChildValue = (data, have) => {
    if (have) setData(data); //保留have接口，搜索不到结果时渲染一个文本
  };

  const refresh = () => {
    getListingsApi.request();
    setData([]);
  };

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visiable={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <AppText>获取数据失败，请检查网络连接</AppText>
            <AppButton title='重试' onPress={getListingsApi.request} />
          </View>
        )}
        <Search getChildValue={getChildValue} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.length ? data : getListingsApi.data}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={item.price + "元"}
              imageUrl={item.images[0]}
              onPress={() => navigation.navigate("详情", item)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          getItemLayout={(data, index) => ({
            length: 300,
            offset: 300 * index,
            index,
          })}
          onEndReached={() => refresh()}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={() => refresh()}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
