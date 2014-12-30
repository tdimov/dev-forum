var app = angular.module('app', ['ngRoute', 'ngResource', 'ngCkeditor']).value('toastr', toastr);

app.config(function ($routeProvider) {

    var routeChecks = {
        admin: {
            auth: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        moderator: {
            auth: function(auth) {
                return auth.isAuthorizedForRole('moderator');
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
        //ADMIN
        .when('/admin/admin-panel', {
            templateUrl: '/partials/admin/admin-panel',
            resolve: routeChecks.admin
        })
        .when('/admin/users/:id', {
            templateUrl: '/partials/admin/edit-user',
            controller: "EditUserController",
            resolve: routeChecks.admin
        })
        .when('/admin/tags/tags-list', {
            templateUrl: '/partials/tags/tags-list',
            controller: 'TagsController',
            resolve: routeChecks.admin
        })
        .when('/admin/tags/add', {
            templateUrl: '/partials/tags/add-tag',
            controller: "TagsController",
            resolve: routeChecks.admin
        })
        .when('/admin/tags/:id', {
            templateUrl: '/partials/tags/edit-tag',
            controller: 'EditTagController',
            resolve: routeChecks.admin
        })
        //MODERATOR
        .when('/moderator/moderator-panel', {
            templateUrl: '/partials/moderator/moderator-panel',
            resolve: routeChecks.moderator
        })
        .when('/users', {
            templateUrl: '/partials/users/users-list',
            controller: ''
        })
        .when('/questions', {
            templateUrl: '/partials/questions/questions',
            controller: 'QuestionsController'
        })
        .when('/questions/ask', {
            templateUrl: '/partials/questions/ask-question',
            controller: 'AskQuestionController',
            resolve: routeChecks.notAuthenticatedUser
        })
        .when('/questions/unanswered', {
            templateUrl: '/partials/questions/unanswered-questions',
            controller: 'UnansweredQuestionsController'
        })
        .when('/questions/:id', {
            templateUrl: '/partials/questions/question',
            controller: 'SingleQuestionController'
        })
        .when('/questionsByTag/:tag', {
            templateUrl: '/partials/questions/questionsByTag',
            controller: 'QuestionsByTagController'
        })
        .when('/tags', {
            templateUrl: '/partials/tags/tags',
            controller: ''
        })
        .otherwise({
            redirectTo: '/'
        });
});
//TODO: create MainController in another file
app.controller('MainController', function ($scope) {
    $scope.hello = "Hi from angular";
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
//        console.log(rejection);
//        if(rejection === 'not authorized' || rejection === 'authenticated' || rejection === 'not authenticated') {
//            $location.path('/');
//        }
        if(rejection === 'not authenticated') {
            $location.path('/login');
        }
        if(rejection === 'not authorized' || rejection === 'authenticated') {
            $location.path('/;')
        }
    });
});

