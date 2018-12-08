app.controller("UnansweredQuestionsController", function ($scope, questionsService) {
  $scope.questions = [];

  function getUnansweredQuestions() {
    questionsService.index({ notAnswered: true }).then(({ data }) => {
      $scope.questions = data.result;
    });
  }

  getUnansweredQuestions();
});