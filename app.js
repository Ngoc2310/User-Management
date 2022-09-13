(function () {
  "use strict";

  angular.module("UserManagement", []).controller("UserCtrl", UserCtrl);

  UserCtrl.$inject = ["$scope", "$http"];

  function UserCtrl($scope, $http) {
    $scope.success = "hide";
    $scope.show = false;

    function getUsers() {
      $http.get("https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users").then(
        function (response) {
          $scope.users = response.data;
          console.log(response.data);
        },
        function (error) {
          console.log(error);
        }
      );
    }
    $scope.getUsers = getUsers();

    $scope.deleteUser = function (id) {
      if (confirm("Are you sure you want to delete this?")) {
        $http
          .delete("https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users/" + id)
          .then(function () {
            getUsers();
            $scope.success = "show";
            $scope.show = true;
            $scope.successMessage = "Delete Contact Successfully";
          });
      }
    };

    $scope.addUser = function () {
      var modal_popup = angular.element("#createModal");
      modal_popup.modal("show");
    };

    $scope.submitForm = function () {
      $http({
        method: "POST",
        url: "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users",
        data: {
          name: $scope.name,
          address: $scope.address,
          phone: $scope.phone,
          email: $scope.email,
        },
      }).then(
        function () {
          getUsers();
          var modal_popup = angular.element("#createModal");
          modal_popup.modal("hide");
          $scope.success = "show";
          $scope.show = true;
          $scope.successMessage = "Create Contact Successfully";
        },
        function (error) {
          console.log(error);
        }
      );
    };

    $scope.selectUser = function (user) {
      $scope.selectedUser = user;
      var modal_popup = angular.element("#editModal");
      modal_popup.modal("show");
    };

    $scope.editForm = function () {
      $http
        .put(
          "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users/" +
            $scope.selectedUser.id,
          $scope.selectedUser
        )
        .then(
          function () {
            getUsers();
            var modal_popup = angular.element("#editModal");
            modal_popup.modal("hide");
            $scope.success = "show";
            $scope.show = true;
            $scope.successMessage = "Edit Contact Successfully";
          },
          function (error) {
            console.log(error);
          }
        );
    };
  }
})();
