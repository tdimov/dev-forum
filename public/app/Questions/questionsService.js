app.factory('questionsService', function($http, $q) {
    return {
        getQuestions: function (pageId, callback) {
            $http.get('/api/questions/').success(function(questions) {
                if(questions) {
                    callback(questions);
                }
            })
        },
        getTopQuestions: function (callback) {
            $http.get('/api/topQuestions/').success(function(questions) {
                if(questions) {
                    callback(questions);
                }
            })
        },
        getUnansweredQuestions: function (callback) {
            $http.get('/api/unansweredQuestions').success(function(questions) {
                if(questions) {
                    callback(questions);
                }
            })
        },
        getLastFiveQuestions: function (callback) {
            $http.get('/api/lastFiveQuestions').success(function(questions) {
                if(questions) {
                    callback(questions);
                }
            })
        },
        getQuestionsByTag: function (tag, callback) {
            $http.get('/api/questionsByTag/' + tag).success(function(questions) {
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
        addAnswer: function (newAnswer) {
            var deferred = $q.defer();

            $http.post('/api/answers', newAnswer)
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
        addComment: function (newComment) {
            var deferred = $q.defer();

            $http.post('/api/comments', newComment)
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
        voteUp: function (questionId) {
            var deferred = $q.defer();
            var vote = {
                questionId: questionId
            };
            $http.post('/api/questionsVoteUp', vote)
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
        voteDown: function (questionId) {
            var deferred = $q.defer();
            var vote = {
                questionId: questionId
            };

            $http.post('/api/questionsVoteDown', vote)
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
        lockQuestion: function (questionId) {
            var deferred = $q.defer();
            var id = {questionId: questionId}
            $http.put('/api/lockQuestion/', id)
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