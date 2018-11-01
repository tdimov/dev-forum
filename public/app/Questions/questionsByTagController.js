app.controller('QuestionsByTagController', function ($scope, $routeParams, questionsService) {
  $scope.questions = []
  $scope.tagName = $routeParams.tag;

  questionsService.index({ tagName: $routeParams.tag })
    .then(({ data }) => {
      $scope.questions = data.result;
    });
});