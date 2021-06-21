const message = {
  sender: ({ sender }, args, context, info) => {
    return sender.name;
  },
  body: ({ body }, args, context, info) => body,
};
export default message;
