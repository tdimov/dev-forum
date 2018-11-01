function transformToRankingWinnerDbModel(payload) {
  return {
    userId: payload.id,
    name: `${payload.firstName} ${payload.lastName}`,
    reputation: payload.reputation
  };
}

function transformToRankingWinnerModel(payload) {
  return {
    userId: payload.userId,
    name: payload.name,
    reputation: payload.reputation
  };
}

module.exports = {
  transformToRankingWinnerDbModel,
  transformToRankingWinnerModel
};
