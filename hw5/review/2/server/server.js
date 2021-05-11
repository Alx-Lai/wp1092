import express from 'express'
import cors from 'cors'
import path from 'path'

import guessRoute from './routes/guess'

import moment from 'moment';

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

console.log("server is on");

// create a log directory if it doesn't exist
const fs = require("fs");
const dir = "./server/log";

if (!fs.existsSync(dir)) {
  try {
    fs.mkdirSync(dir);
    console.log("Make Directory Success");
  }
  catch {
    console.log("Make Directory Error");
  }
}

// create a log file
const currTime = moment().format('YYYY-MM-DD-HH-mm-ss');
fs.writeFile(`./server/log/${currTime}.log`, '', function (err) {
  if (err)
    console.log("Make File Error");
  else
    console.log("Make File Success");
});

export const filePath = `./server/log/${currTime}.log`;