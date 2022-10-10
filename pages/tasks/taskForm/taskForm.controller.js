(function () {
  "use strict";
  angular.module("myApp").controller("actionTaskCtrl", function (taskService) {
    var at = this;

    tc.getusers = function () {
      userFactory.getUsers("", "", "", "", "").then(
        function (response) {
          at.users = response.data.items;
        },
        function () {}
      );
    };

    at.data = taskService.data;

    at.cancel = function () {
      at.data.currentView = taskService.viewMode.main;
      at.data.currentModel = {};
    };
    at.createNewTask = function () {};
  });
})();
