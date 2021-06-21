import { useState } from 'react'

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([
        // { friend: "Mary", key: "MaryChatbox", chatLog: [] },
        // { friend: "Peter", key: "PeterChatbox", chatLog: [] },
    ])
    const createChatBox = (friend, me, activeKey) => {
        // const newKey = me <= friend ? `${me}_${friend}`:`${friend}_${me}`
        const newKey = `${me}_${friend}`
        if (chatBoxes.some(({ key }) => key === newKey)) {
            throw new Error(friend + "'s chat box has already opened.")
        }
        const newChatBoxes = [...chatBoxes]
        const chatLog = []
        newChatBoxes.push({friend, key: newKey, chatLog})
        setChatBoxes(newChatBoxes)
        return newKey
        // setActiveKey(newKey)
    }

    const removeChatBox = (targetKey, activeKey) => {
        let newActiveKey = activeKey
        let lastIndex = 0
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) { lastIndex = i - 1}
        })
        const newChatBoxes = chatBoxes.filter(
            (chatBox) => chatBox.key !== targetKey
        )
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newChatBoxes[lastIndex].key
                } else {
                    newActiveKey = newChatBoxes[0].key
                }
            }
        } else {
            newActiveKey = ""
        }
        setChatBoxes(newChatBoxes)
        return newActiveKey
        // setActiveKey(newActiveKey)
    }
    return { chatBoxes, createChatBox, removeChatBox }
}

export default useChatBox