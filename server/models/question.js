var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    title: {type: String, require: '{PATH} is required', unique: true},
    text: {type: String, require: '{PATH} is required'},
    postedDate: {type: Date, require: '{PATH} is required', default: Date.now},
    edited: {type: Date},
    isAnswered: {type: Boolean, default: false},
    viewed: {type: Number, require: '{PATH} is required'},
    lastActiveDate: {type: Date, require: '{PATH} is required'},
    rating: {type: Number, require: '{PATH} is required', default: 0},
    votedBy: [ObjectId],
    userId: {type: ObjectId, require: '{PATH} is required'},
    tags: [ObjectId]
});

var Question = mongoose.model('Question', questionSchema);