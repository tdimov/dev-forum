app.controller('QuestionsByTagController', function ($scope, $routeParams, questionsService) {
  $scope.questions = []
  $scope.tagName = $routeParams.tag;

  function getQuestionsByTag() {
    questionsService.index({ tagName: $routeParams.tag })
      .then(({ data }) => {
        $scope.questions = data.result;
      });
  }

  getQuestionsByTag();
});