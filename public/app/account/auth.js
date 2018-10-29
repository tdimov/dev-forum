app.factory('auth', function ($q, $http, identity, httpService) {
  return {
    register(user) {
      return httpService.post('/register', user);
    },
    login(user) {
      return httpService.post('/login', user)
        .then(({ data }) => {
          const { result } = data;
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
      return identity.isInRole(role);
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
    }
  };
});