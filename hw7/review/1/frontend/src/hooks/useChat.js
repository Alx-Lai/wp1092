import { message } from "antd";
import { useState } from "react";
const client = new WebSocket("ws://localhost:8080");

const useChat = () => {
  const [status, setStatus] = useState({});
  const [messages, setMessages] = useState([]);

  // const nameDOM = document.getElementById("name");
  // const toDOM = document.getElementById("to");
  // const messagesDOM = document.getElementById("messages");
  // const inputDOM = document.getElementById("input");

  // const sendData = async (data) => {
  //   await client.send(JSON.stringify(data));
  // };

  // Client
  client.onopen = () => console.log("Client connected.");
  client.onmessage = (m) => {
    onEvent(JSON.parse(m.data));
  };
  client.sendEvent = (e) => client.send(JSON.stringify(e));

  const startChat = (datas) => {
    console.log(datas);
    client.sendEvent({
      type: "CHAT",
      // data: { to: key.split("_")[0], name: key.split("_")[1] },
      data: { to: datas.friend, name: datas.me },
    });
  };

  const sendMessage = (payload) => {
    // if (!inputDOM.value || !nameDOM.value || !toDOM.value) {
    //   throw new Error("Empty input!");
    // }
    client.sendEvent({
      type: "MESSAGE",
      data: payload,
    });
  };

  // const renderMessages = () => {
  //   resetMessages();

  //   messages.forEach(({ body, name }) => {
  //     const newEle = document.createElement("li");
  //     newEle.innerHTML = `${name}: ${body}`;
  //     messagesDOM.appendChild(newEle);
  //   });
  // };

  // const resetMessages = () => {
  //   remove all children
  //   messagesDOM.innerHTML = "";
  // };

  const onEvent = (e) => {
    const { type } = e;

    switch (type) {
      case "CHAT": {
        setMessages(e.data.messages);
        break;
      }
      case "MESSAGE": {
        setMessages([...messages, e.data.message]);
        console.log(messages);
        break;
      }
      default:
    }

    // renderMessages();
  };

  return { status, sendMessage, messages, startChat };
};

export default useChat;
