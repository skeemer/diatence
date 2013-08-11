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
    //    console.log('object');
    //    console.log(scope.object);
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
    //    console.log(scope.object);
  };

  return {
    restrict: 'E',
    link: render,
    scope: {
      modifier: '='
    }
  };
});