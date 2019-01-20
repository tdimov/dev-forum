app.controller("QuestionsAdminController", function ($scope, $location, questionsService, notifier) {
    var questionId;
    const SUCCESS_DELETE_QUESTION = 'Успешно изтрихте въпроса!';
    const FAILED_DELETE_QUESTION = 'Възникна проблем при изтриването на въпроса!';

    questionsService.index().then(({ data }) => {
      $scope.questions = data.result;
    });

    $scope.setQuestionId = function (id) {
      questionId = id;
    };

    $scope.deleteQuestion = index => {
      questionsService.delete(questionId)
        .then(() => {
          const index = $scope.questions.findIndex(question => question.id === questionId);
          $scope.questions.splice(index, 1);
          notifier.success(SUCCESS_DELETE_QUESTION);
        })
        .catch(() => {
          notifier.error(FAILED_DELETE_QUESTION);
        });
    };
});