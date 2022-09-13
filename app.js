(function () {
  "use strict";

  angular.module("UserManagement", []).controller("UserCtrl", UserCtrl);

  UserCtrl.$inject = ["$scope", "$http"];

  function UserCtrl($scope, $http) {
    $scope.success = "hide";
    $scope.show = false;

    $scope.getUsers = function () {
      $http.get("https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users").then(
        function (response) {
          $scope.users = response.data;
          console.log(response.data);
        },
        function (error) {
          console.log(error);
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
            $scope.success = "show";
            $scope.show = true;
            $scope.successMessage = "Delete Contact Successfully";
          });
      }
    };

    $scope.openModal = function () {
      var modal_popup = angular.element("#basicModal");
      modal_popup.modal("show");
    };

    $scope.closeModal = function () {
      var modal_popup = angular.element("#basicModal");
      modal_popup.modal("hide");
    };

    $scope.addUser = function () {
      $scope.modalTitle = "Add Contact";
      $scope.submit_button = "Create";
      $scope.openModal();
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
        function (response) {
          $scope.getUsers();
          $scope.closeModal();
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
    };
  }
})();
