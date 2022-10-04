(function () {
  "use strict";
  angular.module("myApp").controller("TaskCtrl", [
    "taskFactory",
    "appFactory",
    "userFactory",
    "$route",
    function (taskFactory, appFactory, userFactory) {
      var tc = this;
      tc.tasks = [];
      tc.task = taskFactory.inputTask;
      tc.editMode = false;
      tc.deleteMode = false;

      tc.alertMessage = null;
      tc.secondsDelay = 2;

      tc.currentPage = 1;
      tc.pageNumber = 0;
      tc.pageLimit = "5";

      tc.search = "";

      tc.sortBy = "id";
      tc.sortOrder = "";
      tc.isAsc = true;

      tc.tableshow = false;

      tc.getAll = function () {
        taskFactory
          .getTasks(
            tc.currentPage,
            tc.pageLimit,
            tc.search,
            tc.sortBy,
            tc.sortOrder
          )
          .then(
            function (response) {
              tc.tasks = response.data.items;

              tc.totalData = response.data.count;
              tc.pageNumber = appFactory.totalPage(tc.pageLimit, tc.totalData);
            },
            function () {
              tc.alertText = "An Error has occured while Loading task! ";
              tc.alertType = "danger";

              tc.alertMessage = {
                type: tc.alertType,
                text: tc.alertText,
                delay: tc.secondsDelay,
              };
            }
          );
      };

      tc.sort = function (column) {
        tc.sortOrder = tc.isAsc ? "desc" : "";
        tc.isAsc = !tc.isAsc;
        tc.sortBy = column;
        tc.getAll();
      };

      tc.refresh = function () {
        tc.search = "";
        tc.getAll();
      };

      tc.range = function (n) {
        return new Array(n);
      };

      tc.getusers = function () {
        userFactory.getUsers("", "", "", "", "").then(
          function (response) {
            tc.users = response.data.items;
          },
          function () {
            tc.alertText = "An Error has occured while Loading user! ";
            tc.alertType = "danger";

            tc.alertMessage = {
              type: tc.alertType,
              text: tc.alertText,
              delay: tc.secondsDelay,
            };
          }
        );
      };

      //open add table when click create button
      tc.showadd = function () {
        tc.task = taskFactory.inputTask;
        tc.editMode = false;
        tc.deleteMode = false;
        tc.tableshow = true;
        tc.getusers();
      };

      //add task
      tc.add = function () {
        var currentTask = this.task;

        if (
          currentTask != null &&
          currentTask.name != null &&
          currentTask.description != null &&
          currentTask.assigner != null &&
          currentTask.type != null &&
          currentTask.status != null
        )
          taskFactory.addTask(currentTask).then(
            function (response) {
              tc.editMode = false;
              currentTask.id = response.data;
              tc.alertText = "Create Task Successfully";
              tc.alertType = "success";
              tc.alertMessage = {
                type: tc.alertType,
                text: tc.alertText,
                delay: tc.secondsDelay,
              };

              tc.task = {};
              tc.tableshow = false;
            },
            function () {
              tc.alertText = "An Error has occured while Creating task! ";
              tc.alertType = "danger";

              tc.alertMessage = {
                type: tc.alertType,
                text: tc.alertText,
                delay: tc.secondsDelay,
              };
            }
          );
      };

      //open edit table when click edit button
      tc.edit = function (t) {
        tc.task = angular.copy(t);

        //check if input in edit table is changed or not
        tc.check = function () {
          if (angular.equals(tc.task, t)) {
            return true;
          }
          return false;
        };
        tc.editMode = true;
        tc.deleteMode = false;
        tc.tableshow = true;
        tc.getusers();
        console.log(tc.task);
      };

      // update task
      tc.update = function () {
        var currentTask = this.task;

        taskFactory.updateTask(currentTask).then(
          function () {
            currentTask.editMode = false;
            tc.getAll();
            tc.tableshow = false;

            tc.alertText = "Update Task Successfully";
            tc.alertType = "success";
            tc.alertMessage = {
              type: tc.alertType,
              text: tc.alertText,
              delay: tc.secondsDelay,
            };
          },
          function () {
            tc.alertText = "An Error has occured while Updating task! ";
            tc.alertType = "danger";

            tc.alertMessage = {
              type: tc.alertType,
              text: tc.alertText,
              delay: tc.secondsDelay,
            };
          }
        );
      };

      //open delete table when click delete button
      tc.deleteform = function (t) {
        tc.task = angular.copy(t);
        tc.deleteMode = true;
        tc.tableshow = true;
      };

      tc.delete = function () {
        var currentTask = this.task;

        taskFactory.deleteTask(currentTask).then(
          function () {
            tc.getAll();
            tc.tableshow = false;
            tc.alertText = "Delete Task Successfully";
            tc.alertType = "warning";
            tc.alertMessage = {
              type: tc.alertType,
              text: tc.alertText,
              delay: tc.secondsDelay,
            };
          },
          function () {
            tc.alertText = "An Error has occured while Delete task! ";
            tc.alertType = "danger";

            tc.alertMessage = {
              type: tc.alertType,
              text: tc.alertText,
              delay: tc.secondsDelay,
            };
          }
        );
      };

      tc.cancel = function () {
        tc.task = null;
        tc.tableshow = hide;
      };

      // previous and next button on pagination
      tc.changePageArrow = function (val) {
        if (val === "prev") {
          if (tc.currentPage > 1) {
            tc.currentPage -= 1;
            tc.getAll(tc.currentPage);
          }
        } else {
          if (tc.currentPage < tc.pageNumber) {
            tc.currentPage += 1;
            tc.getAll(tc.currentPage);
          }
        }
      };
      // change page by number
      tc.changePage = function (page) {
        tc.currentPage = page;
        tc.getAll(page);
      };

      tc.getAll();
    },
  ]);
})();
