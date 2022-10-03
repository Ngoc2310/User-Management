(function () {
  "use strict";
  angular
    .module("myApp", ["ngRoute"])
    .controller("MainController", MainController);

  function MainController($scope) {}
})();
