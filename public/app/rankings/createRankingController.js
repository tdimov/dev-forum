app.controller('CreateRankingController', function($scope, $routeParams, $location, notifier, rankingService) {
  const SUCCESS_CREATED_RANKING = 'Успешно създадохте ново класиране!';
  const FAILED_CREATED_RANKING = 'Възникна проблем при създаването на ново класиране!!';

  $scope.ranking = {};

  $scope.create = () => {
    rankingService.create($scope.ranking)
      .then(() => {
        successCreateRanking();
      })
      .catch(() => {
        failedCreateRanking();
      });
  }

  function successCreateRanking() {
    notifier.success(SUCCESS_CREATED_RANKING);
    $location.path('/ranking');
  }

  function failedCreateRanking() {
    notifier.success(FAILED_CREATED_RANKING);
  }
});