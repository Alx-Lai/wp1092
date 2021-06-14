import "../App.css";
import { useState, useEffect } from "react";
import useChatBox from '../hooks/useChatBox'
import { Tabs, Input} from "antd";
import ChatModal from '../Components/ChatModal'
import ChatBox from "../Components/ChatBox";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Title from "../Components/Title";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, CHATBOX_SUBSCRIPTION } from "../graphql";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus}) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey,  setActiveKey] = useState('')
  const {chatBoxes, setChatBoxes,createChatBox, removeChatBox} = useChatBox()
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () =>{ setModalVisible(true)}
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const [response, setResponse] = useState(undefined)
  const {loading, error, data, subscribeToMore} = useQuery(CHATBOX_QUERY);

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
      //console.log(newChatBoxes)
      setResponse(undefined);
    }
  }, [response])

  useEffect(() => {
    //console.log('sub data?')
    if(activeKey !== ''){
      try {
        let testKey = activeKey.split("_").sort().join("_");
        //console.log(testKey)
        //console.log(activeKey)
        subscribeToMore({
          document: CHATBOX_SUBSCRIPTION,
          variables:{name : testKey},
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            //console.log('sub data')
            //console.log(activeKey)
            //console.log(subscriptionData.data)
            const newMessage = subscriptionData.data.chatBox;
            if(newMessage.sender.name != me){
              setResponse(newMessage)
            }
            //return newMessage;
          },
        });
      } catch (e) {
        console.log(e)
      }
    }
  }, [subscribeToMore, activeKey]);
  /*useEffect(() => {
    console.log('sub data?')
    try {
      subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables:{name : activeKey},
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log('sub data')
          console.log(subscriptionData.data)
          const newMessage = subscriptionData.data.message.data;

          return {
            ...prev,
            messages: [newMessage, ...prev.messages],
          };
        },
      });
    } catch (e) {
      console.log(e)
    }
  });
  */
  return (
    <> 
      <Title me={me}/>
      <div className="App-messages">
        <Tabs type="editable-card" 
            activeKey={activeKey}
            onChange={async (key)=> {
              setActiveKey(key)
              let [name1, name2] = key.split('_')
              console.log('startChat')
              const res = await startChat({
                variables:{
                  name1: name1,
                  name2: name2,
                },
              })
              const messages = res.data.createChatBox.messages
              //getChat(key)
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
                <ChatBox chatLog={chatLog} me={me}/>
              </TabPane>
          );})}
       </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={async({ name }) => {
            console.log('startChat')
            const res = await startChat({
              variables:{
                name1: me,
                name2: name,
              },
            });
            const messages = res.data.createChatBox.messages
            const key = createChatBox(name, me, messages);
            setActiveKey(key);
            //getChat(key);*/
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
        onSearch={async (msg) => {
          if(!msg){
            displayStatus({type: 'error', msg: 'Please enter message.'})
            return;
          }else if(activeKey === ''){
            displayStatus({type: 'error', msg: 'Please choose a ChatBox.'})
            return;
          }
          const name2 = activeKey.split('_')[1]
          //console.log(name2)
          //console.log(msg)
          const res = await sendMessage({
            variables:{
              name1: me,
              name2: name2,
              body: msg
            }
          })
          //console.log(res)
          setResponse({sender:res.data.createMessage.sender,body:res.data.createMessage.body})
          setMessageInput("");
        }}
      ></Input.Search> 
  </>);
};
export default ChatRoom;
