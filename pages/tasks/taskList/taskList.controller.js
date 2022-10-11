(function () {
  "use strict";
  angular.module("myApp").controller("taskListCtrl", [
    "$scope",
    "taskService",
    "appFactory",

    function ($scope, taskService, appFactory) {
      var tl = this;
      tl.data = taskService.data;
      tl.dataParent = $scope.data || {};
      tl.currentPage = 1;
      tl.pageNumber = 0;
      tl.pageLimit = "5";

      tl.search = "";

      tl.sortBy = "";
      tl.sortOrder = "";
      tl.isAsc = true;

      tl.getAll = function () {
        taskService
          .tasks(
            tl.currentPage,
            tl.pageLimit,
            tl.search,
            tl.sortBy,
            tl.sortOrder
          )
          .then(
            function (response) {
              tl.tasks = response.data.items;

              tl.totalData = response.data.count;
              tl.pageNumber = appFactory.totalPage(tl.pageLimit, tl.totalData);
            },
            function () {}
          );
      };

      tl.sort = function (column) {
        tl.sortOrder = tl.isAsc ? "desc" : "";
        tl.isAsc = !tl.isAsc;
        tl.sortBy = column;
        tl.getAll();
        console.log(column);
      };

      tl.refresh = function () {
        tl.search = "";
        tl.getAll();
      };

      tl.range = function (n) {
        return new Array(n);
      };

      // previous and next button on pagination
      tl.changePageArrow = function (val) {
        if (val === "prev") {
          if (tl.currentPage > 1) {
            tl.currentPage -= 1;
            tl.getAll(tl.currentPage);
          }
        } else {
          if (tl.currentPage < tl.pageNumber) {
            tl.currentPage += 1;
            tl.getAll(tl.currentPage);
          }
        }
      };
      // change page by number
      tl.changePage = function (page) {
        tl.currentPage = page;
        tl.getAll(page);
      };

      tl.getAll();

      tl.editTask = function (task) {
        tl.data.currentView = taskService.viewMode.edit;
        tl.data.currentModel = angular.copy(task);
      };

      tl.delete = function (id) {
        tl.data.currentModel = id;
        console.log(tl.data.currentModel);
        $("#taskModal").modal("show");
      };

      tl.deleteTask = function () {
        var currentTask = tl.data.currentModel;
        console.log(currentTask);

        taskService.deleteTask(currentTask).then(
          function () {
            tl.getAll();

            $("#taskModal").modal("hide");
          },
          function () {}
        );
      };
    },
  ]);
})();
