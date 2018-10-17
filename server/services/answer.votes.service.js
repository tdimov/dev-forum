const AnswerVote = require('mongoose').model('AnswerVote');
const { isMissing } = require('../validators/common.validator');

async function create(payload) {
  const newVote = await AnswerVote.create(payload);

  return newVote;
}

async function isUserVoted(answerId, userId) {
  const vote = await AnswerVote.findOne({
    answerId,
    userId
  }).exec();

  if (isMissing(vote)) {
    return false;
  }

  return true;
}

module.exports = {
  create,
  isUserVoted
};
