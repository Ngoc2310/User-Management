(function () {
  "use strict";
  angular.module("myApp").controller("actionTaskCtrl", [
    "userFactory",
    "taskService",
    function (userFactory, taskService) {
      var at = this;
      at.users = [];
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

      // at.getusers = function () {
      //   userFactory.getUsers("", "", "", "", "").then(
      //     function (response) {
      //       at.users = response.data.items;
      //     },
      //     function () {}
      //   );
      // };

      at.data = taskService.srv.data;

      at.cancel = function () {
        at.data.currentView = taskService.srv.viewMode.main;
        at.data.currentModel = {};
      };
      at.createNewTask = function () {};
    },
  ]);
})();
