app.controller('RegisterController', function ($scope, $location, notifier, identity, auth) {
  const SUCCESS_REGISTER = 'Успешно създадохте профил!'
  const FAILED_REGISTER = 'Имаше проблем при съзадаване на профилът Ви';

  $scope.identity = identity;

  $scope.register = user => {
    auth.register(user)
      .then(response => {
        successRegister();
      })
      .catch(() => {
        failedRegister();
      });
  };

  function successRegister() {
    notifier.success(SUCCESS_REGISTER);
    $location.path('/login');
  }

  function failedRegister() {
    notifier.error(FAILED_REGISTER);
  }
});