import { useState } from "react";

const client = new WebSocket('ws://localhost:8080');

const useChat = () => {
    const [response, setResponse] = useState([]);
    client.onmessage = (message)=>{
      let data = JSON.parse(message.data)
      console.log(data);
      onEvent(data)
      
    }
    const onEvent = (e)=>{
      const { type } = e;
      switch (type) {
        case 'CHAT': {
          if(e.data.messages !== undefined){
            setResponse(e.data.messages);
          }
          break;
        }
        case 'MESSAGE': {
          setResponse(e.data.message);
          break;
        }
      }
    }
    const sendData = (data)=>{
        client.send(JSON.stringify(data));
    }
    const sendMessage = (payload) => {
      console.log('payload')
      console.log(payload)
      const keys = payload.key.split("_");
      const data = {type: "MESSAGE", data:{name: keys[0], to: keys[1], body: payload.body}};
      sendData(data);
    }; // { key, msg }

    const getChat = async(payload) => {
        const keys = payload.split("_");
        const data = {type: "CHAT", data:{name: keys[0], to: keys[1]}};
        await sendData(data);
        
    }; // { key, msg }
    
    return {response,setResponse,sendMessage, getChat};
};

export default useChat;