const chatBox = {
  messages: ({ messages }, args, context, info) => {
    return messages;
  },
  name: ({ name }, args, context, info) => name,
};
export default chatBox;
