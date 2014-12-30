app.controller("UnansweredQuestionsController", function ($scope, questionsService) {
    questionsService.getUnansweredQuestions(function (data) {
        $scope.questions = data;
    });
});