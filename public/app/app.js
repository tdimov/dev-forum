var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
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
        });
});
app.controller('MainController', function ($scope) {
    $scope.hello = "Hi from angular";
});