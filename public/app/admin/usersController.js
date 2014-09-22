app.controller('UsersController', function ($scope, UsersResource) {
     $scope.users = UsersResource.query();
});