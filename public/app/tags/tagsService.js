app.factory('tagsService', function($http, $q, identity) {
    return {
        addNewTag: function (tag) {
            var deferred = $q.defer();
            $http.post('/api/tags', tag)
                .success(function (response) {
                    if(response.success) {
                        deferred.resolve(response);
                    }
                    else {
                        deferred.resolve(response);
                    }
                });

            return deferred.promise;
        },
        getAllTags: function(callback) {
            $http.get('/api/tags').success(function(data) {
                callback(data);
            });
        },
        getLimitedTags: function (callback) {
            $http.get('/api/tagsAside').success(function(data) {
                callback(data);
            });
        },
        getTagsAskQuestion: function (callback) {
            $http.get('/tags/askQuestion').success(function(data){
                callback(data);
            });
        },
        updateEditedTag: function(tag) {
            var deferred = $q.defer();

            $http.put('/api/tags/', {tag: tag})
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        },
        deleteTag: function (tagId) {
            var deferred = $q.defer();

            $http.delete('/api/tags/' + tagId)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    };
});