(function () {
  "use strict";
  angular.module("myApp").directive("taskView", function () {
    return {
      scope: {},
      restrict: "A",
      controller: "TaskCtrl",
      controllerAs: "tc",
      templateUrl: "pages/tasks/task.directive.html",
    };
  });
})();
