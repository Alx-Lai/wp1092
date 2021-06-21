import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal" //default import: don't need {}
import useChatBox from "../hooks/useChatBox"
import useChat from "../hooks/useChat"
import Message from "../Components/Message"

const { TabPane } = Tabs;
const ChatRoom = ({ me , displayStatus, client}) => {
    client.onmessage = (m) => {
        onEvent(JSON.parse(m.data));
    };

    const sendData = (data) => client.send(JSON.stringify(data))

    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("")
    const {chatBoxes, createChatBox, removeChatBox, setChatlog, pushChatlog} = useChatBox(sendData); //parameters is read-only
    const {sendMessage} = useChat(sendData);

    const addChatBox = () => { setModalVisible(true); };

    const onEvent = (e) => {
        const { type } = e;

        switch (type) {
            case 'CHAT': {
                // messages = e.data.messages;
                console.log("type= "+type)
                console.log("e.data.messages= "+e.data.messages)
                setChatlog(activeKey, e.data.messages)
                break;
            }
            case 'MESSAGE': {
                // messages.push(e.data.message);
                console.log("type= "+type)
                console.log("e.data.message= "+e.data.message)
                pushChatlog(activeKey, e.data.message)
                break;
            }
        }
    };

    // useEffect(() => {
	// 	console.log("activeKey:"+activeKey)
	// }, [activeKey]);

    return (
        <> 
        <div className="App-title">
            <h1>{me}'s Chat Room</h1> </div>
        <div className="App-messages">
            <Tabs 
                type="editable-card" 
                activeKey={activeKey}
                onChange={(key) => { setActiveKey(key); }} //click tab
                onEdit={(targetKey, action) => { // delete tab
                    if (action === "add") addChatBox();
                    else if (action === "remove") setActiveKey(removeChatBox(activeKey, targetKey));
                }}
            >
                {chatBoxes.map((
                    { friend, key, chatLog }) => {
                        return (
                            <TabPane tab={friend} 
                                key={key} closable={true}>
                                {/* <p>{friend}'s chatbox.</p> */}
                                {chatLog.length === 0? 
                                    (<p>No messages!</p>) 
                                :
                                    // chatLog.map(({ body, name }, id) => <p>{name}:{body}</p>)
                                    (chatLog.map(({ body, name }, id) => {
                                        return <Message me={me} sender={name} body={body} key={id}/>
                                    }))
                                }
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
        </div>
        <Input.Search
            value={messageInput}
            onChange={(e) => 
            setMessageInput(e.target.value)}
            enterButton="Send"
            placeholder="Enter message here..."
            onSearch={(msg) => 
                { 
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
                    sendMessage({me:me, key: activeKey, body: msg });            
                    setMessageInput(""); }}
        ></Input.Search> 
        </>);
};
export default ChatRoom;
      