app.controller('TagsController', function($scope, $location, notifier, tagsService) {
    var tagForDeleteId;
    $scope.tags;

    $scope.addNewTag = function (tag) {
        if(tag) {
            tagsService.addNewTag(tag)
                .then(function (response) {
                    if(response.success) {
                        notifier.success(response.message);
                        $location.path('/');
                    }
                    else {
                        notifier.error(response.message);
                    }
                })
        }
    };

    $scope.deleteTag = function(tagId) {
        tagForDeleteId = tagId;
    };

    $scope.acceptDeleting = function () {
        tagsService.deleteTag(tagForDeleteId)
            .then(function(response) {
                if(response.success) {
                    notifier.success(response.message);
                    $location.path('/');
                }
                else {
                    notifier.error(response.message);
                }
            });
    };

    tagsService.getAllTags(function (data) {
        $scope.tags = data;
    });

    $scope.hasTags = function () {
        if($scope.tags) {
            return false;
        }
        return true;
    }
});