app.controller('QuestionsController', function ($scope, $location, notifier, questionsService) {

    var allSelectedTags = [];
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
        if(tag && allSelectedTags.indexOf(tag) == -1) {
            allSelectedTags.push(tag);
        }
    };

    $scope.removeSelectedTag = function (tag) {
        if(tag && allSelectedTags.indexOf(tag) > -1) {
            var index = allSelectedTags.indexOf(tag);
            allSelectedTags.splice(index, 1);
        }
    };

    $scope.askQuestion = function (question) {
        if(question) {
            question.tags = allSelectedTags;
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