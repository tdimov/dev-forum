var Comment = require('mongoose').model('Comment'),
    Answer = require('mongoose').model('Answer'),
    Question = require('mongoose').model('Question'),
    User = require('mongoose').model('User'),
    commonValidator = require('../utilities/validation/commonValidator');

module.exports = {
    addComment: function (req, res) {
        var currentUser = req.user,
            newComment = req.body;

        if(commonValidator.areJsonPropsNullOrEmpty(newComment) && currentUser) {
            newComment.author = {
                _id: currentUser._id,
                username: currentUser.username
            };
            User.findOneAndUpdate({_id: currentUser._id}, {$inc: {'reputation': 1}}, function (err) {
                if(err) {
                    console.log("addComment Cannot update user: " + err);
                    return;
                }

                Comment.create(newComment, function (err, comment) {
                    if(err || !comment) {
                        console.log("addComment Cannot create new comment: " + err);
                        return;
                    }

                    Answer.findByIdAndUpdate({_id: comment.answerId}, {$push: {comments: comment._id}}, function (err, answer) {
                        if(err || !answer) {
                            console.log("addComment Cannot update answer: " + err);
                            return;
                        }
                        Question.findByIdAndUpdate({_id: answer.questionId}, {$set: {lastActiveDate: new Date()}}, function (err, question) {
                            if(err || !question) {
                                console.log("addComment Cannot update question: " + err);
                                return;
                            }

                            res.send({success: true, message: "Comment is added successful!"});
                            res.end();
                        });
                    });
                });
            });
        }
        else {
            res.send({success: false, message: "Please, enter correct comment data!"});
            res.end();
        }
    }
};