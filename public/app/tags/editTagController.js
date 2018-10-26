app.controller('EditTagController', function($scope, $routeParams, $location, notifier, tagsService){
    tagsService.get($routeParams.id)
      .then(({ data }) => {
        $scope.tag = data.result;
      });

    $scope.update = function (updatedTag) {
        tagsService.updateEditedTag(updatedTag)
            .then(function(response) {
                if(response.success) {
                    notifier.success(response.message);
                    $location.path('/');
                }
                else {
                    notifier.error(response.message);
                }
            });
    }
});