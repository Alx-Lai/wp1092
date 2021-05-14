import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    console.log(req.body);
    const {name, subject, score} = req.body;
    const scorecard = new ScoreCard({name, subject, score});
    //query if it exist
    await scorecard.save();
    res.status(200).send({card : scorecard, message : "create a new card, save it to DB"});
    
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

router.delete('/clear', async function(req, res){
  console.log("clear call");
  try{
    ScoreCard.deleteMany({}, ()=>{
      res.json({message: 'cleared'})
    })
  }catch (e){
    res.json({message: 'something went wrong...'})
  }
});


// TODO: delete the collection of the DB
// router.delete(...)


router.post('/query', async function(req, res) {
  const {queryType, queryString} = req.body;
  console.log(queryType, queryString);
  try{
    let result, rule, msg
    if(queryType === 'name'){
      rule = {'name' : queryString};
    }else if(queryType === 'subject'){
      rule = {'subject' : queryString};
    }
    //console.log('find')
    result = await ScoreCard.find(rule);
    /*console.log(result);
    console.log(result.length)
    console.log(result[0])
    console.log(typeof(result[0]))*/
    let processed = [];
    for(var i=0;i<result.length;i++){
      processed.push([result[i].name +" " +result[i].subject+ " " +result[i].score])
    }
    //console.log(processed)
    if(processed.length == 0){
      let str = "" + queryType + '(' + queryString + ')not found';
      res.json({message : str})
    }else{
      res.status(200).send({messages : processed, message: 'ok'});
    }
  }catch(e){
    res.json({message: 'something went wrong...'})
  }
});
// TODO: implement the DB query
// route.xx(xxxx)

export default router;
