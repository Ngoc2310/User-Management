(function () {
  "use strict";
  angular.module("myApp").factory("taskFactory", [
    "$http",
    function ($http) {
      var url = "";
      var api = "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/task";

      return {
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

        addTask: function (task) {
          url = api;
          return $http.post(url, task);
        },

        deleteTask: function (task) {
          url = api + "/" + task.id;
          return $http.delete(url);
        },

        updateTask: function (task) {
          url = api + "/" + task.id;
          return $http.put(url, task);
        },
      };
    },
  ]);
})();
