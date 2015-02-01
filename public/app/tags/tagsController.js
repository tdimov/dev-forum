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
        if(data) {
            $scope.tags = data;
            $scope.hasSearchResults = true;
        }
        else {
            $scope.hasSearchResults = false;
        }
    });

    $scope.hasTags = function () {
        if($scope.tags) {
            return false;
        }
        return true;
    };

    $scope.searchTag = function () {
        if($scope.query) {
            tagsService.searchTag($scope.query, function (tags) {
                if(tags.length > 0) {
                    $scope.tags = tags;
                    $scope.hasSearchResults = true;
                }
                else {
                    $scope.tags = [];
                    $scope.hasSearchResults = false;
                }
            })
        }
        else {
            notifier.error("Please, enter which tag you are looking for!");
        }
    }
});