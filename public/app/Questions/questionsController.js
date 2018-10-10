app.controller('QuestionsController', function ($scope, $routeParams, questionsService) {
    questionsService.index()
      .then(({ data }) => {
        $scope.questions = data.result;
      });
});