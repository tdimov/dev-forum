app.controller('UserDetailsController', function ($scope, $routeParams, usersService, questionsService) {
  $scope.user = {};
  $scope.questions = [];
 
  function getUser() {
    usersService.get($routeParams.id)
      .then(({ data }) => {
        $scope.user = data.result;
      });
  }

  function getQuestions() {
    questionsService.index({ author: $routeParams.id })
    .then(({ data }) => {
      $scope.questions = data.result;
    });
  }

  getUser();
  getQuestions();
});