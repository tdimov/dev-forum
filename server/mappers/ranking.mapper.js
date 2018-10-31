const usersMapper = require('./users.mapper');

function transformToRankingModel(payload) {
  return {
    month: payload.month,
    year: payload.year,
    firstPlacePrize: payload.firstPlacePrize,
    secondPlacePrize: payload.secondPlacePrize,
    thirdPlacePrize: payload.thirdPlacePrize,
    firstPlaceWinner: usersMapper.transformFullName(payload.firstPlaceWinner),
    secondPlaceWinner: usersMapper.transformFullName(payload.secondPlaceWinner),
    thirdPlaceWinner: usersMapper.transformFullName(payload.thirdPlaceWinner)
  };
}

module.exports = {
  transformToRankingModel
};
