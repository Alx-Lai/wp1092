import { useState } from "react";  
const client = new WebSocket('ws://localhost:8080');


const useChat = (sendData) => {
  const [status, setStatus] = useState({}); // { type, msg }
  
  const sendMessage = async(payload) => {
    console.log(payload);
    const {me, key, body} = payload;

    let to = key.split("_")
    if (to[0] === me) to = to[1];
    else to = to[0]

    console.log("me= "+me)
    console.log("to= "+to)
    console.log("body= "+body)
    await sendData({type:"MESSAGE", data:{name:me, to:to, body:body }})
  }; // { key, msg }
  return { status, sendMessage };
};
export default useChat;
