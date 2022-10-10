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
          },
          add: {
            name: "add",
            url: "pages/tasks/taskForm/taskForm.html",
          },
          result: {},
          edit: {},
        };
      }

      return {
        srv,
        getTasks: function (currentPage, pageLimit, search, sortBy, sortOrder) {
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
        },

        // addTask: function (task) {
        //   url = api;
        //   return $http.post(url, task);
        // },

        // deleteTask: function (task) {
        //   url = api + "/" + task.id;
        //   return $http.delete(url);
        // },

        // updateTask: function (task) {
        //   url = api + "/" + task.id;
        //   return $http.put(url, task);
        // },
      };
    },
  ]);
})();
