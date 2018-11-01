app.controller("UnansweredQuestionsController", function ($scope, questionsService) {
  questionsService.index({ notAnswered: true }).then(({ data }) => {
    $scope.questions = data.result;
  });
});