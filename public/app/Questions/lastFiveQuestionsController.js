app.controller('LastFiveQuestionsController', function ($scope, questionsService){
  questionsService.index({ limit: 5 })
    .then(({ data }) => {
      $scope.questions = data.result;
    });
});