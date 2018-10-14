const Answer = require('mongoose').model('Answer');
const Question = require('mongoose').model('Question');
const questionsService = require('./questions.service');
const usersService = require('./users.service');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest } = require('../errors/http.errors');

async function create(questionId, user, payload) {
  await questionsService.get(questionId);

  if (isMissing(payload.text)) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Text of answer missing!'
    );
  }

  payload.questionId = questionId;
  payload.author = {
    _id: user.id,
    username: user.username
  };

  const newAnswer = await Answer.create(payload);
  await questionsService.updateActivity(questionId);
  await usersService.updateReputation(user.id, 2);

  return newAnswer;
}

module.exports = {
  create
};
