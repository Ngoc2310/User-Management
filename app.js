(function () {
  "use strict";

  var app = angular.module("UserManagement", []);
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

    $scope.alertMessage = null;
    $scope.alertType = "success";
    $scope.secondsDelay = 2;
    $scope.alertText = "";

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
      $scope.alertText = "Create Contact Successfully";

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
            $scope.getAll();
            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };

            $scope.user = null;

            $("#userModel").modal("hide");
          },
          function () {
            $scope.alertText = "An Error has occured while Creating user! ";
            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
          }
        );
    };

    //click edit button
    $scope.edit = function () {
      $scope.user = angular.copy(this.user);
      $scope.editMode = true;
      $("#userModel").modal("show");
    };

    //update user
    $scope.update = function () {
      var currentUser = this.user;
      $scope.alertText = "Update Contact Successfully";

      userFactory.updateUser(currentUser).then(
        function () {
          currentUser.editMode = false;
          $scope.getAll();
          $scope.alertMessage = {
            type: $scope.alertType,
            text: $scope.alertText,
            delay: $scope.secondsDelay,
          };
          $("#userModel").modal("hide");
        },
        function () {
          $scope.alertText = "An Error has occured while Updating user! ";
          $scope.alertMessage = {
            type: $scope.alertType,
            text: $scope.alertText,
            delay: $scope.secondsDelay,
          };
        }
      );
    };

    //delete user
    $scope.delete = function () {
      var currentUser = this.user;
      $scope.alertText = "Delete Contact Successfully";
      $scope.alertType = "warning";
      if (confirm("Are you sure you want to delete this?")) {
        userFactory.deleteUser(currentUser).then(
          function () {
            $scope.getAll();
            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
          },
          function () {
            $scope.alertText = "An Error has occured while Delete user! ";
            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
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

    $scope.cancel = function () {
      $scope.user = null;
      $("#userModel").modal("hide");
    };

    // initialize users data
    $scope.getAll();
  });

  //alert
  app.directive("alertMessage", function ($compile) {
    return {
      restrict: "E",
      scope: {
        alert: "=",
      },
      link: function (scope, element) {
        scope.$watch("alert", function () {
          updateAlert();
        });

        scope.close = function () {
          scope.alert = null;
        };

        function updateAlert() {
          var html = "";

          if (scope.alert) {
            var icon = null;

            switch (scope.alert.type) {
              case "success":
                {
                  icon = "ok-sign";
                }
                break;
              case "warning":
                {
                  icon = "exclamation-sign";
                }
                break;
              case "danger":
                {
                  icon = "remove-sign";
                }
                break;
            }

            html =
              "<div class='alert alert-" +
              scope.alert.type +
              " mt-3' role='alert'>";

            // if (scope.alert.closable) {
            //   html +=
            //     "<button type='button' class='close' data-dismiss='alert' ng-click='close()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
            // }

            // if (icon) {
            //   html +=
            //     "<span style='padding-right: 5px;' class='bi bi-" +
            //     icon +
            //     "' aria-hidden='true'></span>";
            // }

            html += scope.alert.text;
            html += "</div>";
          }

          var newElement = angular.element(html);
          var compiledElement = $compile(newElement)(scope);

          element.html(compiledElement);

          if (scope.alert && scope.alert.delay > 0) {
            setTimeout(function () {
              scope.alert = null;
              scope.$apply();
            }, scope.alert.delay * 1000);
          }
        }
      },
    };
  });
})();
