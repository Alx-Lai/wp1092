import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();
const relMap = { '': `$eq`, '=': `$eq`, '>': `$gt`, '>=': `$gte`, '<': `$lt`, '<=': `$lte`, '!=': `$ne` };
const opMap = { 'AND': `$and`, 'OR': `$or` };

function getParam(data) {
  let param = {}
  let message = '';
  if(data.queryType2 === '' || data.queryString2 === '' || data.operation === ''){
    if (data.queryType.toLowerCase() === 'score') {
      let query_rel = {};
      query_rel[relMap[data.comp]] = Number(data.queryString.trim());
      param[data.queryType.toLowerCase()] = query_rel;
    }
    else {
      param[data.queryType.toLowerCase()] = data.queryString.trim();
    }
    message = data.queryType.toLowerCase() === 'score' ? `${data.queryType} ${data.comp} (${Number(data.queryString.trim())})` : `${data.queryType} (${(data.queryString.trim())})`;
  }
  else {
    let cond1 = {};
    if (data.queryType.toLowerCase() === 'score') {
      let query_rel = {};
      query_rel[relMap[data.comp]] = Number(data.queryString.trim());
      cond1[data.queryType.toLowerCase()] = query_rel;
    }
    else {
      cond1[data.queryType.toLowerCase()] = data.queryString.trim();
    }
    let cond2 = {};
    if (data.queryType2.toLowerCase() === 'score') {
      let query_rel = {};
      query_rel[relMap[data.comp2]] = Number(data.queryString2.trim());
      cond2[data.queryType2.toLowerCase()] = query_rel;
    }
    else {
      cond2[data.queryType2.toLowerCase()] = data.queryString2.trim();
    }
    param[opMap[data.operation]] = [cond1, cond2];
    let msg1 = data.queryType.toLowerCase() === 'score' ? `${data.queryType} ${data.comp} (${Number(data.queryString.trim())})` : `${data.queryType} (${(data.queryString.trim())})`;
    let msg2 = data.queryType2.toLowerCase() === 'score' ? `${data.queryType2} ${data.comp2} (${Number(data.queryString2.trim())})` : `${data.queryType2} (${(data.queryString2.trim())})`;
    message = msg1 + '\xa0\xa0' + data.operation + '\xa0\xa0' + msg2;
  }
  return { param, message };
}

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    const data = req.body;
    let card;
    let message = '';
    const filter = { "name": data.name.trim(), "subject": data.subject.trim() };
    const exists = await ScoreCard.findOne(filter, function (err, doc) {
      if (err) throw err;
      if (doc) {
        card = doc;
      }
    });
    if (exists) {
      await ScoreCard.updateOne(filter, { "score": data.score });
      message = `Updating (${data.name.trim()}, ${data.subject.trim()}, ${data.score})`;
      res.send({ card, message });
    }
    else {
      card = new ScoreCard(data);
      await card.save()
      message = `Adding (${data.name.trim()}, ${data.subject.trim()}, ${data.score})`;
      res.send({ card, message });
    }

  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }

});

// TODO: delete the collection of the DB
router.delete('/delete-db', async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    res.send({ message: 'Database cleared' });
  } catch (e) {
    res.json({ message: 'Database deletion failed' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query-db', async function (req, res) {
  //console.log(req.body);
  const data = req.body;
  let queryType = data.queryType.trim().charAt(0).toUpperCase() + data.queryType.trim().slice(1);
  let queryType2 = data.queryType2.trim().charAt(0).toUpperCase() + data.queryType2.trim().slice(1);
  if (queryType === 'Score') {
    if (isNaN(Number(data.queryString.trim()))) {
      res.json({ message: `${queryType} (${data.queryString.trim()}) is not a valid number!` });
      return;
    }
  }
  else if(queryType2 === 'Score') {
    if (isNaN(Number(data.queryString2.trim()))) {
      res.json({ message: `${queryType2} (${data.queryString2.trim()}) is not a valid number!` });
      return;
    }
  }
  var param = getParam(data).param;
  //console.log(param);
  var msg = getParam(data).message;
  var query = ScoreCard.find(param);
  query.exec(function (err, doc) {
    if (err) {
      res.json({ message: 'Something went wrong...' });
    }
    var ms = [];
    var cnt = 0;
    let item = {};
    doc.forEach(element => {
      cnt++;
      item["id"] = cnt;
      item["Name"] = element.name;
      item["Subject"] = element.subject;
      item["Score"] = element.score;
      //console.log(item);
      ms.push(JSON.stringify(item));
    });
    if (ms.length > 0) {
      res.json({ messages: ms, message: `Query Result:\xa0\x10${msg}` });
    }
    else {
      //error
      res.json({ message: `${msg} not found!`});
    }
  })
  //console.log(ms);
  //res.json({ messages: ms, message: 'query'});
});

export default router;
