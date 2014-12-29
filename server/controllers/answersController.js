var Answer = require('mongoose').model('Answer'),
    Question = require('mongoose').model('Question'),
    commonValidator = require('../utilities/validation/commonValidator');

module.exports = {
    addAnswer: function (req, res) {
        var currentUser = req.user,
            newAnswer = req.body;

        if(commonValidator.areJsonPropsNullOrEmpty(newAnswer) && currentUser) {
            newAnswer.author = {
                _id: currentUser._id,
                username: currentUser._id
            };

            Answer.create(newAnswer, function (err, answer) {
                if(err || !answer) {
                    console.log("Cannot add an answer: " + err);
                    res.send({success: false, message: "An error occurred while adding an answer"});
                    return;
                }

                Question.update({_id: answer.questionId}, {$inc: {'answersCount': 1}, $set: {lastActiveDate: new Date(), isAnswered: true}}, function (err) {
                    if(err) {
                        console.log("Cannot update answers count: " + err);
                        return
                    }

                    res.send({success: true, message: "Answer is added successful!"});
                    res.end();
                });
            });
        }
        else {
            res.send({success: false, message: "Please, enter correct answer data!"});
            res.end();
        }
    }
};
