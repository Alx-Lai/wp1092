import express from 'express'
import getNumber from '../core/getNumber'

const router = express.Router()

var fs = require('fs')
function get_time_str(mode){
    var uptime = new Date();
    var uptime_str = ''
    if(mode > 0){
        uptime_str += uptime.getFullYear();    
    }
    if(mode > 1){
        uptime_str += '-'+(uptime.getMonth()+1);
    }
    if(mode > 2){
        uptime_str += '-'+uptime.getDate();    
    }
    if(mode > 3){
        uptime_str += '-'+uptime.getHours();
    }
    if(mode > 4){
        uptime_str += '-'+uptime.getMinutes();    
    }
    if(mode > 5){
        uptime_str += '-' + uptime.getSeconds()
    }
    return uptime_str;
    
}
var uptime_str = get_time_str(5);
var file_path = './server/log/' + uptime_str+ '.log';
var str;
console.log('start at ' + uptime_str);
fs.open(file_path,'w', (err)=>{
    if(err) throw err;
});

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
    var num = getNumber(true)
    
    str = 'start number = ' + num + ' ' + get_time_str(6) + '\n';
    fs.appendFile(file_path,str, (err)=>{
        if(err) throw err;
    });
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
      str = 'guess ' + guessed + ' ' +get_time_str(6) + '\n';
        fs.appendFile(file_path,str, (err)=>{
            if(err) throw err;
        });
      if(number > guessed){
          //response
          
          res.status(200).send({msg : "Bigger"});
      }else if(number < guessed){
          
          res.status(200).send({msg : "Smaller"});
      }else{
          res.status(200).send({msg : "Equal"});
            fs.appendFile(file_path,'end-game \n', (err)=>{
                if(err) throw err;
            });
      }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  var num = getNumber(true)
    var str = 'restart number = ' + num + ' ' + get_time_str(6)+ '\n';
        fs.appendFile(file_path,str, (err)=>{
        if(err) throw err;
    });
  res.json({ msg: 'The game has started.' })
})
export default router
