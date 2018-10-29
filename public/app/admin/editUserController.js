app.controller('EditUserController', function($scope, $routeParams, $location, usersService, notifier) {
  usersService.get($routeParams.id)
    .then(({ data }) => {
      $scope.user = data.result;
    });

  $scope.update = function (updatedUser) {
    usersService.updateEditedUser(updatedUser)
      .then(function(response) {
        if(response.success) {
            notifier.success(response.message);
            $location.path('/');
        }
        else {
            notifier.error(response.message);
        }
    });
  }
});