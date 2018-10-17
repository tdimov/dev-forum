app.controller('SingleQuestionController', function ($scope, $sce, $location, $routeParams, questionsService, answersService, identity, notifier){
  const SUCCESS_CREATED_ANSWER = 'Успешно добавихте отговор!';
  const ERROR_CREATED_ANSWER = 'Възникна проблем при добавянето на отговор!';
  const SUCCESS_VOTE = 'Гласувахте успешно!';
  const ERROR_VOTE = 'Възникна проблем при гласуването!';
  const SERVER_ERROR_VOTE = 'Already voted!';
  const ALREADY_VOTED = 'Вече сте гласували!';

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
        const { error } = data;

        if (error.message === SERVER_ERROR_VOTE) {
          notifier.error(ALREADY_VOTED);
        } else {
          notifier.error(ERROR_VOTE);
        }
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
        const { error } = data;

        if (error.message === SERVER_ERROR_VOTE) {
          notifier.error(ALREADY_VOTED);
        } else {
          notifier.error(ERROR_VOTE);
        }
      });
  }

  $scope.voteUpQuestion = () => {
    voteQuestion(true);
  };

  $scope.voteDownQuestion = () => {
    voteQuestion(false);
  };

  $scope.voteUpAnswer = (answerId, index) => {
    voteAnswer(answerId, index, true);
  };

  $scope.voteDownAnswer = (answerId, index) => {
    voteAnswer(answerId, index, false);
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