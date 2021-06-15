const Mutation = {
    insertPeople(parent, args, {db}, info){
        try{
            let p = db.people
            for(var i=0;i<args.data.length;i++){
                p = p.filter((person)=>{
                    return person.ssn != args.data[i].ssn
                })
                p.push(args.data[i])
            }
            db.people = p;
            return true;
        }catch{
            return false;
        }
    }
}
export {Mutation as default}