function transformToRankingModel(payload) {
  return {
    month: payload.month,
    year: payload.year,
    firstPlacePrize: payload.firstPlacePrize,
    secondPlacePrize: payload.secondPlacePrize,
    thirdPlacePrize: payload.thirdPlacePrize,
    firstPlaceWinner: payload.firstPlaceWinner,
    secondPlaceWinner: payload.secondPlaceWinner,
    thirdPlaceWinner: payload.thirdPlaceWinner
  };
}

module.exports = {
  transformToRankingModel
};
