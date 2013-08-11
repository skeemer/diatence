var app = angular.module('app', ['contenteditable','templateLoader']);

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
    scope.$watch('object.text', function () {
      var text = scope.object.text.length;
      var modifiers = scope.object.modifiers.length;
      var padding = (2 > (4+modifiers*4-text)/2) ? 2 : (4+modifiers*4-text)/2;
      scope.style = 'padding: 0 ' + padding + 'em;';
    });
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
    //    console.log('object');
    console.log(scope.$parent.$index);
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