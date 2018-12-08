app.controller('TagsAsideController', function ($scope, tagsService) {
  $scope.tags = [];

  function getLastFiveTags() {
    tagsService.index({ limit: 5 })
      .then(({ data }) => {
        $scope.tags = data.result;
      });
  }

  getLastFiveTags();
});