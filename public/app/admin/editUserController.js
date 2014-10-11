app.controller('EditUserController', function($scope, $routeParams, UsersResource) {
    UsersResource.get({id: $routeParams.id }, function(user) {
        $scope.user = user;
    });
});