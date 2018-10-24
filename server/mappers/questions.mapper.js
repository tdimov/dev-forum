const dateTimeManager = require('../common/date.time.manager');
const answersMapper = require('./answers.mapper');

const DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm:ss';

function transformToQuestionListItemModel(question) {
  return {
    id: question._id,
    title: question.title,
    author: {
      id: question.author._id,
      username: question.author.username
    },
    tags: question.tags,
    votes: question.rating,
    answers: question.answers.length,
    views: question.viewed,
    date: dateTimeManager.formatDate(question.postedDate)
  };
}

function transformToQuestionsListModel(questions) {
  return questions.map(question => transformToQuestionListItemModel(question));
}

function transformToQuestionModel(question) {
  return {
    id: question._id,
    title: question.title,
    text: question.text,
    author: {
      id: question.author._id,
      username: question.author.username
    },
    tags: question.tags,
    votes: question.rating,
    isLocked: question.isLocked,
    answers: answersMapper.transformToAnswersModel(question.answers),
    views: question.viewed,
    date: dateTimeManager.formatDate(question.postedDate, DATE_TIME_FORMAT),
    lastActiveDate: dateTimeManager.formatDate(
      question.lastActiveDate,
      DATE_TIME_FORMAT
    )
  };
}

module.exports = {
  transformToQuestionListItemModel,
  transformToQuestionsListModel,
  transformToQuestionModel
};
