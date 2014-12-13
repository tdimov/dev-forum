var mongoose = require('mongoose'),
    mongooseSchema = mongoose.Schema;

var questionsTagsSchema = new mongoose.Schema({
    questionId: mongooseSchema.ObjectId,
    tagId: mongooseSchema.ObjectId
});

var QuestionsTags = mongoose.model('QuestionsTags', questionsTagsSchema);