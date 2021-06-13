const Subscription = {
  message: {
    subscribe(parent, {ChatboxId}, {db, pubsub}, info){
      const chatbx = db.ChatBoxModel.find((chatBox)=>{
        chatBox.id === ChatboxId;
      });
      if(!chatbx){
        throw new Error("box Not Found");
      }
      return pubsub.asyncIterator(`message ${ChatboxId}`);
    }
  },
};

export { Subscription as default };
/*
comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(
        (post) => post.id === postId && post.published,
      );

      if (!post) {
        throw new Error('Post not found');
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  }
*/
