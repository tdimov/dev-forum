const Answer = require('mongoose').model('Answer');
const Question = require('mongoose').model('Question');
const Vote = require('mongoose').model('Vote');
const User = require('mongoose').model('User');
const answersValidator = require('../utilities/validation/answersValidator');
const commonValidator = require('../utilities/validation/commonValidator');

module.exports = {
  addAnswer(req, res) {
    const currentUser = req.user;
    const newAnswer = req.body;

    if (!newAnswer.isQuestionLocked) {
      console.log(newAnswer);
      // console.log(commonValidator.areJsonPropsNullOrEmpty(newAnswer));
      if (commonValidator.areJsonPropsNullOrEmpty(newAnswer) && currentUser) {
        newAnswer.author = {
          _id: currentUser._id,
          username: currentUser.username
        };
        User.findOneAndUpdate(
          { _id: currentUser._id },
          { $inc: { reputation: 2 } },
          err => {
            if (err) {
              console.log(`addAnswer Cannot update user: ${err}`);
              return;
            }

            Answer.create(newAnswer, (err, answer) => {
              if (err || !answer) {
                console.log(`Cannot add an answer: ${err}`);
                res.send({
                  success: false,
                  message: 'An error occurred while adding an answer'
                });
                return;
              }

              Question.update(
                { _id: answer.questionId },
                {
                  $inc: { answersCount: 1 },
                  $set: { lastActiveDate: new Date(), isAnswered: true }
                },
                err => {
                  if (err) {
                    console.log(`Cannot update answers count: ${err}`);
                    return;
                  }

                  res.send({
                    success: true,
                    message: 'Answer is added successful!'
                  });
                  res.end();
                }
              );
            });
          }
        );
      } else {
        res.send({
          success: false,
          message: 'Please, enter correct answer data!'
        });
        res.end();
      }
    } else {
      res.send({ success: false, message: 'The question is locked!' });
      res.end();
    }
  },
  voteUp(req, res) {
    const currentUser = req.user;
    const ids = req.body;

    if (currentUser) {
      const newVote = {
        userId: currentUser._id,
        score: 'up'
      };

      answersValidator.isUserVote(
        currentUser._id,
        ids.answerId,
        (err, isUserVote) => {
          if (err) {
            console.log(`voteUp An error occurred with vote: ${err}`);
            return;
          }

          if (!isUserVote) {
            User.findOneAndUpdate(
              { _id: currentUser._id },
              { $inc: { reputation: 1 } },
              err => {
                if (err) {
                  console.log(`voteUp Cannot update user: ${err}`);
                  return;
                }

                Vote.create(newVote, (err, vote) => {
                  if (err || !vote) {
                    console.log(`voteUp Cannot create a new vote: ${err}`);
                    return;
                  }

                  Question.findOneAndUpdate(
                    { _id: ids.questionId },
                    { $set: { lastActiveDate: new Date() } },
                    err => {
                      if (err) {
                        console.log(`voteUp Cannot update question: ${err}`);
                        return;
                      }
                      Answer.findOneAndUpdate(
                        { _id: ids.answerId },
                        { $push: { votes: vote._id }, $inc: { rating: 1 } },
                        err => {
                          if (err) {
                            console.log(`voteUp Cannot update answer: ${err}`);
                            return;
                          }

                          res.send({
                            success: true,
                            message: 'You vote up successful!'
                          });
                          res.end();
                        }
                      );
                    }
                  );
                });
              }
            );
          } else {
            res.send({
              success: false,
              message: "You've already voted for this question!"
            });
            res.end();
          }
        }
      );
    } else {
      res.send({ success: false, message: 'Please, log in!' });
      res.end();
    }
  },
  voteDown(req, res) {
    const currentUser = req.user;

    const ids = req.body;

    if (currentUser) {
      const newVote = {
        userId: currentUser._id,
        score: 'down'
      };
      answersValidator.isUserVote(
        currentUser._id,
        ids.answerId,
        (err, isUserVote) => {
          if (err) {
            console.log(`voteDown An error occurred with vote: ${err}`);
            return;
          }

          if (!isUserVote) {
            User.findOneAndUpdate(
              { _id: currentUser._id },
              { $inc: { reputation: 1 } },
              err => {
                if (err) {
                  console.log(`voteDown Cannot update user: ${err}`);
                  return;
                }

                Vote.create(newVote, (err, vote) => {
                  if (err || !vote) {
                    console.log(`voteDown Cannot create a new vote: ${err}`);
                    return;
                  }

                  Question.findOneAndUpdate(
                    { _id: ids.questionId },
                    { $set: { lastActiveDate: new Date() } },
                    err => {
                      if (err) {
                        console.log(`voteDown Cannot update question: ${err}`);
                        return;
                      }
                      Answer.findOneAndUpdate(
                        { _id: ids.answerId },
                        { $push: { votes: vote._id }, $inc: { rating: -1 } },
                        err => {
                          if (err) {
                            console.log(`voteUp Cannot update answer: ${err}`);
                            return;
                          }

                          res.send({
                            success: true,
                            message: 'You vote up successful!'
                          });
                          res.end();
                        }
                      );
                    }
                  );
                });
              }
            );
          } else {
            res.send({
              success: false,
              message: "You've already voted for this question!"
            });
            res.end();
          }
        }
      );
    } else {
      res.send({ success: false, message: 'Please, log in!' });
      res.end();
    }
  }
};
