(function () {
  "use strict";

  angular.module("UserManagement", []).controller("UserCtrl", UserCtrl);
  // .controller("addUserCtrl", addUserCtrl);

  UserCtrl.$inject = ["$scope", "$http"];

  function UserCtrl($scope, $http) {
    $scope.getUsers = function () {
      $http({
        method: "GET",
        url: "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users",
      }).then(
        function (response) {
          $scope.users = response.data;
        },
        function () {
          alert("Error in getting records");
        }
      );
    };
    $scope.getUsers();

    $scope.deleteUser = function (id) {
      if (confirm("Are you sure you want to delete this?")) {
        $http
          .delete("https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users/" + id)
          .then(function (response) {
            $scope.getUsers();
          });
      }
    };

    // $scope.addUser = function () {
    //   modalInstance = $modal.open({
    //     animation: false,
    //     templateUrl: "AddUser.html",
    //     controller: "addUserCtrl",
    //     scope: $scope,
    //     size: "",
    //     resolve: {},
    //   });
    // };
  }
})();
