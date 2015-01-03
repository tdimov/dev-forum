app.factory('usersService', function($q, $http) {
    return {
        getUsers: function (itemsPerPage, callback) {
            $http.get('/api/usersByReputation/').success(function(users) {
                if(users) {
                    callback(users);
                }
            })
        },
        updateEditedUser: function (user) {
            var deferred = $q.defer();

            $http.put('/api/users/:user', {user: user})
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        },
        deleteUser: function (userId) {
            var deferred = $q.defer();

            $http.delete('/api/users/' + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
});