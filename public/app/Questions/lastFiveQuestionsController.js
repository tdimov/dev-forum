app.controller('LastFiveQuestionsController', function ($scope, questionsService) {
  $scope.questions = [];

  function getLastFiveQuestions() {
    questionsService.index({ limit: 5 })
      .then(({ data }) => {
        $scope.questions = data.result;
      });
  }

  getLastFiveQuestions();
});