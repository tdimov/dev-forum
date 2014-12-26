app.factory('questionsService', function($http, $q, identity) {
    return {
        getTopQuestions: function (callback) {
            $http.get('/api/topQuestions/').success(function(questions) {
                if(questions) {
                    callback(questions);
                }
            })
        },
        getQuestionById: function (id, callback) {
            $http.get('/api/questions/' + id).success(function(question) {
                if(question) {
                    callback(question);
                }
            })
        },
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