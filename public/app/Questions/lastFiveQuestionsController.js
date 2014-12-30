app.controller('LastFiveQuestionsController', function ($scope, questionsService){
    questionsService.getLastFiveQuestions(function (data) {
        console.log(data);
        $scope.questions = data;
    });
});