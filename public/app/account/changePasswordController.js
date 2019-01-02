app.controller('ChangePasswordController', function ($scope, $route, usersService, notifier) {
  const SUCCESS_PASSWORD_CHANGE = 'Успешно сменихте паролата си';
  const WRONG_OLD_PASSWORD = 'Старата парлола не е вярна!';
  const CHANGE_PASSWORD_ERROR = 'Възникна проблем при смяната на паролата!';
  const WRONG_OLD_PASSWORD_SERVER_ERROR = 'Wrong old password!';

  $scope.passwordData = {
    oldPassword: null,
    newPassword: null
  };

  $scope.changePassword = () => {
    usersService.changePassword($scope.passwordData)
      .then(() => {
        successChangePassword()
      })
      .catch(response => {
        failedChangePassword(response.data.error);
      });
  }

  function successChangePassword() {
    notifier.success(SUCCESS_PASSWORD_CHANGE);
  }

  function failedChangePassword(err) {
    if (err.message === WRONG_OLD_PASSWORD_SERVER_ERROR) {
      notifier.error(WRONG_OLD_PASSWORD);
    } else {
      notifier.error(CHANGE_PASSWORD_ERROR);
    }
  }
});