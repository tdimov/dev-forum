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

module.exports = {
  create
};
