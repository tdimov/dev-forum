app.controller('UserDetailsController', function ($scope, $routeParams, usersService) {
    usersService.getUserById($routeParams.id, function (data) {
        $scope.user = data;
    });
});