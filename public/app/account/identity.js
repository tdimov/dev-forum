app.factory('identity', function ($window){
    var currentUser = $window.siteCurrentUser;

    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    }
});