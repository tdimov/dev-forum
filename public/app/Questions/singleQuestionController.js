app.controller('SingleQuestionController', function ($scope, $sce, $location, $routeParams, questionsService, answersService, identity, notifier, errorHandler){
  const SUCCESS_CREATED_ANSWER = 'Успешно добавихте отговор!';
  const ERROR_CREATED_ANSWER = 'Възникна проблем при добавянето на отговор!';
  const SUCCESS_VOTE = 'Гласувахте успешно!';
  const ERROR_VOTE = 'Възникна проблем при гласуването!';
  const SERVER_ERROR_VOTE = 'Already voted!';
  const ALREADY_VOTED = 'Вече сте гласували!';
  const AUTHENTICATION_SERVER_ERROR = 'Authentication failed!';
  const AUTHENTICATION_ERROR = 'Трябва да влезнете в системата!'

    var questionId = $routeParams.id,
        answerId;

  questionsService.get(questionId).then(({ data }) => {
    $scope.question = data.result;
  });

  function voteQuestion(isPositive) {
    questionsService.vote(questionId, isPositive)
      .then(() => {
        if (isPositive) {
          $scope.question.votes++;
        } else {
          $scope.question.votes--;
        }
        notifier.success(SUCCESS_VOTE);
      })
      .catch(({ data }) => {
        errorHandler.handle(data.error);
      });
  }

  function voteAnswer(answerId, index, isPositive) {
    answersService.vote(questionId, answerId, isPositive)
      .then(() => {
        if (isPositive) {
          $scope.question.answers[index].votes++;
        } else {
          $scope.question.answers[index].votes--;
        }
        notifier.success(SUCCESS_VOTE);
      })
      .catch(({ data }) => {
        errorHandler.handle(data.error);
      });
  }

  $scope.voteUpQuestion = () => {
    if (identity.isAuthenticated()) {
      voteQuestion(true);
    } else {
      $location.path('/login');
    }
  };

  $scope.voteDownQuestion = () => {
    if (identity.isAuthenticated()) {
      voteQuestion(false);
    } else {
      $location.path('/login');
    }
  };

  $scope.voteUpAnswer = (answerId, index) => {
    if (identity.isAuthenticated()) {
      voteAnswer(answerId, index, true);
    } else {
      $location.path('/login');
    }
  };

  $scope.voteDownAnswer = (answerId, index) => {
    if (identity.isAuthenticated()) {
      voteAnswer(answerId, index, false);
    } else {
      $location.path('/login');
    }
  };

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