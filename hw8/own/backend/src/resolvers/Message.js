const Message = {
    sender(parent, args, {db}, info){
        return db.UserModel.findById(parent.sender);
    },
    body(parent, args, {db}, info){
        return parent.body;
    }
};
export default Message;