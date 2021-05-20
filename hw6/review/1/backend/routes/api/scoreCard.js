import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard.js';

const router = Router();

router.post('/create-card', async function (req, res) {
	const name = req.body.name;
	const subject = req.body.subject;
	const score = req.body.score;
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
	const existing = await ScoreCard.findOne({name, subject});
	if(existing){
		const card = await ScoreCard.findOneAndUpdate({name: name, subject: subject}, {score: score});
		res.json({ card: card, message: `Updating (${name}, ${subject}, ${score})` });
	}
	else{
		const newScoreCard = new ScoreCard({name, subject, score});
		await newScoreCard.save();
		res.json({ card: newScoreCard, message: `Adding (${name}, ${subject}, ${score})` });
	}
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/deleteDB', async function (req, res) {
	try {
		await ScoreCard.deleteMany({});
		res.json({ message: 'Database cleared' });
	} catch (e) {
		res.json({ message: 'Database deletion failed' });
	}
});
// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query', async function (req, res) {
	const queryType = req.query.queryType;
	const queryString = req.query.queryString;
	try {
		let results;
		if(queryType === 'Name'){
			results = await ScoreCard.find({name: queryString});
		}
		else{
			results = await ScoreCard.find({subject: queryString});
		}
		// console.log(results);
		if(results.length === 0){
			res.json({message: `${queryType} (${queryString}) not found!`});
		}
		else{
			res.json({ messages: results.map(r => `${r.name}, ${r.subject}, ${r.score}`) });
		}
	} catch (e) {
		res.json({ message: 'Something went wrong...' });
	}
});
export default router;
