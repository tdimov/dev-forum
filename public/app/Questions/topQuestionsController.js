app.controller("TopQuestionsController", function ($scope, questionsService) {
    questionsService.getTopQuestions(function (data){
        $scope.questions = data;
    });
});