(function () {
  "use strict";
  angular.module("myApp").controller("TaskCtrl", taskController);

  taskController.$inject = ["taskService", "userFactory"];

  function taskController(taskService, userFactory) {
    var tc = this;
    tc.data = taskService.data;
    tc.addNewTask = function () {
      tc.data.currentView = taskService.viewMode.add;
    };
  }
})();
