var Question = require('mongoose').model('Question'),
    commonValidator = require('./commonValidator'),
    validator = require('validator');

function isTagsLengthValid(tags) {

    var len = tags.length;

    if(len >= 1 && len <= 5) {
        return false;
    }

    return true;
}

function areTagsValuesValid(tags) {
    for(var i, len = tags.length; i < len; i++) {
        if(commonValidator.isNullOrEmpty(tags[i])) {
            return true;
        }
    }

    return false;
}

module.exports = {
    isAskQuestionValid: function(question) {
        if(question) {
            if(commonValidator.isNullOrEmpty(question.title) || commonValidator.isNullOrEmpty(question.text)) {
                return false;
            }
            if(question.tags) {
                if(isTagsLengthValid(question.tags)) {
                    return false;
                }

                if (areTagsValuesValid(question.tags)) {
                    return false;
                }
            }

            return true;
        }

        return false;
    },
    isUserVote: function (userId, questionId, callback) {
        Question.findOne({_id: questionId}).populate('votes').exec(function (err, question) {
            var isVote = false;

            if(err || !question) {
                console.log("isUserVote Cannot load question: " + err);
                callback(err, isVote);
                return;
            }

            for(var i = 0, len = question.votes.length; i < len; i++) {
                var vote = question.votes[i];
                var id = "" + vote.userId + "";
                if(id == userId) {
                    isVote = true;
                    break;
                }
            }

            callback(null, isVote);
        });
    }
};