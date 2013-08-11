var app = angular.module('app', ['contenteditable']);

app.directive('diagram', function () {
  var render = function (scope, iElement, iAttrs) {
//    console.log('sentences');
//    console.log(scope.sentences);
  };

  var template = '<sentences><sentence ng-repeat="sentence in sentences" sentence="sentence"></sentence></sentences>';

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

  var template = '' +
      '<subjects>' +
      '<subject ng-repeat="subject in sentence.subjects" subject="subject"></subject>' +
      '</subjects>' +
      '<break></break>' +
      '<predicates>' +
      '<predicate ng-repeat="predicate in sentence.predicates" predicate="predicate"></predicate>' +
      '</predicates>';

  return {
    restrict: 'E',
    link: render,
    template: template,
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

  var template = '<text contenteditable ng-model="subject.text"></text>';

  return {
    restrict: 'E',
    link: render,
    template: template,
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

  var template = '' +
      '<text contenteditable ng-model="predicate.text"></text>' +
      '<div class="verb" type="{{ predicate.verb }}" ng-click="toggleVerb()">&nbsp;</div>' +
      '<objects>' +
      '<object ng-repeat="object in predicate.objects" object="object"></object>' +
      '</objects>';

  return {
    restrict: 'E',
    link: render,
    template: template,
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

  var template = '<text contenteditable ng-model="object.text"></text>';

  return {
    restrict: 'E',
    link: render,
    template: template,
    scope: {
      object: '='
    }
  };
});