var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: {type: String, require: '{PATH} is required'},
    postedDate: {type: Date, require: '{PATH} is required', default: Date.now},
    answerId: {type: ObjectId, require: '{PATH} is required'},
    userId: {type: ObjectId, require: '{PATH} is required'}
});

var Comment = nmongoose.model('Comment', commentSchema);