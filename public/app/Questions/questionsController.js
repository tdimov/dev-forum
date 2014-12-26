app.controller('QuestionsController', function ($scope, $location, $routeParams, notifier, questionsService, tagsService) {

    questionsService.getTopQuestions(function (data){
        console.log("top tags");
    });
});