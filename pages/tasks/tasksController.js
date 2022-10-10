(function () {
  "use strict";
  angular.module("myApp").controller("TaskCtrl", taskController);

  taskController.$inject = ["taskService", "userFactory"];

  function taskController(taskService, userFactory) {
    var tc = this;
    tc.users = [];
    tc.data = taskService.srv.data;
    tc.getusers = function () {
      userFactory.getUsers("", "", "", "", "").then(function (response) {
        tc.users = response.data.items;
      });
    };
    tc.addNewTask = function () {
      tc.data.currentView = taskService.srv.viewMode.add;
      console.log(tc.users);
    };
  }
})();
