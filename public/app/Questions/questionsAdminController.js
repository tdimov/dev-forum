app.controller("QuestionsAdminController", function ($scope, questionsService) {
    questionsService.getQuestions(3, function (data) {
        $scope.questions = data;
    });
});