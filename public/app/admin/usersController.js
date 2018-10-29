app.controller('UsersController', function ($scope, $location, $route, UsersResource, usersService, notifier) {
    var userForDeleteId;
    $scope.users = [];

    usersService.index()
      .then(({ data }) => {
        $scope.users = data.result;
      });

    $scope.deleteUser = function (userId) {
        userForDeleteId = userId;
    };

    $scope.acceptDeleting = function () {
        usersService.deleteUser(userForDeleteId)
            .then(function (response) {
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