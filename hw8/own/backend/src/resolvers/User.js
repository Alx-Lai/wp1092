const User = {
    name(parent, args, {db}, info){
        console.log(parent)
        console.log(parent.name);
        return db.UserModel.findOne({'name': parent.name})
    },
}
export default User;