var mongoose = require('mongoose'),
    mongooseSchema = mongoose.Schema;

var tagSchema = new mongoose.Schema({
    name: {type: String, require: '{PATH} is required', unique: true},
    description: {type: String},
    questions: [{type: mongooseSchema.Types.ObjectId, ref: 'Question'}]
});

var Tag = mongoose.model('Tag', tagSchema);