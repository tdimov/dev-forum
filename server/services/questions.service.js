const Question = require('mongoose').model('Question');

async function index(query) {
  const { limit, offset, ...filters } = query;

  const questions = await Question.find(filters)
    .sort('-postedDate')
    .limit(Number(limit))
    .skip(Number(offset))
    .exec();

  return questions;
}

module.exports = {
  index
};
