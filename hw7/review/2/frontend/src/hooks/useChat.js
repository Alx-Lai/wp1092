import { useState } from "react"; 

const client = new WebSocket('ws://localhost:4000');

const useChat = () => {
  const [messages, setMessages] = useState([]);
  
  client.onmessage = (byteString) => {
    const {type, data} = JSON.parse(byteString.data);
    
    switch (type) {
      case "CHAT": {
        setMessages(() => data.messages);
        break;
      }
      case "MESSAGE": {
        const payload = [];
        payload.push(data.message);
        setMessages(() => [...messages, ...payload]); 
        break;
      }
      default: break;
    }
  }

  const clearMessages = () => {
    setMessages([]);
  }

  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
  };

  const sendMessage = (payload, name, body) => {
    const member = payload.split("_")
    let to = ``;

    for(let i = 0; i < member.length; i++) {
      if(member[i] !== name) {
        to = member[i];
      }
    }

    if(to === ''){
      to = name;
    }

    sendData({type: "MESSAGE", data: { name: name, to: to, body: body} });
  }; 

  const sendChatBox = (payload, name) => {
    const member = payload.split("_")
    let to = ``;

    for(let i = 0; i < member.length; i++) {
      if(member[i] !== name) {
        to = member[i];
      }
    }

    if(to === ''){
      to = name;
    }

    sendData({type: "CHAT", data: { name: name, to: to } });
  }

  return { messages, sendMessage, sendChatBox, clearMessages };
};

export default useChat;