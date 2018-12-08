app.controller('LoginController', function ($scope, $location, notifier, identity, auth) {
  const SUCCESS_LOGIN = 'Успешно влязохте в системата!';
  const FAILED_LOGIN = 'Невалиден потребите и/или парола!';

  $scope.identity = identity;

  $scope.login = user => {
    auth.login(user)
      .then(() => {
        successLogin();
      })
      .catch(() => {
        failedLogin();
      });
  };

  function successLogin() {
    notifier.success(SUCCESS_LOGIN);
    $location.path('/');
  }

  function failedLogin() {
    notifier.error(FAILED_LOGIN); 
  }
});