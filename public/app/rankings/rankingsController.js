app.controller('RankingsController', function($scope, $routeParams, $location, notifier, rankingService) {
  $scope.ranking;

  rankingService.getCurrentRanking()
    .then(({ data }) => {
      $scope.ranking = data.result;
    });
});