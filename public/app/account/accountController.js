app.controller('AccountController', function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function (user) {
        auth.login(user).then(function(response) {
            if(response.success) {
                notifier.success(response.message);
                $location.path('/');
            }
            else {
                notifier.error(response.message);
            }
        });
    };

    $scope.logout = function () {
        auth.logout().then(function(response){
            if(response.success) {
                notifier.success(response.message);
                $location.path('/');
            }
            else {
                notifier.error('Logout failed!');
            }
        });
    };

    $scope.register = function (user) {
        console.log(user);
        auth.register(user).then(function (response) {
            if(response.success) {
                notifier.success(response.message);
                $location.path('/');
            }
            else {
                notifier.error(response.message);
            }
        })
    };
});