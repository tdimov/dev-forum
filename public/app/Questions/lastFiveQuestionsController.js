app.controller('LastFiveQuestionsController', function ($scope, questionsService){
    questionsService.getLastFiveQuestions(function (data) {
        $scope.questions = data;
    });
});