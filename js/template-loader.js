// Original code: https://gist.github.com/vojtajina/3354046

angular.module('templateLoader', []).
  // HACK: we ask for $injector instead of $compile, to avoid circular dep
  factory('$templateCache', function($cacheFactory, $http, $injector) {
    var cache = $cacheFactory('templates');
    var allTplPromise;
    var file = 'js/templates.html';

    return {
      get: function(url) {
        var fromCache = cache.get(url);

        // already have required template in the cache
        if (fromCache) {
          return fromCache;
        }

        // first template request ever - get the all tpl file
        if (!allTplPromise) {
          console.log('getTemplates');
          allTplPromise = $http.get(file).then(function(response) {
            // compile the response, which will put stuff into the cache
            $injector.get('$compile')(response.data);
            return response;
          });
        }

        // return the all-tpl promise to all template requests
        return allTplPromise.then(function(response) {
          return {
            status: response.status,
            data: cache.get(url)
          };
        });
      },

      put: function(key, value) {
        cache.put(key, value);
      }
    };
  });