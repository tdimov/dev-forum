const answersService = require('../services/answers.service');
const answersMapper = require('../mappers/answers.mapper');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest } = require('../errors/http.errors');

async function create(req, res, next) {
  try {
    const questionId = req.params.id;

    if (isMissing(questionId)) {
      throw new AppError(
        badRequest.type,
        badRequest.httpCode,
        'Question id is missing!'
      );
    }

    const result = await answersService.create(questionId, req.user, req.body);

    return res.status(201).send({
      error: null,
      result: answersMapper.transformToAnswerModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function vote(req, res, next) {
  try {
    const questionId = req.params.id;
    const { answerId } = req.params;
    const { isPositive } = req.body;

    if (isMissing(questionId) && isMissing(answerId)) {
      throw new AppError(
        badRequest.type,
        badRequest.httpCode,
        'Question and answer ids missing!'
      );
    }

    await answersService.vote(questionId, answerId, req.user.id, isPositive);

    return res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  create,
  vote
};
