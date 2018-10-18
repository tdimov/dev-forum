app.factory('errorHandler', function ($location, notifier) {
  const TECHNICAL_ERROR = 'Възникна технически проблем!';
  const SERVER_ERROR_VOTE = 'Already voted!';
  const ALREADY_VOTED = 'Вече сте гласували!';
  const AUTHENTICATION_SERVER_ERROR = 'Authentication failed!';
  const AUTHENTICATION_ERROR = 'Трябва да влезнете в системата!'

  return {
    handle(err) {
      if (err.message === AUTHENTICATION_SERVER_ERROR) {
        notifier.error(AUTHENTICATION_ERROR);
        $location.path('/login')
      } else if (err.message === SERVER_ERROR_VOTE) {
        notifier.error(ALREADY_VOTED);
      } else {
        return TECHNICAL_ERROR;
      }
    }
  }
});