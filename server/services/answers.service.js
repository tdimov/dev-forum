const Answer = require('../models/answer');
const questionsService = require('./questions.service');
const usersService = require('./users.service');
const answerVotesService = require('./answer.votes.service');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest } = require('../errors/http.errors');

const INCREMENT_STEP = 1;
const DECREMENT_STEP = -1;

async function create(questionId, userId, payload) {
  const question = await questionsService.get(questionId);

  if (isMissing(payload.text)) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Text of answer missing!'
    );
  }

  payload.questionId = questionId;
  payload.author = userId;

  const newAnswer = await Answer.create(payload);
  question.answers.push(newAnswer._id);
  question.save();
  await questionsService.updateActivity(questionId);
  await usersService.updateReputation(userId, 2);

  return newAnswer;
}

async function vote(questionId, answerId, userId, isPositive) {
  const score = isPositive ? 'up' : 'down';
  const isUserVoted = await answerVotesService.isUserVoted(answerId, userId);

  if (isUserVoted) {
    throw new AppError(badRequest.type, badRequest.httpCode, 'Already voted!');
  }

  answerVotesService.create({
    answerId,
    userId,
    score
  });
  usersService.updateReputation(userId, 1);
  questionsService.updateActivity(questionId);
  Answer.findOneAndUpdate(
    {
      _id: answerId
    },
    {
      $inc: { rating: isPositive ? INCREMENT_STEP : DECREMENT_STEP }
    }
  ).exec();
}

module.exports = {
  create,
  vote
};
