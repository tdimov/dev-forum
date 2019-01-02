app.controller('RegisterController', function ($scope, $location, notifier, identity, auth) {
  const SUCCESS_REGISTER = 'Успешно създадохте профил!'
  const FAILED_REGISTER = 'Имаше проблем при съзадаване на профилът Ви';
  const USERNAME_ALREADY_USED = 'Потребителското име вече е използвано!';
  const USERNAME_ALREADY_USED_SERVER_ERROR = 'Email address already used!';

  $scope.identity = identity;

  $scope.register = user => {
    auth.register(user)
      .then(response => {
        successRegister();
      })
      .catch(response => {
        failedRegister(response.data.error);
      });
  };

  function successRegister() {
    notifier.success(SUCCESS_REGISTER);
    $location.path('/login');
  }

  function failedRegister(err) {
    if (err.message === USERNAME_ALREADY_USED_SERVER_ERROR) {
      notifier.error(USERNAME_ALREADY_USED);
    } else {
      notifier.error(FAILED_REGISTER);
    }
  }
});