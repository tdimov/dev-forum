app.controller('EditUserController', function($scope, $routeParams, $location, usersService, notifier) {
    usersService.getUserById($routeParams.id, function (user) {
        $scope.user = user;
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