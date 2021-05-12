import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ScoreCardSchema = new Schema({
  name:{
    type : String,
    required : [true, 'name field required']
  },
  subject :{
    type : String,
    required : [true, 'subject field required']
  },
  score:{
    type : Number,
    required : [true, 'score field required']
  }
})

const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);

export default ScoreCard;
// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
