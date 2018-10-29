app.factory('identity', function (){
    return {
      getUser() {
        return JSON.parse(localStorage.getItem('user'));
      },
      getToken() {
        return localStorage.getItem('token');
      },
      setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
      },
      setToken(token) {
        localStorage.setItem('token', token);
      },
      removeUser() {
        localStorage.removeItem('user');
      },
      removeToken() {
        localStorage.removeItem('token');
      },
      isInRole(role) {
        return this.getUser() && this.getUser().roles.indexOf(role) > -1;
      },
      isAuthenticated: function () {
        return !!this.getUser() && !!this.getToken();
      },
      isAuthorizedForRole: function (role) {
        return !!this.getUser() && this.getUser().roles.indexOf(role) > -1;
      }
    }
});