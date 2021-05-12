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


router.get('/query', async function(req, res) {
  console.log(req);
  const {queryType, queryString} = req.body;
  try{
    if(queryType === 'name'){
      let result = await scorecard.findAll().paginate({name: queryString}).exec();
    }else if(queryType === 'subject'){
      let result = await scorecard.findAll().paginate({subject: queryString}).exec();
    }
    res.status(200).send(result);
  }catch(e){
    res.json({message: 'something went wrong...'})
  }
});
// TODO: implement the DB query
// route.xx(xxxx)

export default router;
