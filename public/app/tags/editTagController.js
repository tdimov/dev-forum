app.controller('EditTagController', function($scope, $routeParams, $location, notifier, tagsService){
    $scope.tag = tagsService.getTagById($routeParams.id, function(tag) {
        $scope.tag = tag;
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