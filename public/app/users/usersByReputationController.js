app.controller("UsersByReputationController", function ($scope, notifier, usersService) {
  $scope.users = [];

  function getUsersByReputation() {
    usersService.index()
      .then(({ data }) => {
        $scope.users = data.result;
      });
  }

  getUsersByReputation();
});