const dateTimeManager = require('../common/date.time.manager');

function transformToQuestionListItemModel(question) {
  return {
    id: question._id,
    title: question.title,
    author: {
      id: question.author._id,
      username: question.author.username
    },
    isLocked: question.isLocked,
    tags: question.tags,
    votes: question.votes.length,
    answers: question.answersCount,
    views: question.viewed,
    date: dateTimeManager.formatDate(question.postedDate)
  };
}

function transformToQuestionsListModel(questions) {
  return questions.map(question => transformToQuestionListItemModel(question));
}

module.exports = {
  transformToQuestionListItemModel,
  transformToQuestionsListModel
};
