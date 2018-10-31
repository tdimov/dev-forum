const { Ranking } = require('../models/ranking');
const { RankingWinner } = require('../models/ranking.winner');
const { User } = require('../models/user');
const rankingValidator = require('../validators/ranking.validator');
const rankingWinnerMapper = require('../mappers/ranking.winner.mapper');
const dateTimeManager = require('../common/date.time.manager');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest, resourceNotFound } = require('../errors/http.errors');

async function get(filter = {}) {
  const ranking = await Ranking.findOne(filter);

  if (isMissing(ranking)) {
    throw new AppError(
      resourceNotFound.type,
      resourceNotFound.httpCode,
      'Ranking does not exist!'
    );
  }

  return ranking;
}

async function getCurrentRanking() {
  const { month, year } = dateTimeManager.getCurrentMonthAndYear();
  const ranking = await Ranking.findOne({
    month,
    year
  })
    .populate('firstPlaceWinner')
    .populate('secondPlaceWinner')
    .populate('thirdPlaceWinner');

  return ranking || {};
}

async function create(payload) {
  const { month, year } = dateTimeManager.getCurrentMonthAndYear();
  const ranking = await Ranking.findOne({
    month,
    year
  });

  if (!isMissing(ranking)) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Ranking for this month already exist!'
    );
  }

  const isRankingDataValid = rankingValidator.isCreateRankingDataPresent(
    payload
  );

  if (!isRankingDataValid) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Ranking data is not valid!'
    );
  }

  payload.month = month;
  payload.year = year;

  const newRanking = await Ranking.create(payload);

  return newRanking;
}

async function finishCurrentRanking() {
  const currentMonthAndYear = dateTimeManager.getCurrentMonthAndYear();
  // checks if the current ranking exist otherwise throws AppError
  await get(currentMonthAndYear);

  const winners = await User.find()
    .sort('-reputation')
    .limit(3)
    .exec();

  const firstPlaceWinner = await RankingWinner.create(
    rankingWinnerMapper.transformToRankingWinnerDbModel(winners[0])
  );
  const secondPlaceWinner = await RankingWinner.create(
    rankingWinnerMapper.transformToRankingWinnerDbModel(winners[1])
  );
  const thirdPlaceWinner = await RankingWinner.create(
    rankingWinnerMapper.transformToRankingWinnerDbModel(winners[2])
  );

  await Ranking.update(currentMonthAndYear, {
    finished: true,
    firstPlaceWinner,
    secondPlaceWinner,
    thirdPlaceWinner
  });
}

module.exports = {
  getCurrentRanking,
  create,
  finishCurrentRanking
};
