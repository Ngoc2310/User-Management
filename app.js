(function () {
  "use strict";

  var app = angular.module("UserManagement", []);
  var api = "https://631e9e7f58a1c0fe9f5494b8.mockapi.io/users";
  var url = "";

  // /blogs?page=1&limit=1

  app.factory("userFactory", function ($http) {
    return {
      getUsers: function (currentPage) {
        url = api + "?page=" + currentPage + "&limit=5";
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
      totalPage: function (pageSize, totalRecord) {
        return Math.ceil(totalRecord / pageSize);
      },
    };
  });

  app.controller("UserCtrl", function PostController($scope, userFactory) {
    $scope.users = [];
    $scope.user = null;
    $scope.editMode = false;

    $scope.alertMessage = null;
    $scope.secondsDelay = 2;

    $scope.currentPage = 1;
    $scope.pageNumber = 0;

    //get all users
    $scope.getAll = function () {
      userFactory.getUsers($scope.currentPage).then(
        function (response) {
          $scope.users = response.data.items;

          $scope.pageNumber = userFactory.totalPage(5, response.data.count);
          console.log(response.data);
          console.log($scope.pageNumber);
        },
        function () {
          $scope.alertText = "An Error has occured while Loading user! ";
          $scope.alertType = "danger";

          $scope.alertMessage = {
            type: $scope.alertType,
            text: $scope.alertText,
            delay: $scope.secondsDelay,
          };
        }
      );
    };

    $scope.range = function (n) {
      return new Array(n);
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
            $scope.getAll();
            $scope.alertText = "Create Contact Successfully";
            $scope.alertType = "success";
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
            $scope.alertType = "danger";

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

      userFactory.updateUser(currentUser).then(
        function () {
          currentUser.editMode = false;
          $scope.getAll();
          $scope.alertText = "Update Contact Successfully";
          $scope.alertType = "success";

          $scope.alertMessage = {
            type: $scope.alertType,
            text: $scope.alertText,
            delay: $scope.secondsDelay,
          };
          $("#userModel").modal("hide");
        },
        function () {
          $scope.alertText = "An Error has occured while Updating user! ";
          $scope.alertType = "danger";

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
      if (confirm("Are you sure you want to delete this?")) {
        userFactory.deleteUser(currentUser).then(
          function () {
            $scope.getAll();
            $scope.alertText = "Delete Contact Successfully";
            $scope.alertType = "warning";
            $scope.alertMessage = {
              type: $scope.alertType,
              text: $scope.alertText,
              delay: $scope.secondsDelay,
            };
          },
          function () {
            $scope.alertText = "An Error has occured while Delete user! ";
            $scope.alertType = "danger";

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

    // previous and next button on pagination
    $scope.changePageArrow = function (val) {
      if (val === "prev") {
        if ($scope.currentPage > 1) {
          $scope.currentPage -= 1;
          $scope.getAll($scope.currentPage);
        }
      } else {
        if ($scope.currentPage < $scope.pageNumber) {
          $scope.currentPage += 1;
          $scope.getAll($scope.currentPage);
        }
      }
    };
    // change page by number
    $scope.changePage = function (page) {
      $scope.currentPage = page;
      $scope.getAll(page);
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
                  icon = "check-circle-fill";
                }
                break;
              case "warning":
                {
                  icon = "exclamation-circle-fill";
                }
                break;
              case "danger":
                {
                  icon = "x-circle-fill";
                }
                break;
            }

            html =
              "<div class='alert alert-" +
              scope.alert.type +
              " mt-3' role='alert'>";

            if (icon) {
              html +=
                "<span style='padding-right: 5px;' class='bi bi-" +
                icon +
                "' aria-hidden='true'></span>";
            }

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
