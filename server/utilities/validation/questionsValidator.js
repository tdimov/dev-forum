const Question = require('mongoose').model('Question');
const validator = require('validator');
const commonValidator = require('./commonValidator');

function isTagsLengthValid(tags) {
  const len = tags.length;

  if (len >= 1 && len <= 5) {
    return false;
  }

  return true;
}

function areTagsValuesValid(tags) {
  for (let i, len = tags.length; i < len; i++) {
    if (commonValidator.isNullOrEmpty(tags[i])) {
      return true;
    }
  }

  return false;
}

module.exports = {
  isAskQuestionValid(question) {
    if (question) {
      if (
        commonValidator.isNullOrEmpty(question.title) ||
        commonValidator.isNullOrEmpty(question.text)
      ) {
        return false;
      }
      // if(question.tags) {
      //     if(isTagsLengthValid(question.tags)) {
      //         return false;
      //     }

      //     if (areTagsValuesValid(question.tags)) {
      //         return false;
      //     }
      // }

      return true;
    }

    return false;
  },
  isUserVote(userId, questionId, callback) {
    Question.findOne({ _id: questionId })
      .populate('votes')
      .exec((err, question) => {
        let isVote = false;

        if (err || !question) {
          console.log(`isUserVote Cannot load question: ${err}`);
          callback(err, isVote);
          return;
        }

        for (let i = 0, len = question.votes.length; i < len; i++) {
          const vote = question.votes[i];
          const id = `${vote.userId}`;
          if (id === userId) {
            isVote = true;
            break;
          }
        }

        callback(null, isVote);
      });
  }
};
