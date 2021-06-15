const Person = {
    location(parent, args, {db}, info){
        return db.locations.filter((location)=>{
            return location == parent.location
        })
    }
}
export { Person as default }