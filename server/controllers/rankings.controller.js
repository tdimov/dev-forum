const rankingsService = require('../services/rankings.service');
const rankingMapper = require('../mappers/ranking.mapper');

async function getCurrentRanking(req, res, next) {
  try {
    const result = await rankingsService.getCurrentRanking();

    return res.status(200).send({
      error: null,
      result: rankingMapper.transformToRankingModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await rankingsService.create(req.body);

    return res.status(201).send({
      error: null,
      result: rankingMapper.transformToRankingModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function finishCurrentRanking(req, res, next) {
  try {
    await rankingsService.finishCurrentRanking();

    return res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  getCurrentRanking,
  create,
  finishCurrentRanking
};
