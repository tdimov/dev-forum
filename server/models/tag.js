const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const tagSchema = new mongoose.Schema({
  name: { type: String, require: '{PATH} is required', unique: true },
  questions: [{ type: mongooseSchema.Types.ObjectId, ref: 'Question' }]
});

mongoose.model('Tag', tagSchema);
