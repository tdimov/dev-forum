app.factory('auth', function ($q, $http, identity, UsersResource) {
    return {
        login: function (user) {
            var deferred = $q.defer();

            $http.post('/login', user)
                .success(function (response) {
                    if(response.success) {
                        var user = new UsersResource();
                        angular.extend(user, response.user);
                        identity.currentUser = user;
                        deferred.resolve(true);
                    }
                    else {
                        deferred.resolve(false);
                    }
                });

            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            $http.post('/logout').success(function (response){
                if(response.success) {
                    identity.currentUser = undefined;
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        },
        isAuthorizedForRole: function (role) {
            if(identity.isAuthorizedForRole(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        isUserAuthenticated: function () {
            if(!identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('authenticated');
            }
        },
        register: function (user) {
            var deferred = $q.defer();

            var user = new UsersResource(user);
            user.$save().then(function (response) {
                identity.currentUser = response.user;
                deferred.resolve(response.success);
            }, function (response) {
                deferred.reject(response.success);
            });

            return deferred.promise;
        }
    };
});