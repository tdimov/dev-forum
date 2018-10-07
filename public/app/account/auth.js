app.factory('auth', function ($q, $http, identity, UsersResource) {
    return {
      login(user) {
        return $http.post('/login', user)
          .then(function (response) {
            const { result } = response.data;
            const user = new UsersResource();

            angular.extend(user, result.user);
            identity.setUser(result.user);
            identity.setToken(result.token);
          });
      },
      logout() {
        return $http.post('/logout').then(() => {
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