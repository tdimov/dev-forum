const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const rankingWinnerSchema = new mongoose.Schema({
  userId: { type: mongooseSchema.Types.ObjectId, ref: 'User' },
  name: { type: String, require: '{PATH} is required' },
  reputation: { type: Number, default: 0 }
});

const RankingWinner = mongoose.model('RankingWinner', rankingWinnerSchema);

module.exports = {
  RankingWinner
};
