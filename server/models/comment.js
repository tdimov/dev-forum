var mongoose = require("mongoose"),
    mongooseSchema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    text: {type: String, require: '{PATH} is required'},
    postedDate: {type: Date, require: '{PATH} is required', default: Date.now},
    author: {type: mongooseSchema.Types.ObjectId, ref: 'User', require: '{PATH} is required'}
});

var Comment = mongoose.model('Comment', commentSchema);