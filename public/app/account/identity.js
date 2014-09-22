app.factory('identity', function ($window, UsersResource){
    var user;
    var currentUser = $window.siteCurrentUser;
    if(currentUser) {
        user = new UsersResource();
        angular.extend(user, currentUser);
    }

    return {
        currentUser: user,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});