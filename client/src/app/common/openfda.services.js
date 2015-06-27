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
  })
  .factory('MedicationsSearchService', function (DrugEventService) {

    return {
      query: function(adverseEvents, additionalSearchCriteria, countField, limit, callback) {
        var searchString = buildSearchText(adverseEvents.prescriptions);
        if (additionalSearchCriteria) {
          searchString = searchString + additionalSearchCriteria;
        }
          var query = {
          'search' : searchString,
          'count' : countField,
          'limit' : limit
        };
        DrugEventService.get(query, function (data) {
          callback(data);
        });
      }
    }

    // function responsible for taking the medications sent from the SearchFieldCtrl and creating the
    // search text that will be passed on to the DrugEventService
    function buildSearchText(medications) {
      var fieldName = 'patient.drug.medicinalproduct:';
      var searchString = fieldName;
      for(var i=0; i<medications.length; i++) {
        searchString = searchString + '"' + medications[i] + '"';
        if( i !== medications.length-1 ) {
          searchString = searchString + ' AND ' + fieldName;
        }
      }
      return searchString;
    };
  });
