app.factory('UsersResource', function ($resource) {
    var usersResource = $resource('/api/users/:id', {_id: '@id'});

    usersResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return usersResource;
});