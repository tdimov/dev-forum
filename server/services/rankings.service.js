const { Ranking } = require('../models/ranking');
const { User } = require('../models/user');
const rankingValidator = require('../validators/ranking.validator');
const dateTimeManager = require('../common/date.time.manager');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest, resourceNotFound } = require('../errors/http.errors');

async function get(id) {
  const ranking = await Ranking.findById(id);

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
  });

  if (isMissing(ranking)) {
    throw new AppError(
      resourceNotFound.type,
      resourceNotFound.httpCode,
      'Ranking does not exist!'
    );
  }

  return ranking;
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

async function endRanking(id) {
  await get(id);
  const winners = await User.find()
    .sort('-reputation')
    .limit(3)
    .exec();

  await Ranking.update(
    { _id: id },
    {
      firstPlaceWinner: winners[0]._id,
      secondPlaceWinner: winners[1]._id,
      thirdPlaceWinner: winners[2]._id
    }
  );
}

module.exports = {
  getCurrentRanking,
  create,
  endRanking
};
