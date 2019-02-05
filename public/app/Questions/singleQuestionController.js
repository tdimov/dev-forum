app.controller('SingleQuestionController', function ($scope, $sce, $location, $routeParams, questionsService, answersService, identity, notifier, errorHandler){
  const SUCCESS_CREATED_ANSWER = 'Успешно добавихте отговор!';
  const ERROR_CREATED_ANSWER = 'Възникна проблем при добавянето на отговор!';
  const SUCCESS_VOTE = 'Гласувахте успешно!';
  const ERROR_VOTE = 'Възникна проблем при гласуването!';
  const SERVER_ERROR_VOTE = 'Already voted!';
  const ALREADY_VOTED = 'Вече сте гласували!';
  const AUTHENTICATION_SERVER_ERROR = 'Authentication failed!';
  const AUTHENTICATION_ERROR = 'Трябва да влезнете в системата!'

  $scope.identity = identity;
  $scope.newAnswer = {
    text: ''
  };

  var questionId = $routeParams.id,
        answerId;

  function getQuestion() {
    questionsService.get(questionId).then(({ data }) => {
      $scope.question = data.result;
    });
  }

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
      ['Undo', 'Redo']
    ],
    height: '300px'
  };

  $scope.addAnswer = () => {
    if ($scope.newAnswer.text) {
      answersService.create(questionId, $scope.newAnswer)
        .then(({ data }) => {
          if (!$scope.question.answers) {
            $scope.question.answers = [];
          }

          data.result.author = identity.getUser();

          $scope.question.answers.push(data.result);

          notifier.success(SUCCESS_CREATED_ANSWER);
          $scope.newAnswer.text = '';
        })
        .catch(() => {
          notifier.error(ERROR_CREATED_ANSWER);
        });
    }
  }

  getQuestion();
});