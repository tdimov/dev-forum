app.controller('AccountController', function ($scope, $location, notifier, identity, auth) {
  const SUCCESS_LOGIN = 'Успешно влязохте в системата!';
  const FAILED_LOGIN = 'Невалиден потребите и/или парола!';
  const SUCCESS_LOGOUT = 'Успешно излязохте!';
  const FAILED_LOGOUT = 'Имаше проблем при излизането от системата!';

  $scope.identity = identity;

  $scope.login = user => {
    auth.login(user)
      .then(() => {
        notifier.success(SUCCESS_LOGIN);
        $location.path('/');
      })
      .catch(() => {
        notifier.error(FAILED_LOGIN);
      });
  };

  $scope.logout = () => {
    auth.logout()
      .then(() => {
        notifier.success(SUCCESS_LOGOUT);
        $location.path('/');
      })
      .catch(() => {
        notifier.error(FAILED_LOGOUT);
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