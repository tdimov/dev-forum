app.factory('questionsService', function($http, $q, identity) {
    return {
        askQuestion: function (question) {
            var deferred = $q.defer();
            $http.post('/api/questions', question)
                .success(function (response) {
                    if(response.success) {
                        deferred.resolve(response);
                    }
                    else {
                        deferred.resolve(response);
                    }
                });

            return deferred.promise;
        }
    };
});