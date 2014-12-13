app.controller('QuestionsController', function ($scope, $location, notifier, questionsService) {
    $scope.askQuestion = function (question) {
        if(question) {
            questionsService.askQuestion(question)
                .then(function (response) {
                    if(response.success) {
                        notifier.success(response.message);
                        $location.path('/');
                    }
                    else {
                        notifier.error(response.message);
                    }
                })
        }
    }
});