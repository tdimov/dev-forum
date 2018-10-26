app.controller('TagsAdminListController', function($scope, $location, notifier, tagsService) {
  var tagForDeleteId;
  $scope.tags = [];

  tagsService.index()
    .then(({ data }) => {
      $scope.tags = data.result;
    })
});