const Question = require('mongoose').model('Question');
const Answer = require('mongoose').model('Answer');
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

async function get(id) {
  const question = await Question.findById(id).exec();

  if (isMissing(question)) {
    throw new AppError(
      resourceNotFound.type,
      resourceNotFound.httpCode,
      'Question does not exist!'
    );
  }

  const answers = await Answer.find({ questionId: question.id }).exec();
  question.answers = answers;

  return question;
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

  await usersService.updateReputation(user.id, 1);

  return newQuestion._id;
}

async function updateActivity(id) {
  await Question.update(
    { _id: id },
    {
      $set: { lastActiveDate: new Date() }
    });
}

module.exports = {
  index,
  get,
  create,
  updateActivity
};
