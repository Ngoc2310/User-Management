(function () {
  "use strict";
  angular.module("myApp").controller("TaskCtrl", taskController);

  taskController.$inject = ["taskService"];

  function taskController(taskService) {
    var tc = this;
    tc.data = taskService.data;
    tc.addNewTask = function () {
      tc.data.currentView = taskService.viewMode.add;
      console.log(tc.data.currentView);
    };
  }
})();
