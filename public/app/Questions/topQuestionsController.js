app.controller("TopQuestionsController", function ($scope, questionsService) {
    questionsService.index().then(({ data }) => {
      $scope.questions = data.result;
    });
});