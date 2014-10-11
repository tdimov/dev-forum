app.controller('SettingsController', function($scope, $location, identity, auth, notifier) {
    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        email: identity.currentUser.email
    };

    $scope.update = function(user) {
        auth.update(user).then(function(response) {
            if(response.success) {
                identity.currentUser.firstName = user.firstName;
                identity.currentUser.lastName = user.lastName;
                identity.currentUser.email = user.email;
                notifier.success(response.message);
                $location.path('/');
            }
            else {
                notifier.error(response.message);
            }
        });
    }
});