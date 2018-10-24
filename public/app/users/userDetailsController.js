app.controller('UserDetailsController', function ($scope, $routeParams, usersService) {
  $scope.user = {};

  usersService.get($routeParams.id)
    .then(({ data }) => {
      debugger;
      $scope.user = data.result;
    });
});