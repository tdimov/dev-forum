const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
  title: { type: String, require: '{PATH} is required', unique: true },
  text: { type: String, require: '{PATH} is required' },
  postedDate: { type: Date, require: '{PATH} is required', default: Date.now },
  edited: { type: Date, default: Date.now },
  viewed: { type: Number, require: '{PATH} is required', default: 0 },
  lastActiveDate: {
    type: Date,
    require: '{PATH} is required',
    default: Date.now
  },
  rating: { type: Number, require: '{PATH} is required', default: 0 },
  votes: [{ type: mongooseSchema.Types.ObjectId, ref: 'Vote' }],
  answersCount: { type: Number, require: '{PATH} is required', default: 0 },
  author: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'User',
    require: '{PATH} is required'
  },
  tags: [{ type: mongooseSchema.Types.ObjectId, ref: 'Tag' }],
  answers: [{ type: mongooseSchema.Types.ObjectId, ref: 'Answer' }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
