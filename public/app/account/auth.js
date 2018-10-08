app.factory('auth', function ($q, $http, identity, UsersResource, httpService) {
  return {
    register(user) {
      return httpService.post('/register', user);
    },
    login(user) {
      return httpService.post('/login', user)
        .then(response => {
          const { result } = response.data;
          const user = new UsersResource();

          angular.extend(user, result.user);
          identity.setUser(result.user);
          identity.setToken(result.token);
        });
    },
    logout() {
      return httpService.post('/logout').then(() => {
        identity.removeUser();
        identity.removeToken();
      });
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