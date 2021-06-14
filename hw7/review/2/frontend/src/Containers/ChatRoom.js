import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Tag } from "antd";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { chatBoxes, removeChatBox, createChatBox } = useChatBox();
  const { messages, sendMessage, sendChatBox, clearMessages } = useChat();

  const addChatBox = () => { setModalVisible(true); };

  useEffect(() => {
    if(activeKey) {
      sendChatBox(activeKey, me)
    }
  }, [activeKey, me, sendChatBox])

  return (
    <> 
      <div className="App-title">
         <h1>{me}'s Chat Room</h1> 
         </div>
      <div className="App-messages" style={{overflow: 'visible'}}>
        <Tabs type="editable-card" 
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {
              clearMessages();
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
              return (
                <TabPane tab={friend} 
                  key={key} closable={true}>
                </TabPane>
            );})}
         </Tabs>
         <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
        <div style={{overflow: 'auto', height: "90%"}}>
          {messages.length === 0 ? (
            <p className="App-message" style={{ color: '#ccc' }}> No messages... </p>) : (
              messages.map(({ name, body }, i) => {
                if(name === me) {
                  return (
                    <p key={i} style={{textAlign: 'right', marginRight: '5px'}}>
                      <Tag style={{backgroundColor: '#e6ecff', color: 'gray', borderRadius: '4px', borderColor: 'transparent'}}>{body}</Tag> {name} 
                    </p>
                  )
                }
                else {
                  return (
                    <p className="App-message" key={i} style={{textAlign: 'left'}}>
                      {name} <Tag style={{backgroundColor: '#e6ecff', color: 'gray', borderRadius: '4px', borderColor: 'transparent'}}>{body}</Tag>
                    </p>
                  )
                }
              })
          )}
        </div>
      </div>
        <Input.Search
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          enterButton="Send"
          placeholder=
            "Enter message here..."
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
              sendMessage(activeKey, me, messageInput);
              setMessageInput(""); 
            }}
        ></Input.Search> 
    </>);
  };
  export default ChatRoom;