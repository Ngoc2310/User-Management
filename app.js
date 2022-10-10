(function () {
  "use strict";
  angular
    .module("myApp", ["ngRoute"])
    .controller("MainController", MainController)
    .factory("appFactory", appFactory);

  function appFactory() {
    return {
      totalPage: function (pageSize, totalRecord) {
        return Math.ceil(totalRecord / pageSize);
      },
    };
  }

  function MainController($location, $scope) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.classActive = function (viewLocation) {
      if ($scope.isActive(viewLocation)) {
        return "active";
      } else {
        return "";
      }
    };
  }
})();
