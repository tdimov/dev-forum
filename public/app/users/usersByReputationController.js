app.controller("UsersByReputationController", function ($scope, usersService) {
    usersService.getUsers(3, function (data) {
        $scope.users = data;
    });
});