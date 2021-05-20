import mongoose from 'mongoose'
// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
const Schema = mongoose.Schema;
const scoreCardSchema = new Schema({
    name: String,
    subject: String,
    score: Number
});
export default mongoose.model('ScoreCard', scoreCardSchema);
