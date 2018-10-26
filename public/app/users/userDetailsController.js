app.controller('UserDetailsController', function ($scope, $routeParams, usersService, questionsService) {
  $scope.user = {};
  $scope.questions = [];
 
  usersService.get($routeParams.id)
    .then(({ data }) => {
      $scope.user = data.result;
    });

  questionsService.index({ author: $routeParams.id })
    .then(({ data }) => {
      $scope.questions = data.result;
    });
});