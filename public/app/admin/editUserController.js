app.controller('EditUserController', function($scope, $routeParams, $location, UsersResource, UsersService, notifier) {
    UsersResource.get({id: $routeParams.id }, function(user) {
        $scope.user = user;
    });

    $scope.update = function (updatedUser) {
        UsersService.updateEditedUser(updatedUser)
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