app.controller("AskQuestionController", function ($scope, $location, notifier, questionsService, tagsService) {
  const SUCCESS_CREATE_QUESTION = 'Успешно създадохте въпрос!';
  const ERROR_CREATE_QUESTION = 'Имаше проблем при създаването на въпрос!';
  const ERROR_TAG_ALREADY_SELECTED = 'Тагът вече е бил избран!';
  const INVALID_QUESTION_DATA = 'Моля въведете всички полета!';
  const QUESTION_TAG_LENGTH = 3;
  const QUESTION_TAGS_MIN = 1;
  const QUESTION_TAGS_MAX = 5;

    $scope.selectedTags = [];
    $scope.questionTag = '';
    $scope.tagsSuggestions = [];

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

    function reset() {
      $scope.tagsSuggestions = [];
      $scope.questionTag = '';
    }

    function isTagSelected(tag) {
      const foundTag = $scope.selectedTags.find(selectedTag => tag === selectedTag.name);
      return foundTag !== undefined;
    }

    function addToSelectedTags(tag) {
      $scope.selectedTags.push(tag);
      reset();
    }

    function validate(question) {
      return question.title && question.text && $scope.selectedTags.length > 0;
    }

    $scope.onEnterTagSelect = () => {
      if (!isTagSelected($scope.questionTag)) {
        tagsService.create({ name: $scope.questionTag })
          .then(({ data }) => {
            addToSelectedTags({
              id: data.result,
              name: $scope.questionTag
            });
          });
      } else {
        reset();
        notifier.error(ERROR_TAG_ALREADY_SELECTED);
      }
    }

    $scope.onQuestionTagChange = () => {
      if ($scope.questionTag && $scope.questionTag.length >= QUESTION_TAG_LENGTH) {
        tagsService.index({ name: $scope.questionTag }).then(({ data }) => {
          $scope.tagsSuggestions = data.result;
        });
      } else {
        $scope.tagsSuggestions = [];
      }
    }

    $scope.selectSuggestedTag = tag => {
      if (!isTagSelected(tag.name)) {
        addToSelectedTags(tag);
      } else {
        reset();
        notifier.error(ERROR_TAG_ALREADY_SELECTED);
      }
    }

    $scope.deleteSelectedTag = index => {
      $scope.selectedTags.splice(index, 1);
    }

    $scope.askQuestion = function (question) {
      if (validate(question)) {
        question.tags = $scope.selectedTags.map(tag => tag.id);
        questionsService.create(question) 
          .then(({ data }) => {
            notifier.success(SUCCESS_CREATE_QUESTION);
            $location.path(`/questions/${data.result}`);
          })
          .catch(() => {
            notifier.error(ERROR_CREATE_QUESTION);
          });
      } else {
        notifier.error(INVALID_QUESTION_DATA);
      }
    }
});