const Subscription = {
  chatBox: {
    subscribe(parent, {name}, {db, pubsub}, info){
      const box = db.ChatBoxModel.findOne({name});
      if(!box){
        throw new Error("box Not Found");
      }
      //console.log(name)
      return pubsub.asyncIterator(`message ${name}`);
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
