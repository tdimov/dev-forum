app.factory('UsersService', function($q, $http) {
    return {
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