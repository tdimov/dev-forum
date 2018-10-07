const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
  text: { type: String, require: '{PATH} is required' },
  postedDate: { type: Date, require: '{PATH} is required', default: Date.now },
  editedDate: { type: Date, require: '{PATH} is required' },
  rating: { type: Number, require: '{PATH} is required', default: 0 },
  votes: [{ type: mongooseSchema.Types.ObjectId, ref: 'Vote' }],
  author: {
    _id: {
      type: mongooseSchema.Types.ObjectId,
      ref: 'User',
      require: '{PATH} is required'
    },
    username: { type: String, require: '{PATH} is required' }
  },
  comments: [{ type: mongooseSchema.Types.ObjectId, ref: 'Comment' }],
  questionId: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'Question',
    require: '{PATH} is required'
  }
});

mongoose.model('Answer', answerSchema);
