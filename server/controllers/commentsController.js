const Comment = require('mongoose').model('Comment');
const Answer = require('mongoose').model('Answer');
const Question = require('mongoose').model('Question');
const User = require('mongoose').model('User');
const commonValidator = require('../utilities/validation/commonValidator');

module.exports = {
  addComment(req, res) {
    const currentUser = req.user;
    const newComment = req.body;

    if (!newComment.isQuestionLocked) {
      if (commonValidator.areJsonPropsNullOrEmpty(newComment) && currentUser) {
        newComment.author = {
          _id: currentUser._id,
          username: currentUser.username
        };
        User.findOneAndUpdate(
          { _id: currentUser._id },
          { $inc: { reputation: 1 } },
          err => {
            if (err) {
              console.log(`addComment Cannot update user: ${err}`);
              return;
            }

            Comment.create(newComment, (err, comment) => {
              if (err || !comment) {
                console.log(`addComment Cannot create new comment: ${err}`);
                return;
              }

              Answer.findByIdAndUpdate(
                { _id: comment.answerId },
                { $push: { comments: comment._id } },
                (err, answer) => {
                  if (err || !answer) {
                    console.log(`addComment Cannot update answer: ${err}`);
                    return;
                  }
                  Question.findByIdAndUpdate(
                    { _id: answer.questionId },
                    { $set: { lastActiveDate: new Date() } },
                    (err, question) => {
                      if (err || !question) {
                        console.log(
                          `addComment Cannot update question: ${err}`
                        );
                        return;
                      }

                      res.send({
                        success: true,
                        message: 'Comment is added successful!'
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
          message: 'Please, enter correct comment data!'
        });
        res.end();
      }
    } else {
      res.send({ success: false, message: 'The question is locked!' });
      res.end();
    }
  }
};
