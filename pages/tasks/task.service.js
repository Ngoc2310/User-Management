(function () {
  "use strict";
  angular.module("myApp").factory("taskService", [
    "$http",
    function ($http) {
      var url = "";
      var api = "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/task";

      var viewMode = initViewMode();
      var srv = {};
      srv.data = initDefaultCache();
      srv.viewMode = initViewMode();

      srv.tasks = getTasks;
      srv.createTask = createTask;
      srv.updateTask = updateTask;
      srv.deleteTask = deleteTask;

      function initDefaultCache() {
        return {
          currentView: viewMode.main,
          currentModel: {},
        };
      }

      function initViewMode() {
        return {
          main: {
            name: "main",
            url: "pages/tasks/taskList/taskList.html",
            editMode: false,
          },
          add: {
            name: "add",
            url: "pages/tasks/taskForm/taskForm.html",
          },
          result: {},
          edit: {
            name: "edit",
            url: "pages/tasks/taskForm/taskForm.html",
            editMode: true,
          },
        };
      }

      function getTasks(currentPage, pageLimit, search, sortBy, sortOrder) {
        url =
          api +
          "?page=" +
          currentPage +
          "&limit=" +
          pageLimit +
          "&search=" +
          search +
          "&sortBy=" +
          sortBy +
          "&order=" +
          sortOrder;
        return $http.get(url);
      }

      function createTask(task) {
        url = api;
        return $http.post(url, task);
      }

      function updateTask(task) {
        url = api + "/" + task.id;
        return $http.put(url, task);
      }

      function deleteTask(id) {
        url = api + "/" + id;
        return $http.delete(url);
      }

      return srv;
    },
  ]);
})();
