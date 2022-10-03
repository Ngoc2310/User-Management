(function () {
  "use strict";
  angular.module("myApp").controller("UserCtrl", [
    "$scope",
    "userFactory",
    "appFactory",
    function ($scope, userFactory, appFactory) {
      $scope.users = [];
      $scope.user = null;
      $scope.editMode = false;
      $scope.deleteMode = false;

      $scope.alertMessage = null;
      $scope.secondsDelay = 2;

      $scope.currentPage = 1;
      $scope.pageNumber = 0;
      $scope.pageLimit = "5";

      $scope.search = "";

      $scope.sortBy = "id";
      $scope.sortOrder = "";
      $scope.isAsc = true;

      $scope.getAll = function () {
        userFactory
          .getUsers(
            $scope.currentPage,
            $scope.pageLimit,
            $scope.search,
            $scope.sortBy,
            $scope.sortOrder
          )
          .then(
            function (response) {
              $scope.users = response.data.items;

              $scope.totalData = response.data.count;
              $scope.pageNumber = appFactory.totalPage(
                $scope.pageLimit,
                $scope.totalData
              );
            },
            function () {
              $scope.alertText = "An Error has occured while Loading user! ";
              $scope.alertType = "danger";

              $scope.alertMessage = {
                type: $scope.alertType,
                text: $scope.alertText,
                delay: $scope.secondsDelay,
              };
            }
          );
      };

      $scope.sort = function (column) {
        $scope.sortOrder = $scope.isAsc ? "desc" : "";
        $scope.isAsc = !$scope.isAsc;
        $scope.sortBy = column;
        $scope.getAll();
      };

      $scope.refresh = function () {
        $scope.search = "";
        $scope.getAll();
      };

      $scope.range = function (n) {
        return new Array(n);
      };

      //open add modal when click create button
      $scope.showadd = function () {
        $scope.user = null;
        $scope.editMode = false;
        $scope.deleteMode = false;
        $("#userModal").modal("show");
      };

      //add user
      $scope.add = function () {
        var currentUser = this.user;

        if (
          currentUser != null &&
          currentUser.name != null &&
          currentUser.address &&
          currentUser.phone &&
          currentUser.email
        )
          userFactory.addUser(currentUser).then(
            function (response) {
              $scope.editMode = false;
              currentUser.id = response.data;
              $scope.getAll();
              $scope.alertText = "Create Contact Successfully";
              $scope.alertType = "success";
              $scope.alertMessage = {
                type: $scope.alertType,
                text: $scope.alertText,
                delay: $scope.secondsDelay,
              };

              $scope.user = null;
              $scope.adduserform.$setPristine();
              $("#userModal").modal("hide");
            },
            function () {
              $scope.alertText = "An Error has occured while Creating user! ";
              $scope.alertType = "danger";

              $scope.alertMessage = {
                type: $scope.alertType,
                text: $scope.alertText,
                delay: $scope.secondsDelay,
              };
            }
          );
      };

      //open edit modal when click edit button
      $scope.edit = function (u) {
        $scope.user = angular.copy(u);

        //check if input in edit modal is changed or not
        $scope.check = function () {
          if (angular.equals($scope.user, u)) {
            return true;
          }
          return false;
        };

        $scope.editMode = true;
        $scope.deleteMode = false;
        $("#userModal").modal("show");
      };

      //update user
      $scope.update = function () {
        var currentUser = this.user;

        userFactory.updateUser(currentUser).then(
          function () {
            currentUser.editMode = false;
            $scope.getAll();
            $scope.alertText = "Update Contact Successfully";
            $scope.alertType = "success";

            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
            $scope.adduserform.$setPristine();
            $("#userModal").modal("hide");
          },
          function () {
            $scope.alertText = "An Error has occured while Updating user! ";
            $scope.alertType = "danger";

            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
          }
        );
      };

      //open delete modal when click delete button
      $scope.deleteform = function (u) {
        $scope.user = angular.copy(u);
        $scope.deleteMode = true;
        $("#userModal").modal("show");
      };

      //delete user
      $scope.delete = function () {
        var currentUser = this.user;

        userFactory.deleteUser(currentUser).then(
          function () {
            $scope.getAll();
            $scope.alertText = "Delete Contact Successfully";
            $scope.alertType = "warning";
            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
            $("#userModal").modal("hide");
          },
          function () {
            $scope.alertText = "An Error has occured while Delete user! ";
            $scope.alertType = "danger";

            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
          }
        );
      };

      $scope.cancel = function () {
        $scope.user = null;
        $scope.adduserform.$setPristine();
        $("#userModal").modal("hide");
      };

      // previous and next button on pagination
      $scope.changePageArrow = function (val) {
        if (val === "prev") {
          if ($scope.currentPage > 1) {
            $scope.currentPage -= 1;
            $scope.getAll($scope.currentPage);
          }
        } else {
          if ($scope.currentPage < $scope.pageNumber) {
            $scope.currentPage += 1;
            $scope.getAll($scope.currentPage);
          }
        }
      };
      // change page by number
      $scope.changePage = function (page) {
        $scope.currentPage = page;
        $scope.getAll(page);
      };

      // initialize users data
      $scope.getAll();
    },
  ]);
})();
