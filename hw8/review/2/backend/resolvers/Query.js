import { makeName, validateUser, validateChatBox } from "./utils.js";
export default {
  messages: async (parent, { name }, context, info) => {
    if (name) {
      const users = name.split("_");
      const sender = await validateUser(users[0]);
      const receiver = await validateUser(users[1]);
      const chatBox = await validateChatBox(name, [sender, receiver]);
      const { messages } = chatBox;
      return messages;
    }
    return [];
  },
};
