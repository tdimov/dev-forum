var Question = require('mongoose').model('Question'),
    Tag = require('mongoose').model('Tag'),
    User = require('mongoose').model('User'),
    Answer = require('mongoose').model('Answer'),
    Comment = require('mongoose').model('Comment'),
    Vote = require('mongoose').model('Vote'),
    questionsValidator = require('../utilities/validation/questionsValidator'),
    dateFormat = require('../utilities/dateFormat');

//Unused for now
function getAllQuestions(options, callback) {
    Question.find(options).exec(function(err, questions){
        if(err || !questions) {
            callback(err, null);
        }

        callback(null, questions);
    });
}

module.exports = {
    getQuestions: function (req, res, next) {
        //var pageId = req.params.pageId;
        var itemsPerPage = 20;
        Question.find({}).sort('-postedDate').limit(itemsPerPage).exec(function(err, questions) {
            if(err || !questions) {
                console.log("Cannot load top questions: " + err);
                return;
            }

            var models = [];

            for(var i = 0, len = questions.length; i < len; i++) {
                var questionVM = {
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
    getTopQuestions: function (req, res, next) {
        Question.find({}).sort('-postedDate').limit(3).exec(function(err, questions) {
            if(err || !questions) {
                console.log("Cannot load top questions: " + err);
                return;
            }

            var models = [];

            for(var i = 0, len = questions.length; i < len; i++) {
                var questionVM = {
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
    getLastFiveQuestions: function (req, res) {
        Question.find({}).sort('-postedDate').limit(5).exec(function (err, questions) {
            if(err || !questions) {
                console.log("getLastFiveQuestions Cannot load last five questions: " + err);
                return;
            }
            var models = [];

            for(var i = 0, len = questions.length; i < len; i++) {
                var question = questions[i];

                var questionVM = {
                    id: question._id,
                    title: question.title
                };

                models.push(questionVM);
            }
            res.send(models);
            res.end();
        });
    },
    getUnansweredQuestions: function (req, res) {
        Question.find({isAnswered: false}).sort('-postedDate').limit(3).exec(function(err, questions) {
            if(err || !questions) {
                console.log("Cannot load top questions: " + err);
                return;
            }

            var models = [];

            for(var i = 0, len = questions.length; i < len; i++) {
                var questionVM = {
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
    getQuestionsByTag: function (req, res) {
        var tag = req.params.tag;
        Tag.findOne({name: tag}).populate('questions').exec(function (err, tag){

            if(err && !tag) {
                console.log("getQuestionsByTag Cannot load tag: " + err);
                return;
            }

            var models = [];
            var questions = tag.questions;
            questions.reverse();
            for(var i = 0, len = questions.length; i < len; i++) {
                var questionVM = {
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

            res.send({questions: models, tagName: tag.name});
            res.end();
        });
    },
    getQuestionById: function (req, res, next) {
        var id = req.params.id;
        Question.findOne({_id: id}).exec(function (err, question) {
            if(err || !question) {
                console.log('getQuestionById Cannot load the question: ' + err);
                return;
            }

            Answer.find({questionId: question._id}).populate('comments').exec(function (err, answers) {
                if(err || !answers) {
                    console.log("getQuestionById Cannot load answers: " + err);
                    return;
                }
                var answersVM = [];

                for(var i = 0, len = answers.length; i < len; i++) {
                    var answer = answers[i],
                        commentsVM = [];

                    for(var j = 0, commentsLen = answer.comments.length; j < commentsLen; j++) {
                        var comment = answer.comments[j];

                        var commentVM = {
                            text: comment.text,
                            author: {
                                id: comment.author._id,
                                username: comment.author.username
                            },
                            date: dateFormat.createDateFormat(comment.postedDate)
                        };

                        commentsVM.push(commentVM);
                    }

                    var answerVM = {
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

                var model = {
                    id: question._id,
                    title: question.title,
                    text: question.text,
                    author: {
                        id: question.author._id,
                        username: question.author.username
                    },
                    tags: question.tags,
                    votes: question.rating,
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
    addQuestion: function (req, res, next) {
        var newQuestion = req.body,
            currentUser = req.user;

        if(questionsValidator.isAskQuestionValid(newQuestion)) {
            newQuestion.author = {
                _id: currentUser._id,
                username: currentUser.username
            };

            Question.create(newQuestion, function (err, question) {
                if(err || !question) {
                    console.log("addQuestion An error occurred while creating new question: " + err);
                    res.send({success: false, message: "Sorry, an error occurred while saving your question!"});
                    res.end();
                    return;
                }
                User.findOneAndUpdate({_id: currentUser._id}, {$push: {'questions': question._id}, $inc: {reputation: 1}}, function (err) {
                    if(err) {
                        console.log('addQuestion Cannot update user: ' + err);
                        return;
                    }

                    if(question.tags) {
                        question.tags.forEach(function (tag) {
                            Tag.findOneAndUpdate({name: tag}, {$push: {questions: question._id}}, function (err) {
                                if(err) {
                                    console.log('addQuestions Cannot push question id to tag: ' + err);
                                    return;
                                }
                            })
                        });
                    }

                    res.send({success: true, message: "Question is added successful!", questionId: question._id});
                    res.end();
                });
            });
        }
        else {
            res.send({success: false, message: "Please, enter correct question data!"});
            res.end();
        }
    },
    voteUp: function (req, res) {
        var questionId = req.body.questionId,
            currentUser = req.user;

        if(currentUser) {
            var newVote = {
                userId: currentUser._id,
                score: 'up'
            };
            questionsValidator.isUserVote(currentUser._id, questionId, function (err, isUserVote) {
                if(err) {
                    console.log("voteUp An error occurred with vote: " + err);
                    return;
                }

                if(!isUserVote) {
                    User.findOneAndUpdate({_id: currentUser._id}, {$inc: {'reputation': 1}}, function (err) {
                        if(err) {
                            console.log("voteUp cannot update user: " + err);
                            return;
                        }
                        Vote.create(newVote, function (err, vote) {
                            if(err || !vote) {
                                console.log("voteUp Cannot create a new vote: " + err);
                                return;
                            }

                            Question.findOneAndUpdate({_id: questionId}, {$push: { 'votes': vote._id }, $set: {'lastActiveDate': new Date()}, $inc: {'rating': 1} }, function (err) {
                                if(err) {
                                    console.log("voteUp Cannot update question: " + err);
                                    return
                                }

                                res.send({success: true, message: "You vote up successful!"});
                                res.end();
                            });
                        });
                    });
                }
                else {
                    res.send({success: false, message: "You've already voted for this question!"});
                    res.end();
                }

            });


        }
        else {
            res.send({success: false, message: "Please, log in!"});
            res.end();
        }
    },
    voteDown: function (req, res) {
        var questionId = req.body.questionId,
            currentUser = req.user;

        if(currentUser) {
            var newVote = {
                userId: currentUser._id,
                score: 'down'
            };

            questionsValidator.isUserVote(currentUser._id, questionId, function (err, isUserVote) {
                if(err) {
                    console.log("voteDown An error occurred with vote: " + err);
                    return;
                }

                if(!isUserVote) {
                    User.findOneAndUpdate({_id: currentUser._id}, {$inc: {'reputation': 1}}, function (err) {
                        if (err) {
                            console.log("voteUp cannot update user: " + err);
                            return;
                        }

                        Vote.create(newVote, function (err, vote) {
                            if(err || !vote) {
                                console.log("voteDown Cannot create a new vote: " + err);
                                return;
                            }

                            Question.findOneAndUpdate({_id: questionId}, {$push: { 'votes': vote._id }, $set: {'lastActiveDate': new Date()}, $inc: {'rating': -1} }, function (err) {
                                if(err) {
                                    console.log("voteDown Cannot update question: " + err);
                                    return
                                }

                                res.send({success: true, message: "You vote down successful!"});
                                res.end();
                            });
                        });
                    });
                }
                else {
                    res.send({success: false, message: "You've already voted for this question!"});
                    res.end();
                }

            });


        }
        else {
            res.send({success: false, message: "Please, log in!"});
            res.end();
        }
    },
    updateQuestion: function (req, res, next) {

    },
    deleteQuestion: function (req, res) {
        var questionId = req.params.id;

        if(questionId) {
            Question.findOne({_id: questionId}).exec(function (err, question) {
                var tags = question.tags;

                for(var i = 0, len = tags.length; i < len; i++) {
                    Tag.findOne({name: tags[i]}).exec(function (err, tag) {
                        if(err) {
                            console.log('deleteQuestion Cannot find tag: ' + err);
                            res.send({success: false, message: "Delete failed!"});
                            return;
                        }
                        var index = tag.questions.indexOf(questionId);

                        if(index > -1) {
                            tag.questions.splice(index, 1);
                        }

                        tag.save();
                    })
                }

                question.remove(function (err) {
                    if(err) {
                        console.log("deleteQuestion The question was not removed from db: " + err);
                        res.send({success: false, message: "Delete failed!"});
                        res.end();
                        return;
                    }
                    else {
                        res.send({success: true, message: "Successful delete!"});
                        res.end();
                    }
                });
            });
        }
    }
};