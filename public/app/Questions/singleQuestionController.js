app.controller('SingleQuestionController', function ($scope, $sce, $location, $routeParams, questionsService, answersService, identity, notifier){
    var questionId = $routeParams.id,
        answerId;

    $scope.editorOptions = {
        toolbar: [
            ['document', 'mode'],
            ['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
            ['Cut', 'Copy', 'Paste', 'PasteText'],
            ['Undo', 'Redo'],
            ['Image', 'SpecialChar']
        ],
        height: '300px'
    };
    $scope.hasUser = function () {
        if(identity.isAuthenticated()) {
            return true;
        }

        return false;
    };
//
//    $scope.isLocked = function () {
//        console.log($scope.question);
//        if($scope.question.isLocked) {
//            return true;
//        }
//
//        return false;
//    };

    $scope.setAnswerId = function (id) {
        if (id) {
            answerId = id;
        }
    };

    $scope.voteUpQuestion = function (questionId) {
        if(identity.isAuthenticated()) {
            questionsService.voteUp(questionId)
                .then(function (response) {
                    if (response.success) {
                        notifier.success(response.message);
                        $location.path('/');
                    }
                    else {
                        notifier.error(response.message);
                    }
                });
        }
        else {
            $location.path('/login');
        }
    };

    $scope.voteDownQuestion = function (questionId) {
        if(identity.isAuthenticated()) {
            questionsService.voteDown(questionId)
                .then(function (response) {
                    if (response.success) {
                        notifier.success(response.message);
                        $location.path('/');
                    }
                    else {
                        notifier.error(response.message);
                    }
                });
        }
        else {
            $location.path('/login');
        }
    };

    $scope.voteUpAnswer = function (answerId) {
        var ids = {
            answerId: answerId,
            questionId: questionId
        };

        if(identity.isAuthenticated()) {
            answersService.voteUp(ids)
                .then(function (response) {
                    if (response.success) {
                        notifier.success(response.message);
                        $location.path('/');
                    }
                    else {
                        notifier.error(response.message);
                    }
                });
        }
        else {
            $location.path('/login');
        }
    };

    $scope.voteDownAnswer = function (answerId) {
        var ids = {
            answerId: answerId,
            questionId: questionId
        };

        if(identity.isAuthenticated()) {
            answersService.voteDown(ids)
                .then(function (response) {
                    if (response.success) {
                        notifier.success(response.message);
                        $location.path('/');
                    }
                    else {
                        notifier.error(response.message);
                    }
                });
        }
        else {
            $location.path('/login');
        }
    };

    $scope.addAnswer = function (newAnswer) {
        if(identity.isAuthenticated()) {
            newAnswer.isQuestionLocked = $scope.question.isLocked;
            if(newAnswer && newAnswer.text) {
                newAnswer.questionId = questionId;
                questionsService.addAnswer(newAnswer)
                    .then(function (response) {
                        if(response.success) {
                            notifier.success(response.message);
                            $location.path('/');
                        }
                        else {
                            notifier.error(response.message);
                        }
                    });
            }
            else{
                notifier.error("Please, enter your answer!");
            }
        }
        else {
            $location.path('/login');
        }
    };

    $scope.addComment = function (newComment) {
        if(identity.isAuthenticated()) {
            newComment.isQuestionLocked = $scope.question.isLocked;
            if(newComment && newComment.text) {
                newComment.answerId = answerId;
                questionsService.addComment(newComment)
                    .then(function (response) {
                        if(response.success) {
                            notifier.success(response.message);
                            $location.path('/');
                        }
                        else {
                            notifier.error(response.message);
                        }
                    });
            }
            else {
                notifier.error("Please, enter your comment!");
            }
        }
        else {
            $location.path('/login');
        }

    };

    questionsService.getQuestionById(questionId, function (data) {
        $scope.question = data;
    });
});