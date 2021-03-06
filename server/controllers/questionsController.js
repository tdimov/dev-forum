const Question = require('mongoose').model('Question');
const Tag = require('mongoose').model('Tag');
const User = require('mongoose').model('User');
const Answer = require('mongoose').model('Answer');
const Comment = require('mongoose').model('Comment');
const Vote = require('mongoose').model('Vote');
const questionsValidator = require('../utilities/validation/questionsValidator');

const dateFormat = require('../utilities/dateFormat');

// Unused for now
function getAllQuestions(options, callback) {
  Question.find(options).exec((err, questions) => {
    if (err || !questions) {
      callback(err, null);
    }

    callback(null, questions);
  });
}
// TODO: Create function for converting question into View Model
module.exports = {
  getQuestions(req, res) {
    // var pageId = req.params.pageId;
    const itemsPerPage = 20;
    Question.find({})
      .sort('-postedDate')
      .limit(itemsPerPage)
      .exec((err, questions) => {
        if (err || !questions) {
          console.log(`Cannot load top questions: ${err}`);
          return;
        }

        const models = [];

        for (let i = 0, len = questions.length; i < len; i++) {
          const questionVM = {
            id: questions[i]._id,
            title: questions[i].title,
            author: {
              id: questions[i].author._id,
              username: questions[i].author.username
            },
            isLocked: questions[i].isLocked,
            tags: questions[i].tags,
            votes: questions[i].votes.length,
            answers: questions[i].answersCount,
            views: questions[i].viewed,
            date: dateFormat.createDateFormat(questions[i].postedDate)
          };

          models.push(questionVM);
        }

        res.send(models);
        res.end();
      });
  },
  getTopQuestions(req, res) {
    Question.find({})
      .sort('-postedDate')
      .limit(3)
      .exec((err, questions) => {
        if (err || !questions) {
          console.log(`Cannot load top questions: ${err}`);
          return;
        }

        const models = [];

        for (let i = 0, len = questions.length; i < len; i++) {
          const questionVM = {
            id: questions[i]._id,
            title: questions[i].title,
            author: {
              id: questions[i].author._id,
              username: questions[i].author.username
            },
            tags: questions[i].tags,
            votes: questions[i].votes.length,
            answers: questions[i].answersCount,
            views: questions[i].viewed,
            date: dateFormat.createDateFormat(questions[i].postedDate)
          };

          models.push(questionVM);
        }

        res.send(models);
        res.end();
      });
  },
  getLastFiveQuestions(req, res) {
    Question.find({})
      .sort('-postedDate')
      .limit(5)
      .exec((err, questions) => {
        if (err || !questions) {
          console.log(
            `getLastFiveQuestions Cannot load last five questions: ${err}`
          );
          return;
        }
        const models = [];

        for (let i = 0, len = questions.length; i < len; i++) {
          const question = questions[i];

          const questionVM = {
            id: question._id,
            title: question.title
          };

          models.push(questionVM);
        }
        res.send(models);
        res.end();
      });
  },
  getUnansweredQuestions(req, res) {
    Question.find({ isAnswered: false })
      .sort('-postedDate')
      .limit(3)
      .exec((err, questions) => {
        if (err || !questions) {
          console.log(`Cannot load top questions: ${err}`);
          return;
        }

        const models = [];

        for (let i = 0, len = questions.length; i < len; i++) {
          const questionVM = {
            id: questions[i]._id,
            title: questions[i].title,
            author: {
              id: questions[i].author._id,
              username: questions[i].author.username
            },
            tags: questions[i].tags,
            votes: questions[i].votes.length,
            answers: questions[i].answersCount,
            views: questions[i].viewed,
            date: dateFormat.createDateFormat(questions[i].postedDate)
          };

          models.push(questionVM);
        }

        res.send(models);
        res.end();
      });
  },
  getQuestionsByTag(req, res) {
    const { tag } = req.params;
    Tag.findOne({ name: tag })
      .populate('questions')
      .exec((err, tag) => {
        if (err && !tag) {
          console.log(`getQuestionsByTag Cannot load tag: ${err}`);
          return;
        }

        const models = [];
        const { questions } = tag;
        questions.reverse();
        for (let i = 0, len = questions.length; i < len; i++) {
          const questionVM = {
            id: questions[i]._id,
            title: questions[i].title,
            author: {
              id: questions[i].author._id,
              username: questions[i].author.username
            },
            tags: questions[i].tags,
            votes: questions[i].votes.length,
            answers: questions[i].answersCount,
            views: questions[i].viewed,
            date: dateFormat.createDateFormat(questions[i].postedDate)
          };

          models.push(questionVM);
        }

        res.send({ questions: models, tagName: tag.name });
        res.end();
      });
  },
  getQuestionById(req, res) {
    const { id } = req.params;
    Question.findOne({ _id: id }).exec((err, question) => {
      if (err || !question) {
        console.log(`getQuestionById Cannot load the question: ${err}`);
        return;
      }

      Answer.find({ questionId: question._id })
        .populate('comments')
        .exec((err, answers) => {
          if (err || !answers) {
            console.log(`getQuestionById Cannot load answers: ${err}`);
            return;
          }
          const answersVM = [];

          for (let i = 0, len = answers.length; i < len; i++) {
            const answer = answers[i];

            const commentsVM = [];

            for (
              let j = 0, commentsLen = answer.comments.length;
              j < commentsLen;
              j++
            ) {
              const comment = answer.comments[j];

              const commentVM = {
                text: comment.text,
                author: {
                  id: comment.author._id,
                  username: comment.author.username
                },
                date: dateFormat.createDateFormat(comment.postedDate)
              };

              commentsVM.push(commentVM);
            }

            const answerVM = {
              id: answer._id,
              votes: answer.rating,
              text: answer.text,
              author: {
                id: answer.author._id,
                username: answer.author.username
              },
              comments: commentsVM,
              date: dateFormat.createDateFormat(answer.postedDate)
            };

            answersVM.push(answerVM);
          }

          const model = {
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
            answers: answersVM,
            views: question.viewed,
            date: dateFormat.createDateFormat(question.postedDate),
            lastActiveDate: dateFormat.createDateFormat(question.lastActiveDate)
          };

          res.send(model);
          res.end();
        });
    });
  },
  addQuestion(req, res, next) {
    const newQuestion = req.body;

    const currentUser = req.user;

    if (questionsValidator.isAskQuestionValid(newQuestion)) {
      newQuestion.author = {
        _id: currentUser._id,
        username: currentUser.username
      };

      Question.create(newQuestion, (err, question) => {
        if (err || !question) {
          console.log(
            `addQuestion An error occurred while creating new question: ${err}`
          );
          res.send({
            success: false,
            message: 'Sorry, an error occurred while saving your question!'
          });
          res.end();
          return;
        }
        User.findOneAndUpdate(
          { _id: currentUser._id },
          { $push: { questions: question._id }, $inc: { reputation: 1 } },
          err => {
            if (err) {
              console.log(`addQuestion Cannot update user: ${err}`);
              return;
            }

            if (question.tags) {
              question.tags.forEach(tag => {
                Tag.findOneAndUpdate(
                  { name: tag },
                  { $push: { questions: question._id } },
                  err => {
                    if (err) {
                      console.log(
                        `addQuestions Cannot push question id to tag: ${err}`
                      );
                    }
                  }
                );
              });
            }

            res.send({
              success: true,
              message: 'Question is added successful!',
              questionId: question._id
            });
            res.end();
          }
        );
      });
    } else {
      res.send({
        success: false,
        message: 'Please, enter correct question data!'
      });
      res.end();
    }
  },
  voteUp(req, res) {
    const { questionId } = req.body;

    const currentUser = req.user;

    if (currentUser) {
      const newVote = {
        userId: currentUser._id,
        score: 'up'
      };
      questionsValidator.isUserVote(
        currentUser._id,
        questionId,
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
                  console.log(`voteUp cannot update user: ${err}`);
                  return;
                }
                Vote.create(newVote, (err, vote) => {
                  if (err || !vote) {
                    console.log(`voteUp Cannot create a new vote: ${err}`);
                    return;
                  }

                  Question.findOneAndUpdate(
                    { _id: questionId },
                    {
                      $push: { votes: vote._id },
                      $set: { lastActiveDate: new Date() },
                      $inc: { rating: 1 }
                    },
                    err => {
                      if (err) {
                        console.log(`voteUp Cannot update question: ${err}`);
                        return;
                      }

                      res.send({
                        success: true,
                        message: 'You vote up successful!'
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
    const { questionId } = req.body;

    const currentUser = req.user;

    if (currentUser) {
      const newVote = {
        userId: currentUser._id,
        score: 'down'
      };

      questionsValidator.isUserVote(
        currentUser._id,
        questionId,
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
                  console.log(`voteUp cannot update user: ${err}`);
                  return;
                }

                Vote.create(newVote, (err, vote) => {
                  if (err || !vote) {
                    console.log(`voteDown Cannot create a new vote: ${err}`);
                    return;
                  }

                  Question.findOneAndUpdate(
                    { _id: questionId },
                    {
                      $push: { votes: vote._id },
                      $set: { lastActiveDate: new Date() },
                      $inc: { rating: -1 }
                    },
                    err => {
                      if (err) {
                        console.log(`voteDown Cannot update question: ${err}`);
                        return;
                      }

                      res.send({
                        success: true,
                        message: 'You vote down successful!'
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
  lockQuestion(req, res) {
    const { questionId } = req.body;

    if (questionId) {
      Question.findByIdAndUpdate(
        { _id: questionId },
        { $set: { isLocked: true } },
        err => {
          if (err) {
            console.log(`lockQuestion Cannot lock the question: ${err}`);
            res.send({ success: false, message: 'Cannot lock the question' });
            return;
          }

          res.send({
            success: true,
            message: 'Question was locked successful!'
          });
          res.end();
        }
      );
    }
  },
  updateQuestion(req, res, next) {},
  deleteQuestion(req, res) {
    const questionId = req.params.id;

    if (questionId) {
      Question.findOne({ _id: questionId }).exec((err, question) => {
        const { tags } = question;

        for (let i = 0, len = tags.length; i < len; i++) {
          Tag.findOne({ name: tags[i] }).exec((err, tag) => {
            if (err) {
              console.log(`deleteQuestion Cannot find tag: ${err}`);
              res.send({ success: false, message: 'Delete failed!' });
              return;
            }
            const index = tag.questions.indexOf(questionId);

            if (index > -1) {
              tag.questions.splice(index, 1);
            }

            tag.save();
          });
        }

        question.remove(err => {
          if (err) {
            console.log(
              `deleteQuestion The question was not removed from db: ${err}`
            );
            res.send({ success: false, message: 'Delete failed!' });
            res.end();
          } else {
            res.send({ success: true, message: 'Successful delete!' });
            res.end();
          }
        });
      });
    }
  }
};
