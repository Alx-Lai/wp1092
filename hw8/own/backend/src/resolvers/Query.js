const Query = {
  async chatboxes(parent, {name}, {db}, info){
    if(!name){
      return db.ChatBoxModel.find();
    }
    let box = await db.ChatBoxModel.findOne({name})
    //console.log(box)  
    return box
          .populate('users')
          .populate({ path: 'messages', populate: 'sender' })
          .execPopulate();
  },
};

export { Query as default };
