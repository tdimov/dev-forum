const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const voteSchema = new mongoose.Schema({
  userId: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'User',
    require: '{PATH} is required'
  },
  questionId: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'Question',
    require: '{PATH} is required'
  },
  score: { type: String, require: '{PATH} is required' }
});

mongoose.model('Vote', voteSchema);
