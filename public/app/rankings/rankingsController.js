app.controller('RankingsController', function($scope, notifier, identity, rankingService) {
  const SUCCESS_RANKING_FINISHED = 'Успешно приключихте класирането!'

  $scope.ranking;
  $scope.identity = identity;

  function loadCurrentRanking() {
    rankingService.getCurrentRanking()
      .then(({ data }) => {
        $scope.ranking = data.result;
      });
  }
  
  $scope.finishCurrentRanking = () => {
    rankingService.finishCurrentRanking()
      .then(() => {
        notifier.success(SUCCESS_RANKING_FINISHED);
        loadCurrentRanking();
      });
  }

  loadCurrentRanking();
});