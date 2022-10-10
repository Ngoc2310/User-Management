(function () {
  "use strict";

  angular.module("myApp").directive("actionTask", function () {
    return {
      scope: {},
      restrict: "A",
      controller: "actionTaskCtrl",
      controllerAs: "at",
      templateUrl: "pages/tasks/taskForm/taskForm.directive.html",
    };
  });
})();
