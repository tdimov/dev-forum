app.controller('SettingsController', function($scope, $location, identity, auth, notifier) {
    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        email: identity.currentUser.email,
        country: identity.currentUser.country,
        city: identity.currentUser.city,
        aboutMe: identity.currentUser.aboutMe,
        website: identity.currentUser.website,
        oldPassword: "",
        newPassword: ""
    };

    $scope.update = function(user) {
        auth.update(user).then(function(response) {
            if(response.success) {
                updateCurrentUser(user);
                notifier.success(response.message);
                $location.path('/');
            }
            else {
                notifier.error(response.message);
            }
        });
    };

    function updateCurrentUser (user) {
        identity.currentUser.firstName = user.firstName;
        identity.currentUser.lastName = user.lastName;
        identity.currentUser.email = user.email;
        if(user.country) {
            identity.currentUser.country = user.country;
        }
        if(user.city) {
            identity.currentUser.city = user.city;
        }
        if(user.aboutMe) {
            identity.currentUser.aboutMe = user.aboutMe;
        }
        if(user.website) {
            identity.currentUser.website = user.website
        }
    }
});