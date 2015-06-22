'use strict';

angular.module('ads.services.openfda', [])
  .factory('DrugEventService', function ($resource, apiKey, fdaApiUrl) {
    return $resource(
      fdaApiUrl + '/drug/event.json' + '?api_key=' + apiKey
    );
  })
  .factory('DrugEnforcementService', function ($resource, apiKey, fdaApiUrl) {
    return $resource(
      fdaApiUrl + '/drug/enforcement.json' + '?api_key=' + apiKey
    );
  })
  .factory('DrugLabelingService', function ($resource, apiKey, fdaApiUrl) {
    return $resource(
      fdaApiUrl + '/drug/label.json' + '?api_key=' + apiKey
    );
  });
