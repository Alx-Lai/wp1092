import express from 'express'
import getNumber from '../core/getNumber'
import { filePath } from '../server'
import moment from 'moment'

const router = express.Router()
const fs = require("fs")

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number = getNumber(true)

  // write the log: start
  const currTime = moment().format('YYYY-MM-DD-HH-mm-ss');
  fs.appendFile(filePath, `start number=${number} ${currTime}\n`, function (err) {
    if (err)
      console.log("Write Error")
    console.log(`start number=${number} ${currTime}`)
  });

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // write the log: guess
  const currTime = moment().format('YYYY-MM-DD-HH-mm-ss');
  fs.appendFile(filePath, `guess ${guessed} ${currTime}\n`, function (err) {
    if (err)
      console.log("Write Error")
    console.log(`guess ${guessed} ${currTime}`)
  });

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
    // check if number and guessed are the same,
    // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed < number)
      res.status(200).send({ msg: "Bigger" });
    else if (guessed > number)
      res.status(200).send({ msg: "Smaller" });
    else {
      // write the log: end-game
      const currTime = moment().format('YYYY-MM-DD-HH-mm-ss');
      fs.appendFile(filePath, "end-game\n", function (err) {
        if (err)
          console.log("Write Error")
        console.log("end-game")
      });
      res.status(200).send({ msg: "Equal" });
    }
  }
})

// add router.post('/restart',...)
router.post('/restart', (_, res) => {
  const number = getNumber(true)

  // write the log: restart
  const currTime = moment().format('YYYY-MM-DD-HH-mm-ss')
  fs.appendFile(filePath, `restart number=${number} ${currTime}\n`, function (err) {
    if (err)
      console.log("Write Error")
    console.log(`restart number=${number} ${currTime}`)
  });

  res.json({ msg: 'The game has restarted.' })
})

export default router
