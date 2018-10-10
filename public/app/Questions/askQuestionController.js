app.controller("AskQuestionController", function ($scope, $location, notifier, questionsService, tagsService) {
  const SUCCESS_CREATE_QUESTION = 'Успешно създадохте въпрос!';
  const ERROR_CREATE_QUESTION = 'Имаше проблем при създаването на въпрос!';

    const selectedTags = [];

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
      if (tag && selectedTags.indexOf(tag) === -1) {
        selectedTags.push(tag);
      }
    };

    $scope.removeSelectedTag = function (tag) {
      if (tag && selectedTags.indexOf(tag) > -1) {
        const index = selectedTags.indexOf(tag);
        selectedTags.splice(index, 1);
      }
    };

    tagsService.index().then(({ data }) => {
      $scope.tags = data.result;
    });

    $scope.askQuestion = function (question) {
      if (question) {
        question.tags = selectedTags;
        questionsService.create(question) 
          .then(({ data }) => {
            notifier.success(SUCCESS_CREATE_QUESTION);
            $location.path(`/questions/${data.result}`);
          })
          .catch(() => {
            notifier.error(ERROR_CREATE_QUESTION);
          });
      }
    }
});