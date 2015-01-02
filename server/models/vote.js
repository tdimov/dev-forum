var mongoose = require('mongoose'),
    mongooseSchema = mongoose.Schema;

var voteSchema = new mongoose.Schema({
    userId: {type: mongooseSchema.Types.ObjectId, ref: 'User', require: '{PATH} is required'},
    score: {type: String, require: '{PATH} is required'}
});

var Vote = mongoose.model('Vote', voteSchema);