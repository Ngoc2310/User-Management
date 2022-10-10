(function () {
  "use strict";
  angular.module("myApp").controller("actionTaskCtrl", [
    "userFactory",
    "taskService",
    function (userFactory, taskService) {
      var at = this;
      at.types = [
        { id: "1", name: "Dev Task", value: "devTask" },
        { id: "2", name: "Story", value: "story" },
        { id: "3", name: "PR", value: "pr" },
      ];
      at.status = [
        { id: "1", name: "In-Progress", value: "inProgress" },
        { id: "2", name: "Completed", value: "completed" },
        { id: "3", name: "To do", value: "todo" },
      ];

      at.getusers = function () {
        userFactory.getUsers("", "", "", "", "").then(
          function (response) {
            at.users = response.data.items;
          },
          function () {}
        );
      };

      at.getusers();

      at.data = taskService.data;

      at.cancel = function () {
        at.data.currentView = taskService.viewMode.main;
        at.data.currentModel = {};
      };
      at.createNewTask = function () {};
    },
  ]);
})();
