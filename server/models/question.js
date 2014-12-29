var mongoose = require('mongoose'),
    mongooseSchema = mongoose.Schema;

var questionSchema = new mongoose.Schema({
    title: {type: String, require: '{PATH} is required', unique: true},
    text: {type: String, require: '{PATH} is required'},
    postedDate: {type: Date, require: '{PATH} is required', default: Date.now},
    edited: {type: Date, default: Date.now},
    isAnswered: {type: Boolean, default: false},
    viewed: {type: Number, require: '{PATH} is required', default: 0},
    lastActiveDate: {type: Date, require: '{PATH} is required', default: Date.now},
    rating: {type: Number, require: '{PATH} is required', default: 0},
    votes: [{type: mongooseSchema.Types.ObjectId, ref: 'Vote'}],
    answersCount: {type: Number, require: '{PATH} is required', default: 0},
    author: {
        _id: {type: mongooseSchema.Types.ObjectId, ref: 'User', require: '{PATH} is required'},
        username: {type: String, require: '{PATH} is required'}
    },
    tags: [{type: String, ref: 'Tag'}]
});

var Question = mongoose.model('Question', questionSchema);