app.controller('SingleQuestionController', function ($scope, $sce, $location, $routeParams, questionsService, answersService, identity, notifier){
  const SUCCESS_CREATED_ANSWER = 'Успешно добавихте отговор!';
  const ERROR_CREATED_ANSWER = 'Възникна проблем при добавянето на отговор!';

    var questionId = $routeParams.id,
        answerId;

  questionsService.get(questionId).then(({ data }) => {
    $scope.question = data.result;
  });

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

    $scope.addAnswer = newAnswer => {
      if (newAnswer && newAnswer.text) {
        answersService.create(questionId, newAnswer)
          .then(({ data }) => {
            if (!$scope.question.answers) {
              $scope.question.answers = [];
            }

            $scope.question.answers.push(data.result);

            notifier.success(SUCCESS_CREATED_ANSWER);
          })
          .catch(() => {
            notifier.error(ERROR_CREATED_ANSWER);
          });
      }
    }

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
});