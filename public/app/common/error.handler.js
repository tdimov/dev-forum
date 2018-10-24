app.factory('errorHandler', function ($location, notifier) {
  const TECHNICAL_ERROR = 'Възникна технически проблем!';
  const SERVER_ERROR_VOTE = 'Already voted!';
  const ALREADY_VOTED = 'Вече сте гласували!';
  const SERVER_ERROR_VOTE_FOR_YOUR_QUESTION = 'Cannot vote for your own question!';
  const CANNOT_VOTE_FOR_YOUR_QUESTION = 'Не може да гласувате за вашият въпрос!';
  const SERVER_ERROR_VOTE_FOR_YOUR_ANSWER = 'Cannot vote for your own answer!';
  const CANNOT_VOTE_FOR_YOUR_ANSWER = 'Не може да гласувате за вашият отговор!';
  const AUTHENTICATION_SERVER_ERROR = 'Authentication failed!';
  const AUTHENTICATION_ERROR = 'Трябва да влезнете в системата!'

  return {
    handle(err) {
      if (err.message === AUTHENTICATION_SERVER_ERROR) {
        notifier.error(AUTHENTICATION_ERROR);
        $location.path('/login')
      } else if (err.message === SERVER_ERROR_VOTE) {
        notifier.error(ALREADY_VOTED);
      } else if (err.message === SERVER_ERROR_VOTE_FOR_YOUR_QUESTION) {
        notifier.error(CANNOT_VOTE_FOR_YOUR_QUESTION);
      } else if (err.message === SERVER_ERROR_VOTE_FOR_YOUR_ANSWER) { 
        notifier.error(CANNOT_VOTE_FOR_YOUR_ANSWER);
      } else {
        return TECHNICAL_ERROR;
      }
    }
  }
});