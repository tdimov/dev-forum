app.controller('SingleQuestionController', function ($scope, $sce, $location, $routeParams, questionsService, identity, notifier){
    var questionId = $routeParams.id,
        answerId;

    $scope.editorOptions = {
        toolbar: [
            ['document', 'mode'],
            ['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
            ['Cut', 'Copy', 'Paste', 'PasteText'],
            ['Undo', 'Redo'],
            ['Image', 'SpecialChar']
        ],
        height: '300px'
    };

    $scope.setAnswerId = function (id) {
        if (id) {
            answerId = id;
        }
    };

    $scope.addAnswer = function (newAnswer) {
        if(identity.isAuthenticated()) {
            if(newAnswer && newAnswer.text) {
                newAnswer.questionId = questionId;
                questionsService.addAnswer(newAnswer)
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
            else{
                notifier.error("Please, enter your answer!");
            }
        }
        else {
            $location.path('/login');
        }
    };

    $scope.addComment = function (newComment) {
        if(identity.isAuthenticated()) {
            if(newComment && newComment.text) {
                newComment.answerId = answerId;
                questionsService.addComment(newComment)
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
            else {
                notifier.error("Please, enter your comment!");
            }
        }
        else {
            $location.path('/login');
        }

    };

    questionsService.getQuestionById(questionId, function (data) {
        $scope.question = data;
    });
});