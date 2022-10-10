(function () {
  "use strict";
  angular.module("myApp").config([
    "$routeProvider",
    "$locationProvider",
    function configRoute($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
        .when("/", {
          controller: "TaskCtrl",
          templateUrl: "pages/tasks/tasks.html",
        })
        .when("/users", {
          controller: "UserCtrl as uc",
          templateUrl: "pages/users/users.html",
        })
        .when("/tasks", {
          controller: "TaskCtrl",
          templateUrl: "pages/tasks/tasks.html",
        });
    },
  ]);
})();
