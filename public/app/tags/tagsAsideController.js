app.controller('TagsAsideController', function ($scope, tagsService){
    tagsService.getLimitedTags(function (data) {
        $scope.tags = data;
    })
});