const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const questionsTagsSchema = new mongoose.Schema({
  questionId: mongooseSchema.ObjectId,
  tagId: mongooseSchema.ObjectId
});

mongoose.model('QuestionsTags', questionsTagsSchema);
