app.controller("QuestionsAdminController", function ($scope, $location, questionsService, notifier) {
    var questionId;

    questionsService.index().then(({ data }) => {
      $scope.questions = data.result;
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
                    $location.path('/');
                }
                else {
                    notifier.error(response.message);
                }
            });
    }
});