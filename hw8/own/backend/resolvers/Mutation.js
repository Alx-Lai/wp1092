const Mutation = {
    async createChatBox(parent, {name1, name2}, {db, pubsub}, info){
        if(!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        if(!(await checkUser(db, name1, "createChatBox"))){
            console.log("User doesn't exist for CreateChatBox" + name1);
            await newUser(db, name1);
        }
    }
}