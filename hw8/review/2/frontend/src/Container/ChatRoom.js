import "../App.css";
import React, { useEffect, useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../Container/ChatModal";
import { MUTATION, QUERY, SUBSCRIPTION } from "../graphql";
import { useQuery, useMutation } from "@apollo/react-hooks";
const { TabPane } = Tabs;

const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [keys, setKeys] = useState([]);
  const addChatBox = () => {
    setModalVisible(true);
  };
  const { data: { messages } = { messages: [] }, subscribeToMore } = useQuery(
    QUERY,
    {
      variables: { name: activeKey },
    }
  );
  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIPTION,
      variables: { name: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev);
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.message;

        return {
          ...prev,
          messages: [...prev.messages, newMessage],
        };
      },
    });
  }, [subscribeToMore, activeKey]);
  // console.log("chatbox", chatBoxes);
  const removeChatBox = (targetKey) => {
    setKeys((preKeys) => {
      const newKeys = preKeys.filter(({ key }) => key !== targetKey);
      if (newKeys.findIndex(({ key }) => key === activeKey) === -1)
        setActiveKey(newKeys[-1]);
      return newKeys;
    });
  };

  const createChatBox = (friend, me) => {
    const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    if (keys.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    setKeys((preKeys) => {
      const newKeys = [...preKeys];
      newKeys.push({ key: newKey, friend });
      return newKeys;
    });
    setActiveKey(newKey);
  };

  const [sendMessage] = useMutation(MUTATION);

  return (
    <>
      {" "}
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") removeChatBox(targetKey);
          }}
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
        >
          {keys.map(({ key, friend }) => (
            <TabPane tab={friend} key={key} closable={true}>
              {messages &&
                messages.map(({ sender, body }) => {
                  const textAlign = sender === me ? "right" : "left";
                  return <p style={{ textAlign }}>{body}</p>;
                })}
            </TabPane>
          ))}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            createChatBox(name, me);
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            setMessageInput("");
            return;
          }
          sendMessage({
            variables: { name: activeKey, sender: me, body: messageInput },
          });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
