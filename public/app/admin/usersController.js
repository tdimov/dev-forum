app.controller('UsersController', function ($scope, $location, $route, UsersResource, UsersService, notifier) {
    var userForDeleteId;
    $scope.users = UsersResource.query();

    $scope.deleteUser = function (userId) {
        userForDeleteId = userId;
    };

    $scope.acceptDeleting = function () {
        UsersService.deleteUser(userForDeleteId)
            .then(function (response) {
                if(response.success) {
                    notifier.success(response.message);
                    //TODO: choose location path or reload whole page
                    //$location.path('/');
                    $route.reload();
                }
                else {
                    notifier.error(response.message);
                }
            });
    }
});