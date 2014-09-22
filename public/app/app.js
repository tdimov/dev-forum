var app = angular.module('app', ['ngRoute', 'ngResource']).value('toastr', toastr);

app.config(function ($routeProvider) {

    var routeRoleChecks = {
        admin: {
            auth: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: '/partials/account/login',
            controller: 'AccountController'
        })
        .when('/register', {
            templateUrl: '/partials/account/register',
            controller: 'AccountController'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UsersController',
            resolve: routeRoleChecks.admin
        });
});
//TODO: create MainController in another file
app.controller('MainController', function ($scope) {
    $scope.hello = "Hi from angular";
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
});

