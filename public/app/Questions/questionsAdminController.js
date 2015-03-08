app.controller("QuestionsAdminController", function ($scope, $location, questionsService, notifier) {
    var questionId;

    questionsService.getQuestions(3, function (data) {
        $scope.questions = data;
    });

    $scope.setQuestionId = function (id) {
        questionId = id;
    };

    $scope.deleteQuestion = function () {
        questionsService.deleteQuestion(questionId)
            .then(function (response) {
                if(response.success) {
                    notifier.success(response.message);
                    $location.path('/');
                }
                else {
                    notifier.error(response.message);
                }
            });
    };

    $scope.lockQuestion = function () {
        questionsService.lockQuestion(questionId)
            .then(function (response) {
                if(response.success) {
                    notifier.success(response.message);
                }
                else {
                    notifier.error(response.message);
                }
            });
    }
});