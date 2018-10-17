app.factory('answersService', function ($http, $q, httpService) {
    return {
      create(questionId, payload) {
        return httpService.post(`/questions/${questionId}/answers`, payload);
      },
      vote(questionId, answerId, isPositive) {
        return httpService.put(`/questions/${questionId}/answers/${answerId}/vote`, { isPositive });
      },
        voteUp: function (ids) {
            var deferred = $q.defer();
//            var vote = {
//                answerId: answerId
//            };
            $http.post('/api/answersVoteUp', ids)
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
        voteDown: function (ids) {
            var deferred = $q.defer();
//            var vote = {
//                answerId: answerId
//            };
            $http.post('/api/answersVoteDown', ids)
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
    }
});