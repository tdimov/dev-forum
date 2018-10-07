const Answer = require('mongoose').model('Answer');

module.exports = {
  isUserVote(userId, answerId, callback) {
    Answer.findOne({ _id: answerId })
      .populate('votes')
      .exec((err, answer) => {
        let isVote = false;

        if (err || !answer) {
          console.log(`isUserVote Cannot load answer: ${err}`);
          callback(err, isVote);
          return;
        }

        for (let i = 0, len = answer.votes.length; i < len; i++) {
          const vote = answer.votes[i];
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
