(function () {
  "use strict";
  angular.module("myApp").directive("alertMessage", function ($compile) {
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
