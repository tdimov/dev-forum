var Question = require('mongoose').model('Question'),
    Tag = require('mongoose').model('Tag'),
    User = require('mongoose').model('User'),
    Answer = require('mongoose').model('Answer'),
    questionsValidator = require('../utilities/validation/questionsValidator'),
    dateFormat = require('../utilities/dateFormat'),
    tagsController = require('../controllers/tagsController');

function getAllQuestions(options, callback) {
    Question.find(options).exec(function(err, questions){
        if(err || !questions) {
            callback(err, null);
        }

        callback(null, questions);
    });
}



module.exports = {
    getTopQuestions: function (req, res, next) {
        Question.find({}).sort('-postedDate').limit(3).populate('author').exec(function(err, questions) {
            if(err || !questions) {
                console.log("Cannot load top questions: " + err);
                return;
            }

            var models = [];
            console.log(questions);
            for(var i = 0, len = questions.length; i < len; i++) {
                var questionVM = {
                    id: questions[i]._id,
                    title: questions[i].title,
                    author: {
                        id: questions[i].author._id,
                        username: questions[i].author.username
                    },
                    tags: questions[i].tags,
                    votes: questions[i].rating,
                    answers: questions[i].answers.length,
                    views: questions[i].viewed,
                    date: dateFormat.createDateFormat(questions[i].postedDate)
                };

                models.push(questionVM);
            }

            res.send(models);
            res.end();

        });
    },
    getQuestionById: function (req, res, next) {
        var id = req.params.id;
        Question.findOne({_id: id}).exec(function (err, question) {
            if(err) {
                console.log('Cannot load the question: ' + err);
            }

        });
    },
    addQuestion: function (req, res, next) {
        var newQuestion = req.body,
            currentUser = req.user;

        if(questionsValidator.isAskQuestionValid(newQuestion)) {
            newQuestion.author = currentUser._id;
            Question.create(newQuestion, function (err, question) {
                if(err || !question) {
                    console.log("An error occurred while creating new question: " + err);
                    res.send({success: false, message: "Sorry, an error occurred while saving your question!"});
                    res.end();
                    return;
                }

                if(question.tags) {
                    question.tags.forEach(function(element, index) {
                        Tag.findOneAndUpdate({name: element}, {$push: {questions: question._id}}, {safe: true, upsert: true}, function (err, tag){
                            if(err) {
                                console.log(err);
                            }
                        })
                    });
                }
                res.send({success: true, message: "Question is added successful!"});
                res.end();
            });
        }
        else {
            res.send({success: false, message: "Please, enter correct question data!"});
            res.end();
        }
    },
    updateQuestion: function (req, res, next) {

    },
    deleteQuestion: function (req, res, next) {

    }
};