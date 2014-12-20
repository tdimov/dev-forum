app.controller('QuestionsController', function ($scope, $location, notifier, questionsService) {

    $scope.allSelectedTags = [];
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

    $scope.updateSelected = function (tag) {
        if(tag && $scope.allSelectedTags.indexOf(tag) == -1) {
            $scope.allSelectedTags.push(tag);
        }
    };

    $scope.removeSelectedTag = function (tag) {
        if(tag && $scope.allSelectedTags.indexOf(tag) > -1) {
            var index = $scope.allSelectedTags.indexOf(tag);
            $scope.allSelectedTags.splice(index, 1);
        }
    };

    $scope.askQuestion = function (question) {
        if(question) {
            question.selectedTags = $scope.allSelectedTags;
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