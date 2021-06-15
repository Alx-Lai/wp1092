const Query = {
    statsCount(parent, args, {db}, info){
        try{
            var p1;
            if(!args.severity){
                p1 = db.people
            }else{
                p1 = db.people.filter((person)=>{
                    return person.severity >= args.severity
                })
            }
            //console.log(args)
            //console.log(p1)
            //console.log(args.locationKeywords)
            let ret = []
            for(var i=0;i<args.locationKeywords.length;i++){
                let p2 = p1.filter((person)=>{
                    return person.location.description.includes(args.locationKeywords[i])
                })
                ret.push(p2.length)
            }
            console.log(ret)
            return ret
        }catch(e){
            console.log(e)
            return null
        }
    }
}
export {Query as default}