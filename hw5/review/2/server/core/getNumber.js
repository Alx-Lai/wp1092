import { filePath } from '../server'
const fs = require("fs")

let number

const getNumber = (forceRestart = false) => {
  // generate a random number if number is undefined or forceRestart is true
  if (number === undefined || forceRestart) {
    number = Math.floor(Math.random() * 100) + 1;

    // write the log
    fs.appendFile(filePath, `new target number=${number}\n`, function (err) {
      if (err)
        console.log("Write Error")
      console.log(`new target number=${number}`);
    });
  }
  return number
}

export default getNumber
