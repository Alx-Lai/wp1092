import uuidv4 from 'uuid/v4';
const Mutation = {
  async createChatBox(parent, {name1, name2}, {db}, info){
    console.log("createChatBox called");
    const validateUser = async (db, name) => {
      const existing = await db.UserModel.findOne({ name });
      if (existing) return existing;
      let u = new UserModel({ name });
      u.save();
      return u;
    };
    if(!name1 || !name2){
      throw new Error("Missing chatBox name for CreateChatBox");
    }
    let u1 = await validateUser(db, name1);
    let u2 = await validateUser(db, name2);

    let name = [name1, name2].sort().join('_')
    let box = await db.ChatBoxModel.findOne({ name });
    if(!box){  
      box = new db.ChatBoxModel({
        id: uuidv4(),
        name:name,
        messages:[],
      });
      box.save();
    }
    return box
          .populate('users')
          .populate({ path: 'messages', populate: 'sender' })
          .execPopulate();
  },
  async createMessage(parent, {name1, name2, body}, {db, pubsub}, info){
    let name = [name1, name2].sort().join('_')
    let box = await db.ChatBoxModel.findOne({name});
    let sender = await db.UserModel.findOne({name: name1})
    const id = uuidv4()
    let newMessage = await new db.MessageModel({
      id: id,
      sender: sender,
      body: body,
    }).save()
    await box.messages.push(newMessage)
    await box.save();
    /*
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment,
      },
    });
    */
    await pubsub.publish(`message ${name}`, {
      chatBox:{
        id: id,
        sender:sender,
        body: body
      }
    })
    return newMessage;
  }
};

export { Mutation as default };
