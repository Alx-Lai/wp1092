import { useState, useEffect } from "react";

const LOCALSTORAGE_KEY = "save-Chatbox";

const useChatBox = () => {
  const savedChatBox = localStorage.getItem(LOCALSTORAGE_KEY);
  const [chatBoxes, setChatBoxes] = useState(JSON.parse(savedChatBox) || []);

  useEffect(() => {
    if (chatBoxes) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(chatBoxes));
    }
  }, [chatBoxes]);

  const createChatBox = (friend, me) => {
    const newKey = me <= friend ?
          `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    const chatLog = [];
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);
    return newKey;
  };

  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) { lastIndex = i - 1; }});
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else { newActiveKey = newChatBoxes[0].key; }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    return newActiveKey;
  };

  return { createChatBox, removeChatBox, chatBoxes };
};
export default useChatBox;