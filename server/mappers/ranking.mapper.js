const rankingWinnersMapper = require('./ranking.winner.mapper');

function transformToRankingModel(payload) {
  return {
    id: payload.id,
    month: payload.month,
    year: payload.year,
    finished: payload.finished,
    firstPlacePrize: payload.firstPlacePrize,
    secondPlacePrize: payload.secondPlacePrize,
    thirdPlacePrize: payload.thirdPlacePrize,
    firstPlaceWinner: payload.firstPlaceWinner
      ? rankingWinnersMapper.transformToRankingWinnerModel(
          payload.firstPlaceWinner
        )
      : null,
    secondPlaceWinner: payload.secondPlaceWinner
      ? rankingWinnersMapper.transformToRankingWinnerModel(
          payload.secondPlaceWinner
        )
      : null,
    thirdPlaceWinner: payload.thirdPlaceWinner
      ? rankingWinnersMapper.transformToRankingWinnerModel(
          payload.thirdPlaceWinner
        )
      : null
  };
}

module.exports = {
  transformToRankingModel
};
