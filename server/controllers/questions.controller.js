const questionsService = require('../services/questions.service');
const questionsMapper = require('../mappers/questions.mapper');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest } = require('../errors/http.errors');

async function index(req, res, next) {
  try {
    const result = await questionsService.index(req.query);

    return res.status(200).send({
      error: null,
      result: questionsMapper.transformToQuestionsListModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const questionId = req.params.id;

    if (isMissing(questionId)) {
      throw new AppError(
        badRequest.type,
        badRequest.httpCode,
        'Question id is missing!'
      );
    }
    const result = await questionsService.get(questionId);

    return res.status(200).send({
      error: null,
      result: questionsMapper.transformToQuestionModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await questionsService.create(req.body, req.user.id);

    return res.status(201).send({
      error: null,
      result
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function vote(req, res, next) {
  try {
    const questionId = req.params.id;
    const { isPositive } = req.body;

    if (isMissing(questionId)) {
      throw new AppError(
        badRequest.type,
        badRequest.httpCode,
        'Question id is missing!'
      );
    }

    await questionsService.vote(questionId, req.user.id, isPositive);

    return res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function del(req, res, next) {
  try {
    const questionId = req.params.id;

    if (isMissing(questionId)) {
      throw new AppError(
        badRequest.type,
        badRequest.httpCode,
        'Question id is missing!'
      );
    }

    await questionsService.del(questionId);

    return res.status(200).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  index,
  get,
  create,
  vote,
  del
};
