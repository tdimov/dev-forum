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
      }
    }
});