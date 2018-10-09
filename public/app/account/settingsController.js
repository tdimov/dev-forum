app.controller('SettingsController', function($scope, $location, identity, auth, notifier, usersService) {
  $scope.user = {};

  usersService.getProfile()
    .then(response => {
      $scope.user = response.data.result;
    });

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