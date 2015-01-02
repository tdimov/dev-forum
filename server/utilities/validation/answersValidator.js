var Answer = require('mongoose').model('Answer');

module.exports = {
    isUserVote: function (userId, answerId, callback) {

        Answer.findOne({_id: answerId}).populate('votes').exec(function (err, answer) {
            var isVote = false;

            if (err || !answer) {
                console.log("isUserVote Cannot load answer: " + err);
                callback(err, isVote);
                return;
            }

            for (var i = 0, len = answer.votes.length; i < len; i++) {
                var vote = answer.votes[i];
                var id = "" + vote.userId + "";
                if (id == userId) {
                    isVote = true;
                    break;
                }
            }

            callback(null, isVote);
        });
    }
};