const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const answerVoteSchema = new mongoose.Schema({
  userId: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'User',
    require: '{PATH} is required'
  },
  answerId: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'Answer',
    require: '{PATH} is required'
  },
  score: { type: String, require: '{PATH} is required' }
});

mongoose.model('AnswerVote', answerVoteSchema);
