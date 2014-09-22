app.controller('AccountController', function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function (user) {
        auth.login(user).then(function(success) {
            if(success) {
                notifier.success("Successful login!");
                $location.path('/');
            }
            else {
                notifier.error("Wrong username or password!");
            }
        });
    };

    $scope.logout = function () {
        auth.logout().then(function(success){
            if(success) {
                notifier.success('Successful logout!');
                $location.path('/');
            }
            else {
                notifier.success('Logout failed!');
            }
        });
    }
});