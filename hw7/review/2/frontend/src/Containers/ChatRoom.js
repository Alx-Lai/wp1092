import "../App.css"
import { useEffect, useState } from "react"
import { Tabs, Input } from "antd"
import ChatModal from "../Components/ChatModal"
import useChat from '../hooks/useChat'
import useChatBox from '../hooks/useChatBox'
const { TabPane } = Tabs

const ChatRoom = ({ me }) => {

    // const [chatBoxes, setChatBoxes] = useState([
    //     { friend: "Mary", key: "MaryChatbox", chatLog: [] },
    //     { friend: "Peter", key: "PeterChatbox", chatLog: [] },
    // ])
    const [messageInput, setMessageInput] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const addChatBox = () => { setModalVisible(true) }
    const [activeKey, setActiveKey] = useState("")

    const { messages, sendMessage, startChat } = useChat()
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox()

    const displayStatus = ({ type, msg }) => {
        alert(msg)
    }

    const changeChatBox = (key) => {
        setActiveKey(key)
        let to = key.split("_")[1]
        startChat(me, to)
    }

    return (
        <>
            <div className='App-title'>
                <h1>{me}'s Chat Room</h1>
            </div>
            <div className='App-messages'>
                <Tabs type='editable-card'
                    activeKey={activeKey}
                    onEdit={(targetKey, action) => {
                        if (action === "add")
                            addChatBox()
                        else if (action === "remove")
                            setActiveKey(removeChatBox(targetKey, activeKey))
                    }}
                    onChange={(key) => changeChatBox(key)}
                >
                    {chatBoxes.map(({ friend, key, chatlog }) => {
                        return (
                            <TabPane
                                tab={friend}
                                key={key}
                                closable={true}
                            >
                                <p>{friend}'s chatbox.</p>
                                {messages.map(({ body, name }) => {
                                    let styles = {fontFamily: 'Arial'}
                                    if (name === me){
                                        styles['textAlign'] = 'right'
                                    
                                        return (
                                            <p style={styles}>
                                                <span style={{
                                                    backgroundColor: "#eeeeee", 
                                                    borderRadius: "1vh", 
                                                    padding:"1vh",
                                                    color: "#777777"
                                                }}>{body}</span>
                                                <span>{` ${name}`}</span>
                                            </p>
                                        )
                                    } else {
                                        return (
                                            <p style={styles}>
                                                <span>{`${name} `}</span>
                                                <span style={{
                                                    backgroundColor: "#eeeeee", 
                                                    borderRadius: "1vh", 
                                                    padding:"1vh",
                                                    color: "#666666"
                                                }}>{body}</span>
                                            </p>
                                        )
                                    }
                                })}
                            </TabPane>
                        )
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        let key = createChatBox(name, me)
                        setActiveKey(key)
                        startChat(me, name)
                        setModalVisible(false)
                    }}
                    onCancel={() => {
                        setModalVisible(false)
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
                            type: 'error',
                            msg: 'Please enter message',
                        })
                        return
                    } else if (activeKey === '') {
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox first',
                        })
                        return
                    }
                    let to = activeKey.split('_')[1]
                    sendMessage({ to: to, body: msg, from: me})
                    setMessageInput("")
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom