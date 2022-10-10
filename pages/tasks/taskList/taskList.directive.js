(function () {
  "use strict";
  angular.module("myApp").directive("taskList", function () {
    return {
      scope: {},
      restrict: "A",
      controller: "taskListCtrl",
      controllerAs: "tl",
      templateUrl: "pages/tasks/taskList/taskList.directive.html",
    };
  });
})();
