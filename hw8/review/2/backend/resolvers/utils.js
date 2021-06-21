import { UserModel, ChatBoxModel, MessageModel } from "./models.js";

const validateUser = async (name) => {
  const existing = await UserModel.findOne({ name });
  if (existing) return existing;
  return new UserModel({ name }).save();
};

const validateChatBox = async (name, participants) => {
  let box = await ChatBoxModel.findOne({ name });
  if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
  return box
    .populate("users")
    .populate({ path: "messages", populate: "sender" })
    .execPopulate();
};

const makeName = (name, to) => {
  return [name, to].sort().join("_");
};

export { validateUser, validateChatBox, makeName };
