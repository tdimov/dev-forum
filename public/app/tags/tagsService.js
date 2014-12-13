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
                //if(data) {
                    callback(data);
                //}
            });
        },
        getTagById: function (id, callback) {
            $http.get('/api/tags/' + id).success(function(tag) {
                if(tag) {
                    callback(tag);
                }
            })
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