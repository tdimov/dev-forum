app.controller('QuestionsController', function ($scope, $routeParams, questionsService) {
  function getQuestions() {
    questionsService.index()
      .then(({ data }) => {
        $scope.questions = data.result;
      });
  }
  
  getQuestions();
});