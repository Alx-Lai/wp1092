import { ChatBoxModel, MessageModel } from "./models.js";
import { validateUser } from "./utils.js";
const Mutation = {
  sendMessage: async (
    parent,
    { data: { name, sender, body } },
    { pubsub },
    info
  ) => {
    sender = await validateUser(sender);
    const chatBox = await ChatBoxModel.findOne({ name });
    const newMessage = new MessageModel({ sender, body });
    await newMessage.save();
    chatBox.messages.push(newMessage);
    await chatBox.save();
    pubsub.publish(`chatBox_${name}`, {
      message: newMessage,
    });
    const uncodeBox = await chatBox
      .populate("users")
      .populate({ path: "messages", populate: "sender" })
      .execPopulate();
    const { messages } = uncodeBox;
    return messages;
  },
};
export default Mutation;
