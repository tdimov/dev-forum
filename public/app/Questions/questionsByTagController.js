app.controller('QuestionsByTagController', function ($scope, $routeParams, questionsService) {
    questionsService.getQuestionsByTag($routeParams.tag, function (data) {
        $scope.questions = data.questions;
        $scope.tagName = data.tagName;
    });
});