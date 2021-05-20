// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import mongoose from 'mongoose';

const ScoreCardSchema = new mongoose.Schema({
	name: String,
	subject: String,
	score: Number
});

export default mongoose.model('ScoreCard', ScoreCardSchema);