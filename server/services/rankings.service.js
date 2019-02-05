const { Ranking } = require('../models/ranking');
const { RankingWinner } = require('../models/ranking.winner');
const usersService = require('./users.service');
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

  usersService.resetUsersReputation();

  return newRanking;
}

async function finishCurrentRanking() {
  const currentMonthAndYear = dateTimeManager.getCurrentMonthAndYear();
  // checks if the current ranking exist otherwise throws AppError
  await get(currentMonthAndYear);

  const [
    firstWinner,
    secondWinner,
    thirdWinner
  ] = await usersService.getUsersByReputation({ limit: 3 });

  const firstPlaceWinner = await RankingWinner.create(
    rankingWinnerMapper.transformToRankingWinnerDbModel(firstWinner)
  );
  const secondPlaceWinner = await RankingWinner.create(
    rankingWinnerMapper.transformToRankingWinnerDbModel(secondWinner)
  );
  const thirdPlaceWinner = await RankingWinner.create(
    rankingWinnerMapper.transformToRankingWinnerDbModel(thirdWinner)
  );

  await Ranking.update(currentMonthAndYear, {
    finished: true,
    firstPlaceWinner,
    secondPlaceWinner,
    thirdPlaceWinner
  });

  usersService.resetUsersReputation();
}

module.exports = {
  getCurrentRanking,
  create,
  finishCurrentRanking
};
