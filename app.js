(function () {
  "use strict";
  angular
    .module("myApp", ["ngRoute"])
    .controller("MainController", MainController)
    .factory("userFactory", userFactory);

  var url = "";
  var usersName = [];

  function userFactory($http) {
    return {
      getUsers: function (
        api,
        currentPage,
        pageLimit,
        search,
        sortBy,
        sortOrder
      ) {
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

      getUser: function (api, user) {
        url = api + "/" + user.id;
        return $http.get(url);
      },

      addUser: function (api, user) {
        url = api;
        return $http.post(url, user);
      },

      deleteUser: function (api, user) {
        url = api + "/" + user.id;
        return $http.delete(url);
      },

      updateUser: function (api, user) {
        url = api + "/" + user.id;
        return $http.put(url, user);
      },
      totalPage: function (pageSize, totalRecord) {
        return Math.ceil(totalRecord / pageSize);
      },
      getUserName: function () {
        return $http.get("https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users");
      },
    };
  }

  function MainController($scope) {}
})();
