const dateTimeManager = require('../common/date.time.manager');

const DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm:ss';

function transformToAnswerModel(answer) {
  return {
    id: answer._id,
    votes: answer.rating,
    text: answer.text,
    author: {
      id: answer.author._id,
      username: answer.author.username
    },
    date: dateTimeManager.formatDate(answer.postedDate, DATE_TIME_FORMAT)
  };
}

function transformToAnswersModel(answers) {
  return answers.map(answer => transformToAnswerModel(answer));
}

module.exports = {
  transformToAnswerModel,
  transformToAnswersModel
};
