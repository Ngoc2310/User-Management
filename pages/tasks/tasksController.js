(function () {
  "use strict";
  angular
    .module("myApp")
    .controller("TaskCtrl", function ($scope, userFactory) {
      $scope.tasks = [];
      $scope.api = "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/task";
      $scope.task = null;
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

      $scope.status = "to-do";
      $scope.tableshow = false;

      $scope.getAll = function () {
        userFactory
          .getUsers(
            $scope.api,
            $scope.currentPage,
            $scope.pageLimit,
            $scope.search,
            $scope.sortBy,
            $scope.sortOrder
          )
          .then(
            function (response) {
              $scope.tasks = response.data.items;

              $scope.totalData = response.data.count;
              $scope.pageNumber = userFactory.totalPage(
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
        console.log(column);
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

      //open add table when click create button
      $scope.showadd = function () {
        $scope.task = null;
        $scope.editMode = false;
        $scope.deleteMode = false;
        $scope.tableshow = true;
        console.log(UserCtrl.users);
      };

      //add user
      $scope.add = function () {
        var currentTask = this.task;

        if (
          currentTask != null &&
          currentTask.name != null &&
          currentTask.description != null &&
          currentTask.assigner != null &&
          currentTask.email != null &&
          currentTask.status != null
        )
          userFactory.addUser($scope.api, currentTask).then(
            function (response) {
              $scope.editMode = false;
              currentTask.id = response.data;
              $scope.alertText = "Create Task Successfully";
              $scope.alertType = "success";
              $scope.alertMessage = {
                type: $scope.alertType,
                text: $scope.alertText,
                delay: $scope.secondsDelay,
              };

              $scope.user = null;
              $scope.tableshow = false;
            },
            function () {
              $scope.alertText = "An Error has occured while Creating task! ";
              $scope.alertType = "danger";

              $scope.alertMessage = {
                type: $scope.alertType,
                text: $scope.alertText,
                delay: $scope.secondsDelay,
              };
            }
          );
      };

      //open edit table when click edit button
      $scope.edit = function (t) {
        $scope.task = angular.copy(t);

        //check if input in edit table is changed or not
        $scope.check = function () {
          if (angular.equals($scope.task, t)) {
            return true;
          }
          return false;
        };
        $scope.editMode = true;
        $scope.deleteMode = false;
        $scope.tableshow = true;
      };

      // update user
      $scope.update = function () {
        var currentTask = this.task;

        userFactory.updateUser($scope.api, currentTask).then(
          function () {
            currentTask.editMode = false;
            $scope.getAll();
            $scope.tableshow = false;

            $scope.alertText = "Update Task Successfully";
            $scope.alertType = "success";
            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
          },
          function () {
            $scope.alertText = "An Error has occured while Updating task! ";
            $scope.alertType = "danger";

            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
          }
        );
      };

      //open delete table when click delete button
      $scope.deleteform = function (t) {
        $scope.user = angular.copy(t);
        $scope.deleteMode = true;
        $scope.tableshow = true;
      };

      $scope.delete = function () {
        var currentUser = this.user;

        userFactory.deleteUser($scope.api, currentUser).then(
          function () {
            $scope.getAll();
            $scope.tableshow = false;
            $scope.alertText = "Delete Task Successfully";
            $scope.alertType = "warning";
            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
          },
          function () {
            $scope.alertText = "An Error has occured while Delete task! ";
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
        $scope.tableshow = hide;
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

      $scope.getAll();
    });
})();
