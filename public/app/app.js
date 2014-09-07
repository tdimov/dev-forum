var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/index',
            controller: 'MainController'
        });
});
app.controller('MainController', function ($scope) {
    $scope.hello = "Hi from angular";
});