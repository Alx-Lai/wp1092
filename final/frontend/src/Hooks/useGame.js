import { useState } from "react";
const client = new WebSocket('ws://localhost:8080');

const useGame = () =>{
    
    const [status, setStatus] = useState({});
    client.onmessage = (message)=>{
        let {data} = message;
        data = JSON.parse(data);
        setStatus(data);
        // console.log(data);
    }

    const sendData = async (data)=>{
        client.send(JSON.stringify(await data));
    }
    const joinRoom = (me) => {
        const data = {type: "JOIN", data:me};
        sendData(data);
        
    };

    const confirmRoundStart = () => {
        const data = {type: "START", data:{}};
        sendData(data); 
    };

    const guessWord = (word, me) => {
        const data = {type: "GUESS", data:{sender: me, body: word}};
        sendData(data); 
    };

    return {joinRoom, status, confirmRoundStart, guessWord};
}

export default useGame;