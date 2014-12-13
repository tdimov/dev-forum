var mongoose = require('mongoose'),
    mongooseSchema = mongoose.Schema;

var answerSchema = new mongoose.Schema({
    text: {type: String, require: '{PATH} is required'},
    postedDate: {type: Date, require: '{PATH} is required', default: Date.now},
    editedDate: {type: Date, require: '{PATH} is required'},
    rating: {type: Number, require: '{PATH} is required', default: 0},
    votes: [{type: mongooseSchema.Types.ObjectId, ref: 'Vote'}],
    comments: [{type: mongooseSchema.Types.ObjectId, ref: 'Comment'}],
    user: {type: mongooseSchema.ObjectId, ref: 'User', require: '{PATH} is required'}
});

var Answer = mongoose.model('Answer', answerSchema);