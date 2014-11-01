var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    name: {type: String, require: '{PATH} is required', unique: true},
    description: {type: String, require: '{PATH} is required'}
});

var Tag = mongoose.model('Tag', tagSchema);