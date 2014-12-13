app.factory('UsersResource', function ($resource) {

    var usersResource = $resource('/api/users/:id', {_id: '@id'},{ update: {method: 'PUT', isArray: false} });

    usersResource.prototype.isInRole = function (role) {
        return this.roles && this.roles.indexOf(role) > -1;
    };

    return usersResource;
});