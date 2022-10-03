(function () {
  "use strict";
  angular.module("myApp").factory("userFactory", [
    "$http",
    function ($http) {
      var url = "";
      var api = "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users";

      return {
        getUsers: function (currentPage, pageLimit, search, sortBy, sortOrder) {
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

        addUser: function (user) {
          url = api;
          return $http.post(url, user);
        },

        deleteUser: function (user) {
          url = api + "/" + user.id;
          return $http.delete(url);
        },

        updateUser: function (user) {
          url = api + "/" + user.id;
          return $http.put(url, user);
        },
      };
    },
  ]);
})();
