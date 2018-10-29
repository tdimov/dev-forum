app.controller('TagsAsideController', function ($scope, tagsService){
  tagsService.index({ limit: 5 })
    .then(({ data }) => {
      $scope.tags = data.result;
    });
});