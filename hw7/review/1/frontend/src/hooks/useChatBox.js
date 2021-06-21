import { useState } from "react"; 
// const client = new WebSocket('ws://localhost:8080');
const client = new WebSocket('ws://localhost:8080');

const useChatBox = (sendData) => {
    const [chatBoxes, setChatBoxes] = useState([
        // { friend: "Mary", key: "MaryChatbox", 
        //     chatLog: [] },
        // { friend: "Peter", key: "PeterChatBox", 
        //     chatLog: [] }
    ]);

    const setChatlog = async(activeKey, chatLog) => {
        // console.log("activeKey= "+activeKey)
        // console.log("setChatlog= "+chatLog)

        const newChatBoxes = [...chatBoxes];
        const idx = newChatBoxes.findIndex((box) => box.key === activeKey)

        newChatBoxes[idx].chatLog = chatLog;
        await setChatBoxes(newChatBoxes);

        console.log(newChatBoxes[idx])
        return;
    }

    const pushChatlog = async(activeKey, chatLog) => {
        const newChatBoxes = [...chatBoxes];
        const idx = newChatBoxes.findIndex((box) => box.key === activeKey)

        newChatBoxes[idx].chatLog.push(chatLog);
        await setChatBoxes(newChatBoxes);

        console.log(newChatBoxes[idx])
        return;
    }


    const createChatBox = (friend ,me) => {
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          throw new Error(friend +
                          "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        let chatLog = [];

        sendData({type:'CHAT', data:{name: me, to: friend}})      
        
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        
        return (newKey); // add new tab 
    };
    
    const removeChatBox = (activeKey, targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
    
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) { lastIndex = i - 1; }});
    
        const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey);
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newChatBoxes[lastIndex].key;
                } 
                else { newActiveKey = newChatBoxes[0].key; }
          }
        } 
        else newActiveKey = ""; // No chatBox left
    
        setChatBoxes(newChatBoxes);
        return (newActiveKey);
      };

    return {chatBoxes, createChatBox, removeChatBox, setChatlog, pushChatlog };
};
export default useChatBox;
