import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Share,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BetterBanner from "react-native-better-banner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {} from "react-native-expo-image-cache";

import useApi from "../hooks/useApi";
import userApi from "../api/users";
import useAuth from "../auth/useAuth";
import messagesApi from "../api/messages";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import ContactSellerForm from "../components/ContactSellerForm";

export default function ListingDetailScreen({ route, navigation }) {
  const listing = route.params;
  const { user: me } = useAuth();
  const [name, setName] = useState("");
  const [userid, setuserid] = useState("");
  const [avatar, setAvatar] = useState();
  const [count, setCount] = useState(1);
  const getMessagesApi = useApi(messagesApi.getMessages);

  const getChildValue = (count) => {
    setCount(count);
  };

  const user = async (id) => {
    const result = await userApi.getUser(id);
    if (result.ok) {
      setAvatar(result.data.avatar);
      setName(result.data.name);
      setuserid(result.data._id);
    } else {
      console.log("错误");
      setName("123");
      return null;
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "分享此物品给好友",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getMessagesApi.request();
  }, [count]);

  useEffect(() => {
    user(listing.id);
  }, []);
  // const uri = imageUrl;
  // const preview = { uri: imageUrl };
  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <BetterBanner
              bannerComponents={listing.images.map((imageData, index) => (
                <Image
                  key={index}
                  source={{ uri: imageData }}
                  style={styles.image}
                />
              ))}
              bannerHeight={300}
              indicatorContainerBackgroundColor={"rgba(0,0,0,0.3)"}
              isSeamlessScroll={true}
            />
            <View style={styles.detailsContainer}>
              <AppText style={styles.title}>{listing.title}</AppText>
              <AppText style={styles.description}>
                {listing.description}
              </AppText>
              <AppText style={styles.price}>{listing.price}元</AppText>
              <TouchableOpacity style={styles.shareContainer} onPress={onShare}>
                <MaterialCommunityIcons
                  name='share-variant'
                  size={25}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <View style={styles.userContainer}>
                <ListItem
                  title={name}
                  subTitle='5件商品'
                  image={avatar}
                  onPress={() => {
                    if (me._id !== userid) {
                      navigation.navigate("聊天", {
                        to: userid,
                        name: name,
                        friendAvatar: avatar,
                      });
                    } else if (me._id === userid) {
                      navigation.navigate("我的商品", userid);
                    }
                  }}
                />
              </View>
            </View>
          </>
        }
        data={getMessagesApi.data}
        style={styles.messagesContainer}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => {
          if (item.listingId === listing._id) {
            return (
              <TouchableOpacity
                style={styles.msgsAndAvatar}
                onPress={() =>
                  navigation.navigate("聊天", {
                    to: item._id,
                    name: item.name,
                  })
                }
              >
                {item.avatar && (
                  <View style={styles.avatarContainer}>
                    <Image
                      style={styles.avatar}
                      source={{ uri: item.avatar }}
                    />
                  </View>
                )}
                <AppText style={styles.messages}>
                  {item.name}说：{item.message}
                </AppText>
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        }}
        ListFooterComponent={
          <View style={{ marginBottom: 10 }}>
            <ContactSellerForm
              getChildValue={getChildValue}
              listing={listing}
            />
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 10,
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 300,
  },
  userContainer: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: -10,
  },
  messagesContainer: {
    marginBottom: 10,
    height: "100%",
  },
  messages: {
    paddingVertical: 15,
    paddingLeft: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 15,
  },
  msgsAndAvatar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  shareContainer: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});
