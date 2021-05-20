import cors from 'cors';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; 

import ScoreCard from './models/ScoreCard.js';
import scoreCardRoute from './routes/api/scoreCard.js';

dotenv.config();
mongoose.connect(
	process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(res => console.log("mongo db connection created"));

const db = mongoose.connection;
db.on('error', (err) => console.log(err));

const app = express();
app.use(bodyParser.json())
// init middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  return next();
})

app.use('/api', scoreCardRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
})