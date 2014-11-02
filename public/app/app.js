var app = angular.module('app', ['ngRoute', 'ngResource']).value('toastr', toastr);

app.config(function ($routeProvider) {

    var routeChecks = {
        admin: {
            auth: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticatedUser: {
            authenticated: function (auth) {
                return auth.isUserAuthenticated();
            }
        },
        notAuthenticatedUser: {
            isNotAuthenticated: function(auth) {
                return auth.isUserNotAuthenticated()
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
            controller: 'AccountController',
            resolve: routeChecks.authenticatedUser
        })
        .when('/register', {
            templateUrl: '/partials/account/register',
            controller: 'AccountController',
            resolve: routeChecks.authenticatedUser
        })
        .when('/account/settings', {
            templateUrl: '/partials/account/settings',
            controller: 'AccountController',
            resolve: routeChecks.notAuthenticatedUser
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UsersController',
            resolve: routeChecks.admin
        })
        .when('/admin/users/:id', {
            templateUrl: '/partials/admin/edit-user',
            controller: "EditUserController",
            resolve: routeChecks.admin
        })
        .when('/questions/question', {
            templateUrl: '/partials/questions/question',
            controller: ''
        })
        .when('/tags', {
            templateUrl: '/partials/tags/tags-list',
            controller: ''
        });
});
//TODO: create MainController in another file
app.controller('MainController', function ($scope) {
    $scope.hello = "Hi from angular";
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
        if(rejection === 'not authorized' || rejection === 'authenticated' || rejection === 'not authenticated') {
            $location.path('/');
        }
    });
});

