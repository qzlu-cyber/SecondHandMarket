import React, { useEffect, useState } from "react";
import { FlatList, Alert } from "react-native";

import useAuth from "../auth/useAuth";
import userApi from "../api/users";
import chatMessagesApi from "../api/chatMessages";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

export default function MessagesScreen({ navigation }) {
  const [msgFrom, setMsgFrom] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [allUnReadCount, setAllUnReadCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const getMessagesList = async () => {
    try {
      const result = await chatMessagesApi.getMessagesList();
      const currentMsg = result.data.data.messagesData;
      const lastMessageObjs = {};
      const contactUser = [];
      currentMsg.map((msg) => {
        contactUser.push(msg.from); //push发送消息的用户id
        contactUser.push(msg.to); //push自己的id

        if (msg.to === user._id && !msg.read) {
          //对每条message进行统计，如果接收方是自己并且未读
          msg.unReadCount = 1; //将unReadCount设为1
        } else {
          msg.unReadCount = 0; //否则设为0
        }

        const chatId = msg.chat_id;
        const lastMessage = lastMessageObjs[chatId];

        if (!lastMessage) {
          lastMessageObjs[chatId] = msg;
        } else {
          const unReadCount = lastMessage.unReadCount + msg.unReadCount; //首先累加unReadCount = 已经统计的 + 当前msg的
          if (msg.createTime > lastMessage.createTime) {
            lastMessageObjs[chatId] = msg;
          }
          lastMessageObjs[chatId].unReadCount = unReadCount; // 将unReadCount保存在更新后的lastMessage中
        }
      });

      const lastMsgs = Object.values(lastMessageObjs);
      lastMsgs.sort((msg1, msg2) => {
        return msg2.createTime - msg1.createTime;
      });
      setLastMessages(lastMsgs);

      function uniq(arr) {
        return Array.from(new Set(arr));
      }
      setMsgFrom(uniq(contactUser).filter((id) => id !== user._id));
    } catch (error) {
      console.log(error);
    }
  };

  let unRead = 0;

  const readMessage = async (to) => {
    const result = await chatMessagesApi.readMessage(to);
    if (result.ok) {
      setCount(count + 1);
    }
  };

  const userNameArr = [];
  const getMsgFrom = async (id, index) => {
    const result = await userApi.getUser(id);
    userNameArr.push(result.data);
    if (msgFrom.length && index === msgFrom.length - 1) {
      setUserNames(userNameArr);
    }
  };

  const handlePress = async (item) => {
    const result = await chatMessagesApi.deleteMessages(item._id);
    console.log(item._id);
    if (result.ok) {
      setUserNames(userNames.filter((userName) => item._id !== userName._id));
    }
  };

  useEffect(() => {
    msgFrom.map((id, index) => getMsgFrom(id, index));
  }, [msgFrom]);

  useEffect(() => {
    getMessagesList();
  }, [count]);

  return (
    <Screen>
      <FlatList
        data={userNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const chatId = [item._id, user._id].sort().join("_");
          let content = "";
          let unReadCount = 0;
          let to;
          lastMessages.map((lastMessage) => {
            if (lastMessage.chat_id === chatId) {
              content = lastMessage.content;
              unReadCount = lastMessage.unReadCount;
              to = lastMessage.from;
            }
            unRead = unRead + lastMessage.unReadCount;
            setAllUnReadCount(unRead);
          });
          return (
            <ListItem
              title={item.name}
              subTitle={content ? content : null}
              image={item.avatar}
              extra={unReadCount + 1}
              onPress={() => {
                navigation.navigate("聊天", {
                  to: item._id,
                  name: item.name,
                  friendAvatar: item.avatar,
                });
                readMessage(to);
              }}
              renderRightActions={() => (
                <ListItemDeleteAction
                  onPress={() =>
                    Alert.alert(
                      "删除",
                      "你确定删除聊天记录吗？删除后对方也将自动删除与您的聊天记录",
                      [
                        {
                          text: "确定",
                          onPress: () => {
                            handlePress(item);
                          },
                        },
                        {
                          text: "返回",
                        },
                      ]
                    )
                  }
                />
              )}
            />
          );
        }}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          getMessagesList();
        }}
      />
    </Screen>
  );
}
