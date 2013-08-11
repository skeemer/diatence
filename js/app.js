var app = angular.module('app', ['contenteditable','templateLoader']);

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
    link: render,
    scope: {
      sentence: '='
    }
  };
});

app.directive('subject', function () {
  var render = function (scope, iElement, iAttrs) {
//    console.log('subject');
//    console.log(scope.subject);
  };

  return {
    restrict: 'E',
    link: render,
    scope: {
      subject: '='
    }
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
    link: render,
    scope: {
      predicate: '='
    }
  };
});

app.directive('object', function () {
  var render = function (scope, iElement, iAttrs) {
    scope.dropdown = false;
    scope.editable = false;

    function calculatePadding() {
      var text = scope.object.text.length * 0.6;
      var modifiers = scope.object.modifiers.length;
      var padding = (2 > (3+modifiers*3-text)/2) ? 2 : (3+modifiers*3-text)/2;
      return 'padding: 0 ' + padding + 'em;';
    }

    scope.$watch('object.text', function () {
      scope.style = calculatePadding();
    });
    scope.$watch('object.modifiers.length', function () {
      scope.style = calculatePadding();
    });
    scope.addModifier = function (e) {
      e.preventDefault();
      e.stopPropagation();
      scope.object.modifiers.push({text: 'modifier'});
      scope.dropdown = false;
      console.log(scope);
    }
    scope.closeDropdown = function () {
      scope.$apply(function() {
        scope.dropdown = false;
      })
    }
  };

  return {
    restrict: 'E',
    link: render,
    scope: {
      object: '='
    }
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

// Close all dropdown menus
$(function() {
  $('body').click(function () {
    $('.dropdown-menu').scope().closeDropdown();
  });
});
