import { ChatBoxModel } from "./models.js";

const Subscription = {
  message: {
    subscribe: async (parent, { name }, { pubsub }, info) => {
      let box = await ChatBoxModel.findOne({ name });

      if (!box) {
        throw new Error("Chatbox not found!");
      }
      return pubsub.asyncIterator(`chatBox_${name}`);
    },
  },
};
export default Subscription;
