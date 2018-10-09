app.controller('SettingsController', function($scope, $location, identity, notifier, usersService) {
  const SUCCESS_UPDATE_PROFILE = 'Успешно променихте профила си!';
  const FAILED_UPDATE_PROFILE = 'Имаше проблем при промяната на профила!';

  $scope.user = {};

  usersService.getProfile()
    .then(response => {
      $scope.user = response.data.result;
    });

  $scope.update = user => {
    usersService.updateProfile(user)
      .then(() => {
        updateCurrentUser();
        notifier.success(SUCCESS_UPDATE_PROFILE);
        $location.path('/');
      })
      .catch(() => {
        notifier.error(FAILED_UPDATE_PROFILE);
      });
  };

  function updateCurrentUser() {
    const currentUser = identity.getUser();

    identity.setUser( {
      ...currentUser,
      firstName: $scope.user.firstName,
      lastName: $scope.user.lastName,
      email: $scope.user.email
    });
  }
});