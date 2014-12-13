var mongoose = require('mongoose'),
    mongooseSchema = mongoose.Schema;

var voteSchema = new mongoose.Schema({
    user: {type: mongooseSchema.Types.ObjectId, ref: 'User', require: '{PATH} is required'},
    score: {type: String, require: '{PATH} is required'},
    itemId: mongooseSchema.Types.ObjectId
});

var Vote = mongoose.model('Vote', voteSchema);