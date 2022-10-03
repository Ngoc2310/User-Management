(function () {
  "use strict";
  angular.module("myApp").controller("UserCtrl", [
    "userFactory",
    "appFactory",
    function (userFactory, appFactory) {
      var uc = this;
      uc.users = [];
      uc.user = null;
      uc.editMode = false;
      uc.deleteMode = false;

      uc.alertMessage = null;
      uc.secondsDelay = 2;

      uc.currentPage = 1;
      uc.pageNumber = 0;
      uc.pageLimit = "5";

      uc.search = "";

      uc.sortBy = "id";
      uc.sortOrder = "";
      uc.isAsc = true;

      uc.getAll = function () {
        userFactory
          .getUsers(
            uc.currentPage,
            uc.pageLimit,
            uc.search,
            uc.sortBy,
            uc.sortOrder
          )
          .then(
            function (response) {
              uc.users = response.data.items;

              uc.totalData = response.data.count;
              uc.pageNumber = appFactory.totalPage(uc.pageLimit, uc.totalData);
            },
            function () {
              uc.alertText = "An Error has occured while Loading user! ";
              uc.alertType = "danger";

              uc.alertMessage = {
                type: uc.alertType,
                text: uc.alertText,
                delay: uc.secondsDelay,
              };
            }
          );
      };

      uc.sort = function (column) {
        uc.sortOrder = uc.isAsc ? "desc" : "";
        uc.isAsc = !uc.isAsc;
        uc.sortBy = column;
        uc.getAll();
      };

      uc.refresh = function () {
        uc.search = "";
        uc.getAll();
      };

      uc.range = function (n) {
        return new Array(n);
      };

      //open add modal when click create button
      uc.showadd = function () {
        uc.user = null;
        uc.editMode = false;
        uc.deleteMode = false;
        $("#userModal").modal("show");
      };

      //add user
      uc.add = function () {
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
              uc.editMode = false;
              currentUser.id = response.data;
              uc.getAll();
              uc.alertText = "Create Contact Successfully";
              uc.alertType = "success";
              uc.alertMessage = {
                type: uc.alertType,
                text: uc.alertText,
                delay: uc.secondsDelay,
              };

              uc.user = null;
              uc.adduserform.$setPristine();
              $("#userModal").modal("hide");
            },
            function () {
              uc.alertText = "An Error has occured while Creating user! ";
              uc.alertType = "danger";

              uc.alertMessage = {
                type: uc.alertType,
                text: uc.alertText,
                delay: uc.secondsDelay,
              };
            }
          );
      };

      //open edit modal when click edit button
      uc.edit = function (u) {
        uc.user = angular.copy(u);

        //check if input in edit modal is changed or not
        uc.check = function () {
          if (angular.equals(uc.user, u)) {
            return true;
          }
          return false;
        };

        uc.editMode = true;
        uc.deleteMode = false;
        $("#userModal").modal("show");
      };

      //update user
      uc.update = function () {
        var currentUser = this.user;

        userFactory.updateUser(currentUser).then(
          function () {
            currentUser.editMode = false;
            uc.getAll();
            uc.alertText = "Update Contact Successfully";
            uc.alertType = "success";

            uc.alertMessage = {
              type: uc.alertType,
              text: uc.alertText,
              delay: uc.secondsDelay,
            };
            uc.adduserform.$setPristine();
            $("#userModal").modal("hide");
          },
          function () {
            uc.alertText = "An Error has occured while Updating user! ";
            uc.alertType = "danger";

            uc.alertMessage = {
              type: uc.alertType,
              text: uc.alertText,
              delay: uc.secondsDelay,
            };
          }
        );
      };

      //open delete modal when click delete button
      uc.deleteform = function (u) {
        uc.user = angular.copy(u);
        uc.deleteMode = true;
        $("#userModal").modal("show");
      };

      //delete user
      uc.delete = function () {
        var currentUser = this.user;

        userFactory.deleteUser(currentUser).then(
          function () {
            uc.getAll();
            uc.alertText = "Delete Contact Successfully";
            uc.alertType = "warning";
            uc.alertMessage = {
              type: uc.alertType,
              text: uc.alertText,
              delay: uc.secondsDelay,
            };
            $("#userModal").modal("hide");
          },
          function () {
            uc.alertText = "An Error has occured while Delete user! ";
            uc.alertType = "danger";

            uc.alertMessage = {
              type: uc.alertType,
              text: uc.alertText,
              delay: uc.secondsDelay,
            };
          }
        );
      };

      uc.cancel = function () {
        uc.user = null;
        uc.adduserform.$setPristine();
        $("#userModal").modal("hide");
      };

      // previous and next button on pagination
      uc.changePageArrow = function (val) {
        if (val === "prev") {
          if (uc.currentPage > 1) {
            uc.currentPage -= 1;
            uc.getAll(uc.currentPage);
          }
        } else {
          if (uc.currentPage < uc.pageNumber) {
            uc.currentPage += 1;
            uc.getAll(uc.currentPage);
          }
        }
      };
      // change page by number
      uc.changePage = function (page) {
        uc.currentPage = page;
        uc.getAll(page);
      };

      // initialize users data
      uc.getAll();
    },
  ]);
})();
