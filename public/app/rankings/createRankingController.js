app.controller('CreateRankingController', function($scope, $routeParams, $location, notifier, rankingService) {
  const SUCCESS_CREATED_RANKING = 'Успешно създадохте ново класиране!';

  $scope.ranking = {};

  $scope.create = () => {
    rankingService.create($scope.ranking)
      .then(() => {
        notifier.success(SUCCESS_CREATED_RANKING);
        $location.path('/ranking');
      });
  }
});