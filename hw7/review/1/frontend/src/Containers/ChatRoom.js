import React from "react";
import "../App.css";
import { useState } from "react";
import { Tabs, Input, Tag, message } from "antd";
import ChatModal from "../Containers/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const { TabPane } = Tabs;

function ChatRoom({ me, displayStatus }) {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [to, setTo] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const { sendMessage, messages, startChat } = useChat();
  const addChatBox = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            let friend = key.split("_")[0] === me ? key.split("_")[1] : key.split("_")[0];
            setTo(friend);

            // startChat(key.split("_")[0] === me ? key.split("_")[1] : key.split("_")[0], me);
            startChat({ friend, me });
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {
              let newKey = removeChatBox(targetKey, activeKey);
              let friend = newKey.split("_")[0] === me ? newKey.split("_")[1] : newKey.split("_")[0];
              // setActiveKey(removeChatBox(targetKey, activeKey));
              setActiveKey(newKey);
              startChat({ friend, me });
              setTo(friend);
            }
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                {messages.length ? (
                  messages.map((message, id) => {
                    return (
                      <p className={`App-message ${message.name === me ? "App-message-me" : ""}`} key={id}>
                        {message.name === me ? message.body : <></>}
                        <Tag color="blue" style={{ marginLeft: "10px", marginRight: "10px" }}>
                          {message.name}
                        </Tag>
                        {message.name === me ? <></> : message.body}
                      </p>
                    );
                  })
                ) : (
                  <p>{friend}'s chatbox.</p>
                )}
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setTo(name);
            setActiveKey(createChatBox(name, me)[0].newKey);
            startChat(createChatBox(name, me)[1]);
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
            displayStatus({ type: "error", msg: "Please enter massage" });
            return;
          } else if (activeKey === "") {
            displayStatus({ type: "error", msg: "Please add a chatbox first" });
            setMessageInput("");
            return;
          }

          console.log({ to: to, name: me, body: msg });
          //sendMessage({ to: activeKey.split("_")[0], name: activeKey.split("_")[1], body: msg });
          sendMessage({ to: to, name: me, body: msg });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
}
export default ChatRoom;
