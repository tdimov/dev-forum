var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    text: {type: String, require: '{PATH} is required'},
    postedDate: {type: Date, require: '{PATH} is required', default: Date.now},
    editedDate: {type: Date, require: '{PATH} is required'},
    rating: {type: Number, require: '{PATH} is required', default: 0},
    votedBy: [ObjectId],
    questionId: {type: ObjectId, require: '{PATH} is required'},
    userId: {type: ObjectId, require: '{PATH} is required'}
});

var Answer = mongoose.model('Answer', answerSchema);