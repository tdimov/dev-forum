const Question = require('mongoose').model('Question');
const User = require('mongoose').model('User');
const usersService = require('./users.service');
const questionsValidator = require('../validators/questions.validator');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest, resourceNotFound } = require('../errors/http.errors');

async function index(query) {
  const { limit, offset, ...filters } = query;

  const questions = await Question.find(filters)
    .sort('-postedDate')
    .limit(Number(limit))
    .skip(Number(offset))
    .exec();

  return questions;
}

async function create(payload, userId) {
  const isCreateQuestionValid = questionsValidator.isCreateQuestionDataPresent(
    payload
  );

  if (!isCreateQuestionValid) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Invalid create question data!'
    );
  }

  const user = await usersService.get(userId);

  payload.author = {
    _id: userId,
    username: user.username
  };

  const newQuestion = await Question.create(payload);

  await User.findOneAndUpdate(
    { _id: user.id },
    { $push: { questions: newQuestion._id }, $inc: { reputation: 1 } }
  );

  return newQuestion._id;
}

module.exports = {
  index,
  create
};
