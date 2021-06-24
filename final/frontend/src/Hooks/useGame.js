import { useState } from "react";
const client = new WebSocket('ws://localhost:8080');

const useGame = () =>{
    
    const [status, setStatus] = useState({});
    client.onmessage = (message)=>{
        let {data} = message;
        data = JSON.parse(data);
        setStatus(data);
        console.log(data);
    }

    const sendData = async (data)=>{
        client.send(JSON.stringify(await data));
    }
    const joinRoom = (me) => {
        const data = {type: "JOIN", data:me};
        sendData(data);
        
    };

    const confirmRoundStart = () => {
        console.log("send comfirm");
        const data = {type: "START", data:{}};
        sendData(data); 
    };

    return {joinRoom, status, confirmRoundStart};
}

export default useGame;