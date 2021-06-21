import { useState, useEffect } from 'react'

const server = new WebSocket('ws://localhost:8080');
server.onopen = () => console.log('Server connected.');
const useChat = () => {
    // WebSocket
    // nameDOM 是自己，toDOM 是想傳給誰，inputDOM 是訊息
    // let messages = []
    const [messages, setMessages] = useState([])

    server.onmessage = (m) => {
        onEvent(JSON.parse(m.data));
    };
    server.sendEvent = (e) => server.send(JSON.stringify(e))

    const startChat = (from, to) => {
        console.log(`${from} chat with ${to}`)
        server.sendEvent({
            type: 'CHAT',
            data: { to: to, name: from },
        })
    };

    const onEvent = (e) => {
        const { type } = e;
        switch (type) {
            case 'CHAT': {
                setMessages(e.data.messages)
                break
            }
            case 'MESSAGE': {
                let newMsg = [...messages]
                newMsg.push(e.data.message)
                setMessages(newMsg)
                break
            }
            default: {
                let newMsg = [...messages]
                newMsg.push(e.data.message)
                setMessages(newMsg)
                break
            }
        }
        // renderMessages()
    };


    const sendMessage = (payload) => {
        server.sendEvent({
            type: 'MESSAGE',
            data: {to: payload.to, name: payload.from, body: payload.body}
        });
    }
    return { messages, sendMessage, startChat }
}
export default useChat