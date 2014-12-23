var Question = require('mongoose').model('Question'),
    Tag = require('mongoose').model('Tag'),
    User = require('mongoose').model('User'),
    Answer = require('mongoose').model('Answer'),
    questionsValidator = require('../utilities/validation/questionsValidator'),
    tagsController = require('../controllers/tagsController');

function createTagJsonFromArr(items) {
    var json = [];

    for(var i = 0, len = items.length; i < len; i++) {
        json.push({name: items[i].trim()});
    }

    return json;
}

//remove it
function getAuthor(authorId) {
    User.findOne({_id: authorId}).exec(function (err, author) {
        if(err) {
            console.log("Author cannot be found: " + err);
        }
        var authorVM = {
            id: author._id,
            username: author.username
        };

        return authorVM;
    });
}

function getQuestionTags(questionId) {
}

function getTags(tagId) {
}

function getAnswers(questionId) {
}

//TODO: add tags and questionsTags
module.exports = {
    getQuestions: function (req, res, next) {
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