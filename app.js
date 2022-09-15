(function () {
  "use strict";

  var app = angular.module("UserManagement", ["ngAnimate"]);
  // .controller("UserCtrl", UserCtrl)
  // .factory("userFactory", userFactory);
  var api = "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users";
  var url = "";

  app.factory("userFactory", function ($http) {
    return {
      getUsers: function () {
        url = api;
        return $http.get(url);
      },

      getUser: function (user) {
        url = api + "/" + user.id;
        return $http.get(url);
      },

      addUser: function (user) {
        url = api;
        return $http.post(url, user);
      },

      deleteUser: function (user) {
        url = api + "/" + user.id;
        return $http.delete(url);
      },

      updateUser: function (user) {
        url = api + "/" + user.id;
        return $http.put(url, user);
      },
    };
  });

  app.controller("UserCtrl", function PostController($scope, userFactory) {
    $scope.users = [];
    $scope.user = null;
    $scope.editMode = false;

    //get all users
    $scope.getAll = function () {
      userFactory.getUsers().then(
        function (response) {
          $scope.users = response.data;
          console.log(response.data);
        },
        function (response) {
          $scope.error =
            "An Error has occured while Loading users! " +
            response.ExceptionMessage;
        }
      );
    };

    //add user
    $scope.add = function () {
      var currentUser = this.user;
      if (
        currentUser != null &&
        currentUser.name != null &&
        currentUser.address &&
        currentUser.phone &&
        currentUser.email
      )
        userFactory.addUser(currentUser).then(
          function (response) {
            $scope.editMode = false;
            currentUser.id = response.data;
            $scope.users.push(currentUser);
            $scope.show = "Create Contact Successfully";

            $scope.user = null;

            $("#userModel").modal("hide");
            console.log("create user");
          },
          function (response) {
            $scope.error =
              "An Error has occured while Adding user! " +
              response.ExceptionMessage;
          }
        );
    };

    //click edit button
    $scope.edit = function () {
      $scope.user = this.user;
      $scope.editMode = true;
      $("#userModel").modal("show");
    };

    //update user
    $scope.update = function () {
      var currentUser = this.user;
      userFactory.updateUser(currentUser).then(
        function (response) {
          currentUser.editMode = false;
          $scope.show = "Update Contact Successfully";
          $("#userModel").modal("hide");
          console.log("edit user");
        },
        function (response) {
          $scope.error =
            "An Error has occured while Updating user! " +
            response.ExceptionMessage;
        }
      );
    };

    //delete user
    $scope.delete = function () {
      var currentUser = this.user;
      if (confirm("Are you sure you want to delete this?")) {
        userFactory.deleteUser(currentUser).then(
          function (response) {
            $scope.users.pop(currentUser);
            $scope.show = "Delete Contact Successfully";
            $scope.getAll();
            console.log("delete user");
          },
          function (response) {
            $scope.error =
              "An Error has occured while Deleting user! " +
              response.ExceptionMessage;

            $("#confirmModal").modal("hide");
          }
        );
      }
    };

    //open add modal when click create button
    $scope.showadd = function () {
      $scope.user = null;
      $scope.editMode = false;
      $("#userModel").modal("show");
    };

    //open edit modal when click edit button
    $scope.showedit = function () {
      $("#userModel").modal("show");
    };

    $scope.showconfirm = function (data) {
      $scope.user = data;
      $("#confirmModal").modal("show");
    };

    $scope.cancel = function () {
      $scope.user = null;
      $("#userModel").modal("hide");
    };

    // initialize users data
    $scope.getAll();
  });

  app.directive("notification", function ($timeout) {
    return {
      restrict: "E",
      replace: true,
      scope: {
        ngModel: "=",
      },
      template: '<div class="alert fade" bs-alert="ngModel"></div>',
      link: function (scope, element, attrs) {
        $timeout(function () {
          element.hide();
        }, 3000);
      },
    };
  });

  app.controller("AlertController", function ($scope) {
    $scope.message = {
      type: "info",
      title: "Success!",
      content: "alert directive is working pretty well with 3 sec timeout",
    };
  });
})();
