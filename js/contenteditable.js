// Original code: https://github.com/angular/angular.js/issues/528#issuecomment-7573166
// Added keydown bindings

angular.module('contenteditable', []).
    directive('contenteditable', function() {
      return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attr, ngModel) {
          var read;
          if (!ngModel) {
            return false;
          }
          ngModel.$render = function() {
            return element.html(ngModel.$viewValue);
          };
          element.bind('blur', function () {
            if (ngModel.$viewValue !== $.trim(element.html())) {
              return scope.$apply(read);
            }
            return true;
          });
          element.bind('keydown', function (e) {
            if(e.keyCode == 13) { element.blur(); return false; }
            if(e.keyCode == 27) { ngModel.$render(); element.blur(); return false; }
            return true;
          });
          return read = function() {
            return ngModel.$setViewValue($.trim(element.html()));
          };
        }
      };
    });