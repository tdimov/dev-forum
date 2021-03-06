const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  text: { type: String, require: '{PATH} is required' },
  postedDate: { type: Date, require: '{PATH} is required', default: Date.now },
  author: {
    _id: {
      type: mongooseSchema.Types.ObjectId,
      ref: 'User',
      require: '{PATH} is required'
    },
    username: { type: String, require: '{PATH} is required' }
  },
  answerId: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'Answer',
    require: '{PATH} is required'
  }
});

mongoose.model('Comment', commentSchema);
