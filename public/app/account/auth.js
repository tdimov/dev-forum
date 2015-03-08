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
                        deferred.resolve(response);
                    }
                    else {
                        deferred.resolve(response);
                    }
                });

            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            $http.post('/logout').success(function (response){
                if(response.success) {
                    identity.currentUser = undefined;
                    deferred.resolve(response);
                }
                else {
                    deferred.resolve(response);
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
        isUserNotAuthenticated: function() {
            if(identity.isAuthenticated()) {
                return false;
            }
            else {
                return $q.reject('not authenticated');
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

            var newUser = new UsersResource(user);
            newUser.$save().then(function (response) {
                identity.currentUser = response.user;
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        update: function (user) {
            var deferred = $q.defer();
            var updatedUser = new UsersResource(user);
            updatedUser._id = identity.currentUser._id;
            updatedUser.$update().then(function(response) {
                deferred.resolve(response);
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    };
});