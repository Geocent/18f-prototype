'use strict';

angular.module('ads.events', ['ads.services.openfda'])
  .controller('AdverseEventsCtrl', function($scope, DrugEventService) {

    var query = {
//      'search': 'patient.drug.openfda.generic_name:"promethazine"'
  	      'search': 'patient.drug.openfda.generic_name:"promethazine" AND ' +
			'patient.drug.openfda.generic_name:"amitriptyline hydrochloride" AND ' +
			'patient.drug.openfda.generic_name:"acetaminophen"',
			'count' : 'patient.reaction.reactionmeddrapt.exact',
			'limit' : '500'
    };

    DrugEventService.get(query, function(data) {
      console.log(data);
      $scope.items = data.results;
    });
  });
