const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const rankingSchema = new mongoose.Schema({
  month: { type: Number, require: '{PATH} is required' },
  year: { type: Number, require: '{PATH} is required' },
  firstPlacePrize: { type: String, require: '{PATH} is required' },
  secondPlacePrize: { type: String, require: '{PATH} is required' },
  thirdPlacePrize: { type: String, require: '{PATH} is required' },
  firstPlaceWinner: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'RankingWinner'
  },
  secondPlaceWinner: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'RankingWinner'
  },
  thirdPlaceWinner: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'RankingWinner'
  },
  finished: { type: String, default: false }
});

const Ranking = mongoose.model('Ranking', rankingSchema);

module.exports = {
  Ranking
};
