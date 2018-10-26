app.factory('usersService', function($q, $http, httpService) {
    return {
      index() {
        return httpService.get('/users');
      },
      get(id) {
        return httpService.get(`/users/${id}`);
      },
      getProfile() {
        return httpService.get('/users/profile/me');
      },
      updateProfile(user) {
        return httpService.put('/users/profile/me', user);
      },
        getUsers: function (itemsPerPage, callback) {
            $http.get('/api/usersByReputation/').success(function(users) {
                if(users) {
                    callback(users);
                }
            })
        },
        getUserById: function (id, callback) {
            $http.get('/api/users/' + id)
                .success(function (response) {
                    if(response) {
                        callback(response);
                    }
                });
        },
        searchUser: function (query, callback) {
            $http.get('/users/searchUser/' + query).success(function (data) {
                if(data) {
                    callback(data);
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