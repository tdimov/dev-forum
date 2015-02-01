app.controller("UsersByReputationController", function ($scope, notifier, usersService) {
    usersService.getUsers(3, function (data) {
        $scope.hasSearchResults = true;
        $scope.users = data;
    });

    $scope.searchUser = function () {
        if($scope.query) {
            usersService.searchUser($scope.query, function (users) {
                if(users.length > 0) {
                    $scope.users = users;
                    $scope.hasSearchResults = true;
                }
                else {
                    $scope.users = [];
                    $scope.hasSearchResults = false;
                }
            })
        }
        else {
            notifier.error("Please, enter which user you are looking for!");
        }
    }
});