const Vote = require('mongoose').model('Vote');
const { isMissing } = require('../validators/common.validator');

async function create(payload) {
  const newVote = await Vote.create(payload);

  return newVote;
}

async function isUserVoted(questionId, userId) {
  const vote = await Vote.findOne({
    questionId,
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
