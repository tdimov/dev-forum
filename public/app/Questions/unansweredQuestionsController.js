app.controller("UnansweredQuestionsController", function ($scope, questionsService) {
  questionsService.index({ isAnswered: false }).then(({ data }) => {
    $scope.questions = data.result;
  });
});