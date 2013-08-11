var app = angular.module('app', ['contenteditable','templateLoader']);

function calculatePadding(text, modifiers) {
  var tl = text.length * 0.6;
  var ml = (modifiers !== undefined) ? modifiers.length : 0;
  var padding = (2 > (3+ml*3-tl)/2) ? 2 : (3+ml*3-tl)/2;
  return 'padding: 0 ' + padding + 'em;';
}


app.directive('ngRtclick', function($parse) {
  return function(scope, element, attrs) {
    var fn = $parse(attrs.ngRtclick);
    element.bind('contextmenu', function(event) {
      scope.$apply(function() {
        event.preventDefault();
        event.stopPropagation();
        fn(scope, {$event:event});
      });
    });
  };
});

app.directive('ngSnglclick', function($parse) {
  return function(scope, element, attrs) {
    var fn = $parse(attrs.ngSnglclick);
    var clicks = 0;
    var event = null;
    var runner = function () {
      if(clicks == 1) {
        scope.$apply(function() {
          event.preventDefault();
          event.stopPropagation();
          fn(scope, {$event:event});
        });
      }
      clicks = 0;
    }
    element.bind('click', function(e) {
      clicks++;
      if(clicks == 1) {
        event = e;
        setTimeout(runner, 300);
      }
    });
  };
});


app.directive('diagram', function () {
  var render = function (scope, iElement, iAttrs) {
//    console.log('sentences');
//    console.log(scope.sentences);
  };

  var template = '<sentences ng-include="\'sentences.html\'"></sentences>';

  return {
    restrict: 'E',
    link: render,
    template: template,
    scope: {
      sentences: '='
    }
  };

});

app.directive('sentence', function () {
  var render = function (scope, iElement, iAttrs) {
//    console.log('sentence');
//    console.log(scope.sentence);
  };

  return {
    restrict: 'E',
    link: render
  };
});

app.directive('subject', function () {
  var render = function (scope, iElement, iAttrs) {
//    console.log('subject');
//    console.log(scope.subject);
  };

  return {
    restrict: 'E',
    link: render
  };
});

app.directive('predicate', function () {
  var render = function (scope, iElement, iAttrs) {
    scope.toggleVerb = function (e) {
      if(scope.predicate.verb == 'linking') {
        scope.predicate.verb = 'action';
      } else {
        scope.predicate.verb = 'linking';
      }
    };
  };

  return {
    restrict: 'E',
    link: render
  };
});

app.directive('object', function () {
  var render = function (scope, iElement, iAttrs) {
   };

  return {
    restrict: 'E',
    link: render
  };
});

app.directive('modifier', function () {
  var render = function (scope, iElement, iAttrs) {
    scope.style = "left: " + (3 + scope.$parent.$index*3) + 'em;';
  };

  return {
    restrict: 'E',
    link: render,
    scope: {
      modifier: '='
    }
  };
});

app.directive('hasModifiers', function () {
  var render = function (scope, iElement, iAttrs) {
    scope.addModifier = function (e) {
      e.preventDefault();
      e.stopPropagation();
      scope.line.modifiers.push({text: 'modifier'});
      scope.dropdown = false;
    };

    scope.$watch('line.text', function () {
      var modifiers = (scope.line.modifiers !== undefined) ? scope.line.modifiers : [];
      scope.style = calculatePadding(scope.line.text, modifiers);
    });
    scope.$watch('line.modifiers.length', function () {
      var modifiers = (scope.line.modifiers !== undefined) ? scope.line.modifiers : [];
      scope.style = calculatePadding(scope.line.text, modifiers);
    });
  };

  return {
    restrict: 'A',
    link: render
  };
});

app.directive('hasDropdown', function () {
  var render = function (scope, iElement, iAttrs) {
    scope.dropdown = false;

    var clicks = 0;
    iElement.click(function (e) {
      // Restrict to the immediate text element
      if(e.target != iElement.find('text').eq(0)[0]) {
        return;
      }

      e.stopPropagation();
      e.preventDefault();

      // Exclude double clicks and clicks when editing
      clicks++;
      if(clicks == 1) {
        setTimeout(function() {
          if(clicks == 1 && !e.target.isContentEditable) {
            scope.$apply(function() {
              scope.dropdown = true;
            });
          }
          clicks = 0;
        }, 300);
      }
    });

    scope.closeDropdown = function () {
      scope.$apply(function() {
        scope.dropdown = false;
      });
    };

    scope.editText = function (e) {
      e.preventDefault();
      e.stopPropagation();
      iElement.find('text').eq(0).attr('contenteditable', true).focus();
      scope.dropdown = false;
    };

  };

  return {
    restrict: 'A',
    link: render
  };
});


// Close all dropdown menus
$(function() {
  $('body').click(function () {
    $('.dropdown-menu').each(function () {
      $(this).scope().$parent.closeDropdown();
    });
  });
});
