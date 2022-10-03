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

  function MainController($scope) {}
})();
