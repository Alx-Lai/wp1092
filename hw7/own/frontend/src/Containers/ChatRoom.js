import "../App.css";
import { useState, useEffect } from "react";
import useChatBox from '../hooks/useChatBox'
import { Tabs, Input, Tag} from "antd";
import ChatModal from '../Components/ChatModal'
import useChat from '../hooks/useChat'

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus}) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey,  setActiveKey] = useState('')
  const {chatBoxes, setChatBoxes,createChatBox, removeChatBox} = useChatBox()
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () =>{ setModalVisible(true)}
  const {response,setResponse,sendMessage, getChat} = useChat();
  useEffect(()=>{
    if(activeKey !== '' && response !== undefined){
      let newChatBoxes = chatBoxes;
      let target = newChatBoxes.filter(({key}) => key == activeKey)[0]
      if(response.length > 1){
        response.map((msg)=> {target.chatLog.push(msg);})
      }else{
        target.chatLog.push(response);
      }
      setChatBoxes(newChatBoxes)
      console.log(newChatBoxes)
      setResponse(undefined);
    }
  }, [response])
  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs type="editable-card" 
            activeKey={activeKey}
            onChange={(key)=> {
              setActiveKey(key)
              getChat(key)
            }}
            onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action == 'remove'){
              setActiveKey(removeChatBox(targetKey, activeKey))
            }
          }}>
          
          {chatBoxes.map((
            { friend, key, chatLog }) => {
               return (
              <TabPane tab={friend} 
                key={key} closable={true}>
                {chatLog.map(({name, body}, i)=>{
                  if(name == me){
                    return(
                      <p className="App-message" key={i} align="right">
                        {body}<Tag color="blue">{name}</Tag>
                      </p>
                    )
                  }else{
                    return(
                      <p className="App-message" key={i}>
                        <Tag color="blue">{name}</Tag>{body}
                      </p>
                    )
                  }
              })}
              </TabPane>
          );})}
       </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            const key = createChatBox(name, me);
            setActiveKey(key);
            getChat(key);
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
        placeholder=
          "Enter message here..."
        onSearch={(msg) => {
          if(!msg){
            displayStatus({type: 'error', msg: 'Please enter message.'})
            return;
          }else if(activeKey === ''){
            displayStatus({type: 'error', msg: 'Please choose a ChatBox.'})
            return;
          }
          sendMessage({key: activeKey, body: msg })
          /*let sender = activeKey.split('_')[0]
          let newChatBoxes = chatBoxes;
          newChatBoxes.filter(({key}) => key == activeKey)[0].chatLog.push({name: sender, body: msg });
          setChatBoxes(newChatBoxes);*/
          setMessageInput("");
        }}
      ></Input.Search> 
  </>);
};
export default ChatRoom;
