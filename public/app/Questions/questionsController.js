app.controller('QuestionsController', function ($scope, $routeParams, questionsService) {
    questionsService.getQuestions(3, function (data) {
        $scope.questions = data;
    });
});