const Query = {
  chatboxes(parent, {name}, {db}, info){
    if(!name){
      return db.ChatBoxModel.find();
    }
    let chatbx = db.ChatBoxModel.findOne({'name': name})
    return chatbx;
  },
};

export { Query as default };
